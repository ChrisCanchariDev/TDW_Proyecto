from collections import defaultdict, deque
from time import monotonic
import re

from flask import Blueprint, jsonify, request

chatbot_bp = Blueprint('chatbot', __name__, url_prefix='/api/chatbot')

# Control sencillo para una web académica. Para producción a mayor escala,
# reemplazar por Redis u otro rate limiter distribuido.
_requests = defaultdict(deque)
WINDOW_SECONDS = 60
MAX_REQUESTS = 10
MAX_MESSAGE_LENGTH = 500

PRODUCTS = {
    'naranja': {'name': 'Naranja Washington Navel', 'price': 12.90, 'unit': 'kg'},
    'aceite': {'name': 'Aceite de oliva extra virgen', 'price': 99.90, 'unit': 'L'},
    'aceitunas': {'name': 'Aceitunas negras en salmuera', 'price': 14.00, 'unit': 'kg'},
}

RESPONSES = {
    'es': {
        'greeting': '¡Hola! Soy Yalpi, el asistente virtual de YALPA. Puedo ayudarte con productos, precios, pedidos, ubicación y datos de la cooperativa.',
        'products': 'Tenemos naranja Washington Navel, aceite de oliva extra virgen y aceitunas negras en salmuera.',
        'about': 'YALPA es una cooperativa agraria ubicada en La Yarada - Los Palos, Tacna. Trabaja con productores y comercializa naranja, aceite de oliva y aceitunas.',
        'location': 'Estamos en La Yarada - Los Palos, Tacna, Perú.',
        'contact': 'Puedes contactarnos al 979 999 883, 952 994 138 o al correo yalpa.cooperativa@gmail.com.',
        'order': 'Para continuar con un pedido o registro, puedes ingresar a la sección Contacto y registro de la página.',
        'mission': 'Nuestra misión es contribuir al desarrollo de nuestros clientes comercializando productos saludables mediante un proceso eficiente y trabajo en equipo.',
        'unknown': 'Puedo ayudarte con productos, precios, pedidos, ubicación, contacto, misión y datos de YALPA. Prueba con una de esas opciones.',
        'limit': 'Solo puedo responder consultas relacionadas con la Cooperativa Agraria YALPA y la información disponible en esta página.',
        'empty': 'Escribe una pregunta para poder ayudarte.',
        'too_long': 'La consulta es demasiado larga. Escríbela en un máximo de 500 caracteres.',
    },
    'en': {
        'greeting': 'Hello! I am Yalpi, YALPA virtual assistant. I can help with products, prices, orders, location and cooperative information.',
        'products': 'We offer Washington Navel oranges, extra virgin olive oil and black olives in brine.',
        'about': 'YALPA is an agricultural cooperative located in La Yarada - Los Palos, Tacna. It works with producers and sells oranges, olive oil and olives.',
        'location': 'We are located in La Yarada - Los Palos, Tacna, Peru.',
        'contact': 'You can contact us at +51 979 999 883, +51 952 994 138 or yalpa.cooperativa@gmail.com.',
        'order': 'To continue with an order or registration, visit the Contact & Sign up section.',
        'mission': 'Our mission is to contribute to our customers development by selling healthy products through an efficient process and teamwork.',
        'unknown': 'I can help with YALPA products, prices, orders, location, contact, mission and cooperative information.',
        'limit': 'I can only answer questions related to Cooperativa Agraria YALPA and the information available on this website.',
        'empty': 'Write a question so I can help you.',
        'too_long': 'Your message is too long. Please use a maximum of 500 characters.',
    },
    'pt': {
        'greeting': 'Olá! Sou Yalpi, o assistente virtual da YALPA. Posso ajudar com produtos, preços, pedidos, localização e informações da cooperativa.',
        'products': 'Temos laranja Washington Navel, azeite de oliva extravirgem e azeitonas pretas em salmoura.',
        'about': 'A YALPA é uma cooperativa agrícola localizada em La Yarada - Los Palos, Tacna. Trabalha com produtores e comercializa laranjas, azeite e azeitonas.',
        'location': 'Estamos em La Yarada - Los Palos, Tacna, Peru.',
        'contact': 'Você pode entrar em contato pelo +51 979 999 883, +51 952 994 138 ou pelo e-mail yalpa.cooperativa@gmail.com.',
        'order': 'Para continuar com um pedido ou cadastro, acesse a seção Contato e cadastro da página.',
        'mission': 'Nossa missão é contribuir para o desenvolvimento de nossos clientes comercializando produtos saudáveis por meio de um processo eficiente e trabalho em equipe.',
        'unknown': 'Posso ajudar com produtos, preços, pedidos, localização, contato, missão e informações da YALPA.',
        'limit': 'Só posso responder perguntas relacionadas à Cooperativa Agrária YALPA e às informações disponíveis neste site.',
        'empty': 'Escreva uma pergunta para que eu possa ajudar.',
        'too_long': 'A mensagem é muito longa. Use no máximo 500 caracteres.',
    },
}


