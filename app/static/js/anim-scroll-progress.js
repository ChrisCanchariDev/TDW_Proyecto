/* Animación 1 · Barra de progreso de lectura
   Calcula cuánto de la página se ha recorrido y lo expone en --progress (0 a 1). */
(function () {
    'use strict';
    var bar = document.getElementById('scrollProgress');
    if (!bar) return;

    var ticking = false;

    function update() {
        var doc = document.documentElement;
        var max = doc.scrollHeight - window.innerHeight;
        var ratio = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
        bar.style.setProperty('--progress', ratio.toFixed(4));
        ticking = false;
    }

    // requestAnimationFrame evita recalcular en cada evento de scroll
    function onScroll() {
        if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // El contenido puede cambiar de alto (imágenes, idioma): se recalcula al cargar todo
    window.addEventListener('load', update);
    update();
})();
