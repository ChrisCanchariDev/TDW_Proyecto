/* Yalpi · Chatbot contextual de Cooperativa Agraria YALPA */
(() => {
    'use strict';

    const MAX_LENGTH = 500;
    const COOLDOWN_MS = 1200;
    let lastSentAt = 0;

    const $ = (selector) => document.querySelector(selector);
    const messages = $('#yalpiMessages');
    const form = $('#yalpiForm');
    const input = $('#yalpiInput');
    const toggle = $('#yalpiToggle');
    const panel = $('#yalpiPanel');
    const close = $('#yalpiClose');
    const suggestions = $('#yalpiSuggestions');

    if (!messages || !form || !input || !toggle || !panel) return;

    const getLang = () => window.YALPAI18n?.currentLanguage?.() || 'es';

    const labels = {
        es: {
            greeting: '¡Hola! Soy Yalpi 👋 ¿En qué puedo ayudarte?',
            placeholder: 'Escribe tu consulta…',
            thinking: 'Yalpi está pensando…',
            error: 'No pude procesar la consulta. Intenta nuevamente.',
            suggestions: ['Productos', 'Precios', '¿Dónde están?', 'Contacto']
        },
        en: {
            greeting: 'Hello! I am Yalpi 👋 How can I help you?',
            placeholder: 'Write your question…',
            thinking: 'Yalpi is thinking…',
            error: 'I could not process the question. Please try again.',
            suggestions: ['Products', 'Prices', 'Where are you?', 'Contact']
        },
        pt: {
            greeting: 'Olá! Sou Yalpi 👋 Como posso ajudar?',
            placeholder: 'Digite sua pergunta…',
            thinking: 'Yalpi está pensando…',
            error: 'Não foi possível processar a pergunta. Tente novamente.',
            suggestions: ['Produtos', 'Preços', 'Onde estão?', 'Contato']
        }
    };

    const currentLabels = () => labels[getLang()] || labels.es;

    const addMessage = (text, type = 'bot') => {
        const bubble = document.createElement('div');
        bubble.className = `yalpi-message ${type}`;
        // textContent evita que uma consulta possa injetar HTML/JS.
        bubble.textContent = text;
        messages.appendChild(bubble);
        messages.scrollTop = messages.scrollHeight;
        return bubble;
    };

    const openPanel = () => {
        panel.hidden = false;
        toggle.setAttribute('aria-expanded', 'true');
        input.focus();
    };

    const closePanel = () => {
        panel.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
    };

    const refreshUiLanguage = () => {
        const l = currentLabels();
        input.placeholder = l.placeholder;
        suggestions.querySelectorAll('button').forEach((button, i) => {
            if (l.suggestions[i]) button.textContent = l.suggestions[i];
        });
    };

    const ask = async (text) => {
        const message = String(text || '').trim();
        if (!message) return;
        if (message.length > MAX_LENGTH) {
            addMessage(currentLabels().error, 'bot');
            return;
        }
        if (Date.now() - lastSentAt < COOLDOWN_MS) return;
        lastSentAt = Date.now();

        addMessage(message, 'user');
        input.value = '';
        const thinking = addMessage(currentLabels().thinking, 'bot thinking');

        try {
            const response = await fetch('/api/chatbot/message', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    message,
                    language: getLang()
                })
            });

            const data = await response.json();
            thinking.remove();

            if (!response.ok || !data.ok) {
                addMessage(data.error || currentLabels().error, 'bot');
                return;
            }

            addMessage(data.reply, 'bot');

            // Si la respuesta contiene productos, mostramos sus precios
            // usando la misma moneda seleccionada en la página.
            if (Array.isArray(data.products) && data.products.length && window.YALPAI18n?.formatCurrency) {
                data.products.forEach(product => {
                    const price = window.YALPAI18n.formatCurrency(product.pricePen);
                    addMessage(`${product.name}: ${price} / ${product.unit}`, 'bot product-price');
                });
            }
        } catch (error) {
            thinking.remove();
            addMessage(currentLabels().error, 'bot');
            console.error('Yalpi:', error);
        }
    };

    toggle.addEventListener('click', () => {
        panel.hidden ? openPanel() : closePanel();
    });
    close?.addEventListener('click', closePanel);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        ask(input.value);
    });

    suggestions.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (button) ask(button.dataset.question || button.textContent);
    });

    document.addEventListener('yalpa:languagechange', () => refreshUiLanguage());

    refreshUiLanguage();
    addMessage(currentLabels().greeting, 'bot');
})();