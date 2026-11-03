/* Animación 3 · Calendario de cosecha encendido mes a mes
   Deja el calendario "armado" . */
(function () {
    'use strict';
    var calendar = document.getElementById('harvestCalendar');
    if (!calendar) return;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) return; // se queda visible y estático

    calendar.classList.add('is-armed');

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            calendar.classList.add('is-playing');
            observer.unobserve(calendar);
        });
    }, { threshold: 0.45 });

    observer.observe(calendar);
})();