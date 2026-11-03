/* Animación 2 · Producto que vuela al carrito
   Escucha los botones "Agregar al carrito" (.add-to-cart-btn), copia la foto del
   producto (data-fly-source) y la lleva en arco hasta el icono del carrito
   (data-fly-target). La lógica del carrito sigue en main.js; esto es solo visual. */
(function () {
    'use strict';

    var DURATION = 750;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function center(rect) {
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }

    function pulseCart(target) {
        target.classList.remove('is-receiving');
        void target.offsetWidth; // reinicia la animación si se agrega varias veces seguidas
        target.classList.add('is-receiving');
        setTimeout(function () { target.classList.remove('is-receiving'); }, 650);
    }

    function fly(card) {
        var source = card.querySelector('[data-fly-source]');
        var target = document.querySelector('[data-fly-target]');
        if (!source || !target || typeof source.animate !== 'function') return;

        var from = source.getBoundingClientRect();
        var to = target.getBoundingClientRect();
        if (!from.width || !to.width) return;

        // Tamaño de salida acotado para que no tape toda la pantalla en móvil
        var size = Math.min(from.width, 220);
        var scale0 = size / from.width;
        var width = size;
        var height = from.height * scale0;
        var start = center(from);
        var end = center(to);
        var dx = end.x - start.x;
        var dy = end.y - start.y;
        var lift = Math.max(60, Math.min(140, Math.abs(dy) * 0.25)); // altura del arco

        var ghost = document.createElement('div');
        ghost.className = 'fly-ghost';
        ghost.setAttribute('aria-hidden', 'true');
        ghost.style.width = width + 'px';
        ghost.style.height = height + 'px';
        ghost.style.left = (start.x - width / 2) + 'px';
        ghost.style.top = (start.y - height / 2) + 'px';
        var img = document.createElement('img');
        img.src = source.currentSrc || source.src;
        img.alt = '';
        ghost.appendChild(img);
        document.body.appendChild(ghost);

        var endScale = Math.max(0.08, 36 / width);
        var anim = ghost.animate([
            { transform: 'translate(0px, 0px) scale(1) rotate(0deg)', opacity: 1, offset: 0 },
            { transform: 'translate(' + (dx * 0.45) + 'px, ' + (dy * 0.45 - lift) + 'px) scale(0.6) rotate(-8deg)', opacity: 1, offset: 0.5 },
            { transform: 'translate(' + dx + 'px, ' + dy + 'px) scale(' + endScale + ') rotate(10deg)', opacity: 0.25, offset: 1 }
        ], { duration: DURATION, easing: 'cubic-bezier(.45,.05,.55,.95)', fill: 'forwards' });

        var done = function () {
            ghost.remove();
            pulseCart(target);
        };
        anim.onfinish = done;
        anim.oncancel = function () { ghost.remove(); };
    }

    document.addEventListener('click', function (e) {
        var button = e.target.closest('.add-to-cart-btn');
        if (!button) return;
        var card = button.closest('.product-card');
        if (!card) return;

        if (reduceMotion.matches) {
            // Sin vuelo: solo una señal discreta en el carrito
            var target = document.querySelector('[data-fly-target]');
            if (target) pulseCart(target);
            return;
        }
        fly(card);
    });
})();