/* YALPA · Internacionalización (ES por defecto) + monedas PEN/USD/BRL */
(() => {
    const STORAGE_LANG = 'yalpa_language';
    const STORAGE_CURRENCY = 'yalpa_currency';

    const translations = {
        en: {
            "Contacto · Cooperativa Agraria YALPA":"Contact · Cooperativa Agraria YALPA","Cooperativa YALPA":"YALPA Cooperative","¿Tienes alguna duda?":"Have a question?","Estamos aquí para escucharte y ayudarte.":"We're here to listen and help.","Ponte en contacto":"Get in touch","Completa estos datos y envíanos tu consulta. Te responderemos lo antes posible.":"Fill in your details and send us your question. We'll reply as soon as possible.","Nombre y apellidos *":"Full name *","Tu nombre completo":"Your full name","Correo electrónico *":"Email *","Teléfono (opcional)":"Phone (optional)","Tu teléfono":"Your phone","Asunto *":"Subject *","Consultas generales":"General inquiries","Productos y precios":"Products and prices","Pedidos y envíos":"Orders and shipping","Ventas al por mayor":"Wholesale","Convertirme en socio":"Become a member","Otro":"Other","Mensaje *":"Message *","Escribe tu mensaje":"Write your message","Enviar mensaje":"Send message","¿Buscas respuestas rápidas?":"Looking for quick answers?","Pregúntale a Yalpi":"Ask Yalpi","Encuéntranos":"Find us","Mapa de ubicación":"Location map","Ver en Google Maps":"View on Google Maps",
            "Inicio":"Home","Productos":"Products","Nosotros":"About us","Contacto":"Contact",
            "Regístrate":"Sign up","Contacto y registro":"Contact & sign up","Carrito":"Cart",
            "Abrir carrito":"Open cart","Cerrar carrito":"Close cart","Abrir menú":"Open menu",
            "Saltar al contenido":"Skip to content","Principal":"Main navigation",
            "Quiénes somos":"About us","Conoce la cooperativa":"Meet the cooperative",
            "Visión y misión":"Vision & mission","Hacia dónde vamos y por qué":"Where we are going and why",
            "Valores":"Values","Lo que guía nuestro trabajo":"What guides our work",
            "Equipo":"Team","Las personas detrás de YALPA":"The people behind YALPA",
            "Noticias":"News","Lo último de la cooperativa":"Latest from the cooperative",
            "Tienda":"Shop","Todos los productos":"All products","Naranja":"Oranges",
            "Aceite de oliva":"Olive oil","Aceitunas":"Olives","Escríbenos":"Contact us",
            "Limitada":"Limited","Cooperativa Agraria":"Agricultural Cooperative",
            "Naranja de Tacna para el mundo. Fruta de alta calidad, cultivada por socios productores en campos certificados GlobalG.A.P., con compromiso social y sostenible.":"Tacna oranges for the world. High-quality fruit grown by producer members on GlobalG.A.P.-certified farms, with social and sustainable commitment.",
            "La Yarada - Los Palos, Tacna, Perú":"La Yarada - Los Palos, Tacna, Peru",
            "Todos los derechos reservados.":"All rights reserved.",
            "Tu carrito":"Your cart","Tu carrito está vacío.":"Your cart is empty.",
            "Ver productos":"View products","Total":"Total","Continuar con mi registro":"Continue with registration",
            "Vaciar carrito":"Empty cart","Eliminar":"Remove","Quitar una unidad":"Remove one unit",
            "Agregar una unidad":"Add one unit","por":"per","producto":"product","productos":"products",
            "Agregado":"Added","Agregar al carrito":"Add to cart","Cantidad de":"Quantity of",
            "Comprar naranjas":"Buy oranges","Conocer YALPA":"Meet YALPA","Ver catálogo":"View catalog",
            "Comprar aceite":"Buy olive oil","Comprar aceitunas":"Buy olives","Nuestra historia":"Our story",
            "Lo mejor de nuestra tierra, directo a ti":"The best of our land, delivered to you",
            "Productores de Tacna que trabajan en equipo para ofrecerte calidad, buen sabor y precios competitivos.":"Tacna producers working together to offer quality, great taste and competitive prices.",
            "Del olivar a tu mesa: el sabor de nuestros socios productores en cada botella.":"From the olive grove to your table: the taste of our producer members in every bottle.",
            "Selección especial para tu mesa, tus recetas y tu tabla de quesos.":"A special selection for your table, recipes and cheese board.",
            "Naranja de Tacna para el mundo":"Tacna oranges for the world",
            "Washington Navel jugosa, con el equilibrio perfecto entre dulzor y acidez. Cultivada al sol del desierto en campos certificados GlobalG.A.P.":"Juicy Washington Navel with the perfect balance of sweetness and acidity. Grown under the desert sun on GlobalG.A.P.-certified farms.",
            "Aceite de oliva extra virgen":"Extra virgin olive oil","Aceitunas negras en salmuera":"Black olives in brine",
            "Campos certificados GlobalG.A.P.":"GlobalG.A.P.-certified farms","Estándares internacionales":"International standards",
            "Región libre de mosca de la fruta":"Fruit-fly-free region","Fruta sana, lista para exportar":"Healthy fruit, ready for export",
            "Exportamos desde Tacna":"We export from Tacna","Estados Unidos y Chile":"United States and Chile",
            "Del campo a tu mesa":"From the farm to your table","Nuestros productos":"Our products",
            "Tres cultivos, una misma forma de trabajar: con calidad y con los socios.":"Three crops, one way of working: with quality and our members.",
            "Ver catálogo completo":"View full catalog","Deliciosa, jugosa y dulce":"Delicious, juicy and sweet",
            "Extra virgen":"Extra virgin","Selección especial":"Special selection","Ver producto":"View product",
            "Producción":"Production","Sol todo el año, suelos fértiles y una cosecha que vale la espera":"Year-round sun, fertile soil and a harvest worth the wait",
            "Nuestra naranja crece en clima desértico, con muchas horas de sol y agua de subsuelo. El resultado: fruta de muy alta calidad, con el equilibrio entre dulzor y acidez que tanto gusta.":"Our oranges grow in a desert climate, with many hours of sun and groundwater. The result is high-quality fruit with the balance of sweetness and acidity people love.",
            "hectáreas de cultivo de naranja":"hectares of orange cultivation","toneladas por hectárea":"tons per hectare",
            "hectáreas de naranja en La Yarada - Los Palos":"hectares of oranges in La Yarada - Los Palos",
            "meses de campaña, de marzo a julio":"campaign months, from March to July",
            "Calendario de cosecha":"Harvest calendar","Meses de cosecha de naranja":"Orange harvest months",
            "temporada de cosecha":"harvest season","Una cooperativa de Tacna que crece junto a sus socios":"A Tacna cooperative growing together with its members",
            "Somos la Cooperativa Agraria YALPA Limitada, en La Yarada - Los Palos, frente al mar. Cultivamos naranja y olivo, y llevamos fruta fresca, aceite de oliva y aceitunas desde el campo hasta tu mesa.":"We are Cooperativa Agraria YALPA Limitada, in La Yarada - Los Palos, facing the sea. We grow oranges and olives and bring fresh fruit, olive oil and olives from the farm to your table.",
            "Conoce la cooperativa":"Meet the cooperative","Conocer al equipo":"Meet the team",
            "Únete a nuestra comunidad":"Join our community",
            "Regístrate para comprar más rápido, recibir ofertas y hacer seguimiento de tus pedidos.":"Sign up to shop faster, receive offers and track your orders.",
            "Crear mi cuenta":"Create my account","Más sobre YALPA":"More about YALPA",
            "Exportación":"Exports","Del desierto de Tacna a nuevos mercados":"From the Tacna desert to new markets",
            "Realizamos nuestra primera exportación en 2023 y seguimos abriendo puertas. Nuestros campos se manejan con estándares internacionales, en una región libre de mosca de la fruta.":"We made our first export in 2023 and continue opening new doors. Our fields follow international standards in a fruit-fly-free region.",
            "Primera exportación en 2023":"First export in 2023","Mercado abierto":"Open market",
            "Apertura de mercado próxima":"Market opening soon","País interesado":"Interested country",
            "Activo":"Active","Abierto":"Open","Pronto":"Soon","Interés":"Interest",
            "Crear cuenta":"Create account","Completa tus datos. Los campos con * son obligatorios.":"Complete your details. Fields marked * are required.",
            "Nombres":"First name(s)","Apellidos":"Last name","Correo electrónico":"Email",
            "Contraseña":"Password","Confirmar contraseña":"Confirm password","Mensaje (opcional)":"Message (optional)",
            "Tus nombres":"Your first name(s)","Tus apellidos":"Your last name","Mínimo 8 caracteres":"At least 8 characters",
            "Repite la contraseña":"Repeat your password","Cuéntanos qué productos te interesan":"Tell us which products interest you",
            "Registrarse":"Sign up","¿Ya tienes cuenta?":"Already have an account?","Inicia sesión":"Log in",
            "Compra más rápida":"Faster shopping","Recibe ofertas especiales":"Receive special offers",
            "Seguimiento de pedidos":"Order tracking","Gestiona tus datos":"Manage your information",
            "Regístrate y disfruta los beneficios de nuestra cooperativa.":"Sign up and enjoy the benefits of our cooperative.",
            "Quiénes somos":"About us","Cooperativa Agraria YALPA Limitada":"Cooperativa Agraria YALPA Limited","Productos · Cooperativa Agraria YALPA":"Products · Cooperativa Agraria YALPA","Crear cuenta · Cooperativa Agraria YALPA":"Create account · Cooperativa Agraria YALPA","Quiénes somos · Cooperativa Agraria YALPA":"About us · Cooperativa Agraria YALPA","Valores · Cooperativa Agraria YALPA":"Values · Cooperativa Agraria YALPA","Visión y misión · Cooperativa Agraria YALPA":"Vision & mission · Cooperativa Agraria YALPA","Equipo · Cooperativa Agraria YALPA":"Team · Cooperativa Agraria YALPA","Noticias · Cooperativa Agraria YALPA":"News · Cooperativa Agraria YALPA","Naranja Washington Navel":"Washington Navel orange",
            "Estamos en La Yarada - Los Palos, frente al mar. Cultivamos naranja y olivo, y llevamos fruta fresca, aceite de oliva y aceitunas desde el campo hasta tu mesa.":"We are in La Yarada - Los Palos, facing the sea. We grow oranges and olives and bring fresh fruit, olive oil and olives from the farm to your table.",
            "Trabajar en cooperativa significa que cada productor comparte el esfuerzo y el resultado. Heredamos el trabajo en equipo de generaciones de productores de Tacna, y por eso cuidamos la calidad de cada cosecha y el bienestar de las familias que la hacen posible.":"Working as a cooperative means every producer shares the effort and the result. We inherited teamwork from generations of Tacna producers, so we care for the quality of every harvest and the wellbeing of the families who make it possible.",
            "Campos certificados GlobalG.A.P.":"GlobalG.A.P.-certified farms",
            "Lo que guía nuestro trabajo":"What guides our work",
            "Cinco valores que aplicamos en el campo, en la cooperativa y en cada entrega.":"Five values we apply in the field, in the cooperative and in every delivery.",
            "Cooperación":"Cooperation","Nadie produce solo: compartimos trabajo, decisiones y resultados.":"No one produces alone: we share work, decisions and results.",
            "Calidad":"Quality","Cuidamos cada etapa, de la cosecha al empaque.":"We care for every stage, from harvest to packaging.",
            "Sostenibilidad":"Sustainability","Cultivamos pensando en la tierra que seguirá produciendo mañana.":"We farm thinking about the land that will produce tomorrow.",
            "Compromiso social":"Social commitment","El crecimiento de la cooperativa debe llegar a las familias socias.":"The cooperative's growth should benefit member families.",
            "Transparencia":"Transparency","Explicamos cómo trabajamos y rendimos cuentas a nuestros socios.":"We explain how we work and are accountable to our members.",
            "Hacia dónde vamos y por qué trabajamos":"Where we are going and why we work",
            "Lo que nos mueve cada día y la cooperativa que queremos ser.":"What drives us every day and the cooperative we want to be.",
            "Misión":"Mission","Visión":"Vision",
            "Contribuir al desarrollo de nuestros clientes comercializando naranjas saludables, con un proceso productivo eficiente y el trabajo en equipo heredado de generaciones de productores de Tacna. Así ofrecemos precios competitivos y un producto de buena calidad y sabor.":"Contribute to our customers' development by selling healthy oranges through an efficient production process and teamwork inherited from generations of Tacna producers. This allows us to offer competitive prices and a good-quality, great-tasting product.",
            "Ser una cooperativa de referencia por la calidad de sus productos y por su compromiso social y sostenible, llevando la naranja de Tacna a más mercados del mundo.":"Be a reference cooperative for product quality and social and sustainable commitment, taking Tacna oranges to more markets around the world.",
            "Las personas detrás de cada cosecha":"The people behind every harvest",
            "Socios y equipo de la cooperativa trabajan juntos para que cada producto llegue con la calidad que esperas.":"Cooperative members and staff work together so every product arrives with the quality you expect.",
            "Equipo de YALPA junto a la fruta de la temporada.":"YALPA team with the seasonal fruit.",
            "Productora socia entre los naranjos.":"Producer member among the orange trees.",
            "Noticias de la cooperativa":"Cooperative news","Lo último de YALPA: campañas, productos nuevos y presencia en ferias.":"The latest from YALPA: campaigns, new products and presence at fairs.",
            "Campaña de naranja Washington Navel":"Washington Navel orange campaign",
            "Comienza la cosecha de la temporada en los campos de nuestros socios.":"The seasonal harvest begins in our members' fields.",
            "Aceitunas negras en salmuera, ya disponibles":"Black olives in brine are now available",
            "Una nueva presentación para tu mesa, en nuestro catálogo.":"A new presentation for your table, available in our catalog.",
            "YALPA en ferias y puntos de entrega":"YALPA at fairs and delivery points",
            "Conoce al equipo y prueba nuestros productos.":"Meet the team and try our products.",
            "Catálogo":"Catalog","Naranja Washington Navel, aceite de oliva y aceitunas: lo mejor de Tacna, directo de nuestros socios.":"Washington Navel oranges, olive oil and olives: the best of Tacna, straight from our members.",
            "Todos":"All","Buscar producto":"Search product","Ordenar: predeterminado":"Sort: default",
            "Precio: menor a mayor":"Price: low to high","Precio: mayor a menor":"Price: high to low","Nombre: A a Z":"Name: A to Z",
            "No encontramos productos con esa búsqueda. Prueba con otra palabra o elige “Todos”.":"No products found. Try another word or choose “All”.",
            "por":"per","Idioma":"Language","Moneda":"Currency","Pausar carrusel":"Pause carousel","Reanudar carrusel":"Resume carousel","Diapositiva anterior":"Previous slide","Diapositiva siguiente":"Next slide","Elegir diapositiva":"Choose slide","Ir a":"Go to","Debil":"Weak","Débil":"Weak","Media":"Medium","Fuerte":"Strong","Usa al menos 8 caracteres.":"Use at least 8 characters.","Mezcla mayúsculas, números o símbolos.":"Mix uppercase, numbers or symbols.","Agrega mayúsculas, números o símbolos.":"Add uppercase letters, numbers or symbols.","¡Buena contraseña!":"Good password!","La contraseña debe tener al menos 8 caracteres.":"Password must have at least 8 characters.","Las contraseñas no coinciden. Por favor, verifica.":"Passwords do not match. Please check.",
            "Ingresar":"Log in","Iniciar sesión":"Log in","Cerrar sesión":"Log out","Cuenta de":"Account of","Continuar con mi pedido":"Continue with my order","Iniciar sesión · Cooperativa Agraria YALPA":"Log in · Cooperativa Agraria YALPA","Completa tus datos. Todos los campos son obligatorios. Al terminar iniciarás sesión automáticamente.":"Fill in your details. All fields are required. When you finish, you'll be logged in automatically.","Nombre completo *":"Full name *","Teléfono *":"Phone *","Ej. 979 999 883":"e.g. 979 999 883","Contraseña *":"Password *","Mostrar contraseña":"Show password","Productora socia de YALPA entre los naranjos":"YALPA producer member among the orange trees","Bienvenido de vuelta":"Welcome back","Ingresa a tu cuenta para comprar más rápido y dar seguimiento a tus pedidos.":"Log in to your account to shop faster and track your orders.","Ingresa con el correo y la contraseña de tu cuenta.":"Log in with your account's email and password.","Tu contraseña":"Your password","¿Aún no tienes cuenta?":"Don't have an account yet?","Socios productores de YALPA junto a un naranjo cargado de fruta":"YALPA producer members next to an orange tree full of fruit"
        },
        pt: {
            "Contacto · Cooperativa Agraria YALPA":"Contato · Cooperativa Agraria YALPA","Cooperativa YALPA":"Cooperativa YALPA","¿Tienes alguna duda?":"Tem alguma dúvida?","Estamos aquí para escucharte y ayudarte.":"Estamos aqui para ouvir e ajudar.","Ponte en contacto":"Entre em contato","Completa estos datos y envíanos tu consulta. Te responderemos lo antes posible.":"Preencha seus dados e envie sua consulta. Responderemos o mais breve possível.","Nombre y apellidos *":"Nome completo *","Tu nombre completo":"Seu nome completo","Correo electrónico *":"E-mail *","Teléfono (opcional)":"Telefone (opcional)","Tu teléfono":"Seu telefone","Asunto *":"Assunto *","Consultas generales":"Consultas gerais","Productos y precios":"Produtos e preços","Pedidos y envíos":"Pedidos e envios","Ventas al por mayor":"Vendas por atacado","Convertirme en socio":"Tornar-me sócio","Otro":"Outro","Mensaje *":"Mensagem *","Escribe tu mensaje":"Escreva sua mensagem","Enviar mensaje":"Enviar mensagem","¿Buscas respuestas rápidas?":"Procura respostas rápidas?","Pregúntale a Yalpi":"Pergunte ao Yalpi","Encuéntranos":"Encontre-nos","Mapa de ubicación":"Mapa de localização","Ver en Google Maps":"Ver no Google Maps",
            "Inicio":"Início","Productos":"Produtos","Nosotros":"Sobre nós","Contacto":"Contato",
            "Regístrate":"Cadastre-se","Contacto y registro":"Contato e cadastro","Carrito":"Carrinho",
            "Abrir carrito":"Abrir carrinho","Cerrar carrito":"Fechar carrinho","Abrir menú":"Abrir menu",
            "Saltar al contenido":"Pular para o conteúdo","Principal":"Navegação principal",
            "Quiénes somos":"Quem somos","Conoce la cooperativa":"Conheça a cooperativa",
            "Visión y misión":"Visão e missão","Hacia dónde vamos y por qué":"Para onde vamos e por quê",
            "Valores":"Valores","Lo que guía nuestro trabajo":"O que orienta nosso trabalho",
            "Equipo":"Equipe","Las personas detrás de YALPA":"As pessoas por trás da YALPA",
            "Noticias":"Notícias","Lo último de la cooperativa":"As últimas novidades da cooperativa",
            "Tienda":"Loja","Todos los productos":"Todos os produtos","Naranja":"Laranja",
            "Aceite de oliva":"Azeite de oliva","Aceitunas":"Azeitonas","Escríbenos":"Fale conosco",
            "Limitada":"Limitada","Cooperativa Agraria":"Cooperativa Agrária",
            "Naranja de Tacna para el mundo. Fruta de alta calidad, cultivada por socios productores en campos certificados GlobalG.A.P., con compromiso social y sostenible.":"Laranjas de Tacna para o mundo. Frutas de alta qualidade cultivadas por produtores associados em campos certificados pela GlobalG.A.P., com compromisso social e sustentável.",
            "La Yarada - Los Palos, Tacna, Perú":"La Yarada - Los Palos, Tacna, Peru",
            "Todos los derechos reservados.":"Todos os direitos reservados.",
            "Tu carrito":"Seu carrinho","Tu carrito está vacío.":"Seu carrinho está vazio.",
            "Ver productos":"Ver produtos","Total":"Total","Continuar con mi registro":"Continuar com meu cadastro",
            "Vaciar carrito":"Esvaziar carrinho","Eliminar":"Remover","Quitar una unidad":"Remover uma unidade",
            "Agregar una unidad":"Adicionar uma unidade","por":"por","producto":"produto","productos":"produtos",
            "Agregado":"Adicionado","Agregar al carrito":"Adicionar ao carrinho","Cantidad de":"Quantidade de",
            "Comprar naranjas":"Comprar laranjas","Conocer YALPA":"Conheça a YALPA","Ver catálogo":"Ver catálogo",
            "Comprar aceite":"Comprar azeite","Comprar aceitunas":"Comprar azeitonas","Nuestra historia":"Nossa história",
            "Lo mejor de nuestra tierra, directo a ti":"O melhor da nossa terra, direto para você",
            "Productores de Tacna que trabajan en equipo para ofrecerte calidad, buen sabor y precios competitivos.":"Produtores de Tacna que trabalham em equipe para oferecer qualidade, bom sabor e preços competitivos.",
            "Del olivar a tu mesa: el sabor de nuestros socios productores en cada botella.":"Do olival à sua mesa: o sabor dos nossos produtores associados em cada garrafa.",
            "Selección especial para tu mesa, tus recetas y tu tabla de quesos.":"Uma seleção especial para sua mesa, receitas e tábua de queijos.",
            "Naranja de Tacna para el mundo":"Laranjas de Tacna para o mundo",
            "Washington Navel jugosa, con el equilibrio perfecto entre dulzor y acidez. Cultivada al sol del desierto en campos certificados GlobalG.A.P.":"Washington Navel suculenta, com o equilíbrio perfeito entre doçura e acidez. Cultivada ao sol do deserto em campos certificados pela GlobalG.A.P.",
            "Aceite de oliva extra virgen":"Azeite de oliva extravirgem","Aceitunas negras en salmuera":"Azeitonas pretas em salmoura",
            "Campos certificados GlobalG.A.P.":"Campos certificados pela GlobalG.A.P.","Estándares internacionales":"Padrões internacionais",
            "Región libre de mosca de la fruta":"Região livre da mosca-das-frutas","Fruta sana, lista para exportar":"Fruta saudável, pronta para exportação",
            "Exportamos desde Tacna":"Exportamos de Tacna","Estados Unidos y Chile":"Estados Unidos e Chile",
            "Del campo a tu mesa":"Do campo à sua mesa","Nuestros productos":"Nossos produtos",
            "Tres cultivos, una misma forma de trabajar: con calidad y con los socios.":"Três cultivos, uma mesma forma de trabalhar: com qualidade e com nossos associados.",
            "Ver catálogo completo":"Ver catálogo completo","Deliciosa, jugosa y dulce":"Deliciosa, suculenta e doce",
            "Extra virgen":"Extravirgem","Selección especial":"Seleção especial","Ver producto":"Ver produto",
            "Producción":"Produção","Sol todo el año, suelos fértiles y una cosecha que vale la espera":"Sol o ano todo, solos férteis e uma colheita que vale a espera",
            "Nuestra naranja crece en clima desértico, con muchas horas de sol y agua de subsuelo. El resultado: fruta de muy alta calidad, con el equilibrio entre dulzor y acidez que tanto gusta.":"Nossas laranjas crescem em clima desértico, com muitas horas de sol e água subterrânea. O resultado é uma fruta de alta qualidade, com o equilíbrio entre doçura e acidez que todos apreciam.",
            "hectáreas de cultivo de naranja":"hectares de cultivo de laranja","toneladas por hectárea":"toneladas por hectare",
            "hectáreas de naranja en La Yarada - Los Palos":"hectares de laranja em La Yarada - Los Palos",
            "meses de campaña, de marzo a julio":"meses de campanha, de março a julho",
            "Calendario de cosecha":"Calendário de colheita","Meses de cosecha de naranja":"Meses de colheita de laranja",
            "temporada de cosecha":"temporada de colheita","Una cooperativa de Tacna que crece junto a sus socios":"Uma cooperativa de Tacna que cresce junto com seus associados",
            "Somos la Cooperativa Agraria YALPA Limitada, en La Yarada - Los Palos, frente al mar. Cultivamos naranja y olivo, y llevamos fruta fresca, aceite de oliva y aceitunas desde el campo hasta tu mesa.":"Somos a Cooperativa Agrária YALPA Limitada, em La Yarada - Los Palos, de frente para o mar. Cultivamos laranjas e oliveiras e levamos frutas frescas, azeite e azeitonas do campo à sua mesa.",
            "Conoce la cooperativa":"Conheça a cooperativa","Conocer al equipo":"Conheça a equipe",
            "Únete a nuestra comunidad":"Junte-se à nossa comunidade",
            "Regístrate para comprar más rápido, recibir ofertas y hacer seguimiento de tus pedidos.":"Cadastre-se para comprar mais rápido, receber ofertas e acompanhar seus pedidos.",
            "Crear mi cuenta":"Criar minha conta","Más sobre YALPA":"Mais sobre a YALPA",
            "Exportación":"Exportação","Del desierto de Tacna a nuevos mercados":"Do deserto de Tacna para novos mercados",
            "Realizamos nuestra primera exportación en 2023 y seguimos abriendo puertas. Nuestros campos se manejan con estándares internacionales, en una región libre de mosca de la fruta.":"Fizemos nossa primeira exportação em 2023 e continuamos abrindo portas. Nossos campos seguem padrões internacionais em uma região livre da mosca-das-frutas.",
            "Primera exportación en 2023":"Primeira exportação em 2023","Mercado abierto":"Mercado aberto",
            "Apertura de mercado próxima":"Abertura de mercado próxima","País interesado":"País interessado",
            "Activo":"Ativo","Abierto":"Aberto","Pronto":"Em breve","Interés":"Interesse",
            "Crear cuenta":"Criar conta","Completa tus datos. Los campos con * son obligatorios.":"Preencha seus dados. Os campos com * são obrigatórios.",
            "Nombres":"Nome","Apellidos":"Sobrenome","Correo electrónico":"E-mail",
            "Contraseña":"Senha","Confirmar contraseña":"Confirmar senha","Mensaje (opcional)":"Mensagem (opcional)",
            "Tus nombres":"Seu nome","Tus apellidos":"Seu sobrenome","Mínimo 8 caracteres":"Mínimo de 8 caracteres",
            "Repite la contraseña":"Repita a senha","Cuéntanos qué productos te interesan":"Conte quais produtos interessam a você",
            "Registrarse":"Cadastrar-se","¿Ya tienes cuenta?":"Já tem uma conta?","Inicia sesión":"Entrar",
            "Compra más rápida":"Compra mais rápida","Recibe ofertas especiales":"Receba ofertas especiais",
            "Seguimiento de pedidos":"Acompanhamento de pedidos","Gestiona tus datos":"Gerencie seus dados",
            "Regístrate y disfruta los beneficios de nuestra cooperativa.":"Cadastre-se e aproveite os benefícios da nossa cooperativa.",
            "Cooperativa Agraria YALPA Limitada":"Cooperativa Agrária YALPA Limitada",
            "Estamos en La Yarada - Los Palos, frente al mar. Cultivamos naranja y olivo, y llevamos fruta fresca, aceite de oliva y aceitunas desde el campo hasta tu mesa.":"Estamos em La Yarada - Los Palos, de frente para o mar. Cultivamos laranjas e oliveiras e levamos frutas frescas, azeite e azeitonas do campo à sua mesa.",
            "Trabajar en cooperativa significa que cada productor comparte el esfuerzo y el resultado. Heredamos el trabajo en equipo de generaciones de productores de Tacna, y por eso cuidamos la calidad de cada cosecha y el bienestar de las familias que la hacen posible.":"Trabalhar em uma cooperativa significa que cada produtor compartilha o esforço e o resultado. Herdamos o trabalho em equipe de gerações de produtores de Tacna e, por isso, cuidamos da qualidade de cada colheita e do bem-estar das famílias que a tornam possível.",
            "Lo que guía nuestro trabajo":"O que orienta nosso trabalho",
            "Cinco valores que aplicamos en el campo, en la cooperativa y en cada entrega.":"Cinco valores que aplicamos no campo, na cooperativa e em cada entrega.",
            "Cooperación":"Cooperação","Nadie produce solo: compartimos trabajo, decisiones y resultados.":"Ninguém produz sozinho: compartilhamos trabalho, decisões e resultados.",
            "Calidad":"Qualidade","Cuidamos cada etapa, de la cosecha al empaque.":"Cuidamos de cada etapa, da colheita à embalagem.",
            "Sostenibilidad":"Sustentabilidade","Cultivamos pensando en la tierra que seguirá produciendo mañana.":"Cultivamos pensando na terra que continuará produzindo amanhã.",
            "Compromiso social":"Compromisso social","El crecimiento de la cooperativa debe llegar a las familias socias.":"O crescimento da cooperativa deve chegar às famílias associadas.",
            "Transparencia":"Transparência","Explicamos cómo trabajamos y rendimos cuentas a nuestros socios.":"Explicamos como trabalhamos e prestamos contas aos nossos associados.",
            "Hacia dónde vamos y por qué trabajamos":"Para onde vamos e por que trabalhamos",
            "Lo que nos mueve cada día y la cooperativa que queremos ser.":"O que nos move todos os dias e a cooperativa que queremos ser.",
            "Misión":"Missão","Visión":"Visão",
            "Contribuir al desarrollo de nuestros clientes comercializando naranjas saludables, con un proceso productivo eficiente y el trabajo en equipo heredado de generaciones de productores de Tacna. Así ofrecemos precios competitivos y un producto de buena calidad y sabor.":"Contribuir para o desenvolvimento de nossos clientes comercializando laranjas saudáveis, com um processo produtivo eficiente e o trabalho em equipe herdado de gerações de produtores de Tacna. Assim oferecemos preços competitivos e um produto de boa qualidade e sabor.",
            "Ser una cooperativa de referencia por la calidad de sus productos y por su compromiso social y sostenible, llevando la naranja de Tacna a más mercados del mundo.":"Ser uma cooperativa de referência pela qualidade de seus produtos e por seu compromisso social e sustentável, levando as laranjas de Tacna a mais mercados do mundo.",
            "Las personas detrás de cada cosecha":"As pessoas por trás de cada colheita",
            "Socios y equipo de la cooperativa trabajan juntos para que cada producto llegue con la calidad que esperas.":"Associados e equipe da cooperativa trabalham juntos para que cada produto chegue com a qualidade que você espera.",
            "Equipo de YALPA junto a la fruta de la temporada.":"Equipe da YALPA junto à fruta da temporada.",
            "Productora socia entre los naranjos.":"Produtora associada entre as laranjeiras.",
            "Noticias de la cooperativa":"Notícias da cooperativa","Lo último de YALPA: campañas, productos nuevos y presencia en ferias.":"As últimas novidades da YALPA: campanhas, novos produtos e presença em feiras.",
            "Campaña de naranja Washington Navel":"Campanha de laranja Washington Navel",
            "Comienza la cosecha de la temporada en los campos de nuestros socios.":"Começa a colheita da temporada nos campos de nossos associados.",
            "Aceitunas negras en salmuera, ya disponibles":"Azeitonas pretas em salmoura já disponíveis",
            "Una nueva presentación para tu mesa, en nuestro catálogo.":"Uma nova apresentação para sua mesa, em nosso catálogo.",
            "YALPA en ferias y puntos de entrega":"YALPA em feiras e pontos de entrega",
            "Conoce al equipo y prueba nuestros productos.":"Conheça a equipe e experimente nossos produtos.",
            "Catálogo":"Catálogo","Naranja Washington Navel, aceite de oliva y aceitunas: lo mejor de Tacna, directo de nuestros socios.":"Laranjas Washington Navel, azeite de oliva e azeitonas: o melhor de Tacna, direto de nossos associados.",
            "Todos":"Todos","Buscar producto":"Buscar produto","Ordenar: predeterminado":"Ordenar: padrão",
            "Precio: menor a mayor":"Preço: menor para maior","Precio: mayor a menor":"Preço: maior para menor","Nombre: A a Z":"Nome: A a Z",
             "No encontramos productos con esa búsqueda. Prueba con otra palabra o elige “Todos”.":"Nenhum produto encontrado. Tente outra palavra ou escolha “Todos”.","Idioma":"Idioma","Moneda":"Moeda","Pausar carrusel":"Pausar carrossel","Reanudar carrusel":"Retomar carrossel","Diapositiva anterior":"Slide anterior","Diapositiva siguiente":"Próximo slide","Elegir diapositiva":"Escolher slide","Ir a":"Ir para","Débil":"Fraca","Media":"Média","Fuerte":"Forte","Usa al menos 8 caracteres.":"Use pelo menos 8 caracteres.","Mezcla mayúsculas, números o símbolos.":"Misture maiúsculas, números ou símbolos.","Agrega mayúsculas, números o símbolos.":"Adicione maiúsculas, números ou símbolos.","¡Buena contraseña!":"Boa senha!","La contraseña debe tener al menos 8 caracteres.":"A senha deve ter pelo menos 8 caracteres.","Las contraseñas no coinciden. Por favor, verifica.":"As senhas não coincidem. Verifique.",
            "Ingresar":"Entrar","Iniciar sesión":"Entrar","Cerrar sesión":"Sair","Cuenta de":"Conta de","Continuar con mi pedido":"Continuar com meu pedido","Crear cuenta · Cooperativa Agraria YALPA":"Criar conta · Cooperativa Agraria YALPA","Iniciar sesión · Cooperativa Agraria YALPA":"Entrar · Cooperativa Agraria YALPA","Completa tus datos. Todos los campos son obligatorios. Al terminar iniciarás sesión automáticamente.":"Preencha seus dados. Todos os campos são obrigatórios. Ao terminar, você entrará automaticamente.","Nombre completo *":"Nome completo *","Teléfono *":"Telefone *","Ej. 979 999 883":"Ex. 979 999 883","Contraseña *":"Senha *","Mostrar contraseña":"Mostrar senha","Productora socia de YALPA entre los naranjos":"Produtora associada da YALPA entre as laranjeiras","Bienvenido de vuelta":"Bem-vindo de volta","Ingresa a tu cuenta para comprar más rápido y dar seguimiento a tus pedidos.":"Entre na sua conta para comprar mais rápido e acompanhar seus pedidos.","Ingresa con el correo y la contraseña de tu cuenta.":"Entre com o e-mail e a senha da sua conta.","Tu contraseña":"Sua senha","¿Aún no tienes cuenta?":"Ainda não tem uma conta?","Socios productores de YALPA junto a un naranjo cargado de fruta":"Associados produtores da YALPA junto a uma laranjeira carregada de frutas"
        }
    };

    const languageNames = { es: 'Español', en: 'English', pt: 'Português' };
    const currencyConfig = {
        PEN: { locale: 'es-PE', currency: 'PEN' },
        USD: { locale: 'en-US', currency: 'USD' },
        BRL: { locale: 'pt-BR', currency: 'BRL' }
    };

    // Tasas de respaldo de referencia para 01/10/2026. Se actualizan desde la API cuando está disponible.
    let rates = { PEN: 1, USD: 0.2898, BRL: 1.4996 };

    const originalText = new WeakMap();
    const originalAttrs = new WeakMap();

    const currentLanguage = () => localStorage.getItem(STORAGE_LANG) || 'es';
    const currentCurrency = () => localStorage.getItem(STORAGE_CURRENCY) || 'PEN';

    const t = (spanish) => {
        const lang = currentLanguage();
        return lang === 'es' ? spanish : (translations[lang]?.[spanish] ?? spanish);
    };

    const translateNode = (node, lang) => {
        if (!originalText.has(node)) originalText.set(node, node.nodeValue);
        const source = originalText.get(node);
        const trimmed = source.trim();
        if (!trimmed) return;
        const translated = lang === 'es' ? trimmed : (translations[lang]?.[trimmed] ?? trimmed);
        node.nodeValue = source.replace(trimmed, translated);
    };

    const translateAttributes = (lang) => {
        const attrs = ['placeholder', 'aria-label', 'title', 'alt'];
        document.querySelectorAll('*').forEach(el => {
            attrs.forEach(attr => {
                if (!el.hasAttribute(attr)) return;
                if (!originalAttrs.has(el)) originalAttrs.set(el, {});
                const store = originalAttrs.get(el);
                if (!(attr in store)) store[attr] = el.getAttribute(attr);
                const source = store[attr];
                let translated = lang === 'es' ? source : (translations[lang]?.[source] ?? source);
                if (lang !== 'es' && /^Cantidad de (.+)$/.test(source)) {
                    const match = source.match(/^Cantidad de (.+)$/);
                    translated = `${t('Cantidad de')} ${translations[lang]?.[match[1]] ?? match[1]}`;
                }
                if (lang !== 'es' && /^Ir a (.+)$/.test(source)) {
                    const match = source.match(/^Ir a (.+)$/);
                    translated = `${t('Ir a')} ${translations[lang]?.[match[1]] ?? match[1]}`;
                }
                el.setAttribute(attr, translated);
            });
        });
    };

    const applyLanguage = (lang = currentLanguage()) => {
        if (!['es', 'en', 'pt'].includes(lang)) lang = 'es';
        localStorage.setItem(STORAGE_LANG, lang);
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
        document.documentElement.dir = 'ltr';

        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
            const node = walker.currentNode;
            if (node.parentElement?.closest('script, style, [translate="no"]')) continue;
            translateNode(node, lang);
        }
        translateAttributes(lang);

        const titleSource = document.body.dataset.pageTitle || document.title;
        if (!document.body.dataset.pageTitle) document.body.dataset.pageTitle = document.title;
        document.title = lang === 'es' ? document.body.dataset.pageTitle : (translations[lang]?.[document.body.dataset.pageTitle] ?? document.body.dataset.pageTitle);

        const selector = document.getElementById('languageSelect');
        if (selector) selector.value = lang;
        document.dispatchEvent(new CustomEvent('yalpa:languagechange', { detail: { language: lang } }));
    };

    const applyCurrency = (currency = currentCurrency()) => {
        if (!currencyConfig[currency]) currency = 'PEN';
        localStorage.setItem(STORAGE_CURRENCY, currency);
        const selector = document.getElementById('currencySelect');
        if (selector) selector.value = currency;
        document.dispatchEvent(new CustomEvent('yalpa:currencychange', { detail: { currency } }));
    };

    const formatCurrency = (penValue, currency = currentCurrency()) => {
        const value = Number(penValue || 0) * (rates[currency] ?? 1);
        const cfg = currencyConfig[currency] || currencyConfig.PEN;
        return new Intl.NumberFormat(cfg.locale, {
            style: 'currency',
            currency: cfg.currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    const updateRateLabel = () => {
        const el = document.getElementById('exchangeRateInfo');
        if (!el) return;
        const usdPen = rates.USD ? (1 / rates.USD) : 0;
        const brlPen = rates.BRL ? (1 / rates.BRL) : 0;
        el.textContent = `1 USD ≈ ${usdPen.toFixed(2)} PEN · 1 BRL ≈ ${brlPen.toFixed(2)} PEN`;
    };

    const fetchRates = async () => {
        try {
            const response = await fetch('https://open.er-api.com/v6/latest/PEN', { cache: 'no-store' });
            if (!response.ok) throw new Error('Exchange API unavailable');
            const data = await response.json();
            if (data?.rates?.USD && data?.rates?.BRL) {
                rates.USD = Number(data.rates.USD);
                rates.BRL = Number(data.rates.BRL);
                updateRateLabel();
                document.dispatchEvent(new CustomEvent('yalpa:currencychange', { detail: { currency: currentCurrency() } }));
            }
        } catch (error) {
            console.warn('No se pudo actualizar el tipo de cambio; se usarán tasas de respaldo.', error);
        }
    };

    const init = () => {
        const langSelect = document.getElementById('languageSelect');
        const currencySelect = document.getElementById('currencySelect');

        langSelect?.addEventListener('change', e => applyLanguage(e.target.value));
        currencySelect?.addEventListener('change', e => applyCurrency(e.target.value));

        applyLanguage(currentLanguage());
        applyCurrency(currentCurrency());
        updateRateLabel();
        fetchRates();
    };

    window.YALPAI18n = { t, applyLanguage, applyCurrency, formatCurrency, currentLanguage, currentCurrency, getRates: () => ({ ...rates }), languageNames };
    document.addEventListener('DOMContentLoaded', init);
})();