PRICE_WORDS = ('precio', 'precios', 'price', 'prices', 'preço', 'preços', 'cuesta', 'costo')


def normalize(text):
    text = text.lower().strip()
    text = re.sub(r'\s+', ' ', text)
    return text


def allowed_language(value):
    return value if value in RESPONSES else 'es'


def rate_limited(ip):
    now = monotonic()
    bucket = _requests[ip]
    while bucket and now - bucket[0] > WINDOW_SECONDS:
        bucket.popleft()
    if len(bucket) >= MAX_REQUESTS:
        return True
    bucket.append(now)
    return False


def product_response(message, lang):
    text = normalize(message)
    data = []
    for key, product in PRODUCTS.items():
        aliases = {
            'naranja': ('naranja', 'orange', 'laranja'),
            'aceite': ('aceite', 'oliva', 'olive oil', 'azeite'),
            'aceitunas': ('aceituna', 'aceitunas', 'olive', 'olives', 'azeitona', 'azeitonas'),
        }[key]
        if any(alias in text for alias in aliases):
            data.append({**product, 'id': key, 'pricePen': product['price']})
    if data:
        return None, data
    return None, []


def classify(message):
    text = normalize(message)
    if re.search(r'\b(hola|buenas|hello|hi|olá|ola)\b', text):
        return 'greeting'
    if any(x in text for x in PRICE_WORDS + ('producto', 'productos', 'catálogo', 'catalogo', 'product')):
        return 'products'
    if any(x in text for x in ('quiénes', 'quienes', 'yalpa', 'cooperativa', 'about')):
        return 'about'
    if any(x in text for x in ('ubicación', 'ubicacion', 'dónde', 'donde', 'location', 'endereço')):
        return 'location'
    if any(x in text for x in ('contacto', 'correo', 'teléfono', 'telefono', 'contact', 'contato')):
        return 'contact'
    if any(x in text for x in ('pedido', 'comprar', 'compra', 'order', 'buy', 'pedido')):
        return 'order'
    if any(x in text for x in ('misión', 'mision', 'mission', 'missão', 'visión', 'vision')):
        return 'mission'
    return 'unknown'


@chatbot_bp.post('/message')
def message():
    if not request.is_json:
        return jsonify({'ok': False, 'error': 'JSON requerido'}), 415

    ip = request.headers.get('X-Forwarded-For', request.remote_addr or 'unknown').split(',')[0].strip()
    if rate_limited(ip):
        return jsonify({'ok': False, 'error': 'Demasiadas consultas. Intenta nuevamente en un minuto.'}), 429

    payload = request.get_json(silent=True) or {}
    raw_message = payload.get('message', '')
    language = allowed_language(payload.get('language', 'es'))
    message_text = raw_message.strip() if isinstance(raw_message, str) else ''
    response = RESPONSES[language]

    if not message_text:
        return jsonify({'ok': True, 'reply': response['empty'], 'products': []})
    if len(message_text) > MAX_MESSAGE_LENGTH:
        return jsonify({'ok': True, 'reply': response['too_long'], 'products': []})

    _, products = product_response(message_text, language)
    if not products and any(w in normalize(message_text) for w in PRICE_WORDS):
        # "Precios" a secas: devolvemos todos los productos con su precio.
        products = [{**p, 'id': k, 'pricePen': p['price']} for k, p in PRODUCTS.items()]
    if products:
        if len(products) == 1:
            p = products[0]
            reply = {
                'es': f"{p['name']}: S/ {p['price']:.2f} por {p['unit']}, precio base en soles.",
                'en': f"{p['name']}: PEN {p['price']:.2f} per {p['unit']}, base price in Peruvian soles.",
                'pt': f"{p['name']}: PEN {p['price']:.2f} por {p['unit']}, preço base em soles peruanos.",
            }[language]
        else:
            reply = response['products']
        return jsonify({'ok': True, 'reply': reply, 'products': products})

    category = classify(message_text)
    reply = response.get(category, response['unknown'])
    return jsonify({'ok': True, 'reply': reply, 'products': []})