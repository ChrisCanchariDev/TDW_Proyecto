document.addEventListener('DOMContentLoaded', () => {
    const i18n = window.YALPAI18n;
    const t = key => i18n?.t(key) ?? key;
    const formatCurrency = value => i18n?.formatCurrency(value) ?? `S/${Number(value || 0).toFixed(2)}`;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ------------------------------------------------------------------
       1. Navegación: menú móvil y desplegable "Nosotros"
    ------------------------------------------------------------------ */
    const menuBtn = document.getElementById('menuBtn');
    const mobileDropdown = document.getElementById('mobileDropdown');
    if (menuBtn && mobileDropdown) {
        menuBtn.addEventListener('click', () => {
            const open = mobileDropdown.hidden;
            mobileDropdown.hidden = !open;
            menuBtn.setAttribute('aria-expanded', String(open));
        });
        mobileDropdown.addEventListener('click', e => {
            if (e.target.closest('a')) { mobileDropdown.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); }
        });
    }

    const mobileAboutBtn = document.getElementById('mobileAboutBtn');
    const mobileAbout = document.getElementById('mobileAbout');
    if (mobileAboutBtn && mobileAbout) {
        mobileAboutBtn.addEventListener('click', () => {
            const open = mobileAbout.hidden;
            mobileAbout.hidden = !open;
            mobileAboutBtn.setAttribute('aria-expanded', String(open));
        });
    }

    const aboutWrap = document.getElementById('aboutMenuWrap');
    const aboutBtn = document.getElementById('aboutBtn');
    if (aboutWrap && aboutBtn) {
        const setOpen = open => {
            aboutWrap.classList.toggle('is-open', open);
            aboutBtn.setAttribute('aria-expanded', String(open));
        };
        aboutBtn.addEventListener('click', () => { aboutWrap.classList.remove('is-closed'); setOpen(!aboutWrap.classList.contains('is-open')); });
        document.addEventListener('click', e => { if (!aboutWrap.contains(e.target)) setOpen(false); });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && aboutWrap.classList.contains('is-open')) { setOpen(false); aboutBtn.focus(); }
        });
        aboutWrap.addEventListener('focusout', e => { if (!aboutWrap.contains(e.relatedTarget)) setOpen(false); });
        // Al elegir una sección se cierra aunque el cursor siga encima
        aboutWrap.querySelectorAll('.dropdown a').forEach(a => a.addEventListener('click', () => {
            setOpen(false);
            aboutWrap.classList.add('is-closed');
        }));
        aboutWrap.addEventListener('mouseleave', () => aboutWrap.classList.remove('is-closed'));
    }

    /* ------------------------------------------------------------------
       2. Slider principal
    ------------------------------------------------------------------ */
    const hero = document.getElementById('heroSlider');
    if (hero) {
        const slides = [...hero.querySelectorAll('.hero-slide')];
        const tabs = [...hero.querySelectorAll('.hero-tab')];
        const pauseBtn = document.getElementById('heroPause');
        let current = 0;
        let userPaused = reduceMotion;

        const show = index => {
            current = (index + slides.length) % slides.length;
            slides.forEach((slide, i) => {
                const on = i === current;
                slide.classList.toggle('is-active', on);
                slide.setAttribute('aria-hidden', String(!on));
                slide.inert = !on;
            });
            tabs.forEach((tab, i) => {
                const on = i === current;
                tab.classList.remove('is-active');
                tab.setAttribute('aria-selected', String(on));
                if (on) { void tab.offsetWidth; tab.classList.add('is-active'); } // reinicia la barra de progreso
            });
        };

        const syncPause = () => {
            hero.classList.toggle('is-paused', userPaused || hero.dataset.hover === '1');
            if (pauseBtn) {
                pauseBtn.setAttribute('aria-label', userPaused ? 'Reanudar carrusel' : 'Pausar carrusel');
                pauseBtn.innerHTML = `<i class="fa-solid ${userPaused ? 'fa-play' : 'fa-pause'} text-sm"></i>`;
            }
        };

        // La barra de progreso marca el ritmo: al terminar, pasa a la siguiente.
        tabs.forEach((tab, i) => {
            tab.addEventListener('click', () => show(i));
            tab.querySelector('.bar i').addEventListener('animationend', () => { if (i === current) show(current + 1); });
        });
        document.getElementById('heroPrev')?.addEventListener('click', () => show(current - 1));
        document.getElementById('heroNext')?.addEventListener('click', () => show(current + 1));
        pauseBtn?.addEventListener('click', () => { userPaused = !userPaused; syncPause(); });

        hero.addEventListener('mouseenter', () => { hero.dataset.hover = '1'; syncPause(); });
        hero.addEventListener('mouseleave', () => { hero.dataset.hover = '0'; syncPause(); });
        hero.addEventListener('focusin', () => { hero.dataset.hover = '1'; syncPause(); });
        hero.addEventListener('focusout', () => { hero.dataset.hover = '0'; syncPause(); });

        hero.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') show(current - 1);
            if (e.key === 'ArrowRight') show(current + 1);
        });

        let touchX = null;
        hero.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
        hero.addEventListener('touchend', e => {
            if (touchX === null) return;
            const dx = e.changedTouches[0].clientX - touchX;
            if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
            touchX = null;
        });

        show(0);
        syncPause();
    }

    /* ------------------------------------------------------------------
       3. Registro: validación, mostrar contraseña y medidor de fortaleza
    ------------------------------------------------------------------ */
    const registerForm = document.getElementById('registerForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');
    const errorMessage = document.getElementById('errorMessage');

    if (registerForm && passwordInput && errorMessage) {
        const fail = (msg, field, e) => {
            e.preventDefault();
            errorMessage.textContent = msg;
            errorMessage.hidden = false;
            field.focus();
        };
        registerForm.addEventListener('submit', e => {
            errorMessage.hidden = true;
            errorMessage.textContent = '';
            if (passwordInput.value.length < 8) return fail('La contraseña debe tener al menos 8 caracteres.', passwordInput, e);
            if (confirmPasswordInput && passwordInput.value !== confirmPasswordInput.value) return fail('Las contraseñas no coinciden. Por favor, verifica.', confirmPasswordInput, e);
        });
    }

    document.querySelectorAll('[data-toggle-password]').forEach(button => {
        const input = document.getElementById(button.dataset.togglePassword);
        const icon = button.querySelector('i');
        if (!input || !icon) return;
        button.addEventListener('click', () => {
            const showing = input.type === 'text';
            input.type = showing ? 'password' : 'text';
            icon.classList.toggle('fa-eye', showing);
            icon.classList.toggle('fa-eye-slash', !showing);
            button.setAttribute('aria-label', showing ? 'Mostrar contraseña' : 'Ocultar contraseña');
        });
    });

    const strengthSegments = document.querySelectorAll('#strengthBar > span');
    const strengthLabel = document.getElementById('strengthLabel');
    const strengthHint = document.getElementById('strengthHint');
    if (passwordInput && strengthSegments.length && strengthLabel) {
        passwordInput.addEventListener('input', () => {
            const pw = passwordInput.value;
            let level = 0, text = '', hint = '';
            if (pw && pw.length < 8) {
                level = 1; text = 'Débil'; hint = 'Usa al menos 8 caracteres.';
            } else if (pw) {
                let score = 1;
                if (pw.length >= 12) score++;
                if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
                if (/\d/.test(pw)) score++;
                if (/[^A-Za-z0-9]/.test(pw)) score++;
                level = Math.min(score, 4);
                if (score <= 1) { text = 'Débil'; hint = 'Mezcla mayúsculas, números o símbolos.'; }
                else if (score === 2) { text = 'Media'; hint = 'Agrega mayúsculas, números o símbolos.'; }
                else if (score === 3) { text = 'Fuerte'; hint = '¡Buena contraseña!'; }
                else { text = 'Muy fuerte'; hint = '¡Excelente contraseña!'; }
            }
            const colors = ['bg-red-500', 'bg-orange-400', 'bg-lime-500', 'bg-green-600'];
            strengthSegments.forEach((seg, i) => {
                seg.className = 'h-1.5 flex-1 rounded-full transition-colors duration-200 ' + (i < level ? colors[level - 1] : 'bg-gray-200');
            });
            strengthLabel.textContent = text ? `Seguridad: ${text}` : '';
            if (strengthHint) strengthHint.textContent = hint;
        });
    }

    /* ------------------------------------------------------------------
       4. Catálogo: filtro + búsqueda + orden (funcionan combinados)
    ------------------------------------------------------------------ */
    const productGrid = document.getElementById('productGrid');
    const productCards = [...document.querySelectorAll('.product-card')];
    const filterButtons = [...document.querySelectorAll('.filter-btn')];
    const productSearch = document.getElementById('productSearch');
    const productSort = document.getElementById('productSort');
    const resultCount = document.getElementById('resultCount');
    const noResults = document.getElementById('noResults');

    if (productGrid && productCards.length) {
        const state = { category: 'all', query: '', sort: 'default' };
        productCards.forEach((card, i) => { card.dataset.order = i; });

        const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        const applyCatalog = () => {
            const q = norm(state.query.trim());
            let visible = 0;
            productCards.forEach(card => {
                const okCat = state.category === 'all' || card.dataset.category === state.category;
                const translatedName = t(card.dataset.name);
                const okText = !q || norm(card.dataset.name).includes(q) || norm(card.dataset.category).includes(q);
                card.hidden = !(okCat && okText);
                if (!card.hidden) visible++;
            });

            [...productCards].sort((a, b) => {
                if (state.sort === 'price-asc') return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
                if (state.sort === 'price-desc') return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
                if (state.sort === 'name-asc') return a.dataset.name.localeCompare(b.dataset.name, 'es');
                return Number(a.dataset.order) - Number(b.dataset.order);
            }).forEach(card => productGrid.appendChild(card));

            if (resultCount) resultCount.textContent = `${visible} ${visible === 1 ? 'producto' : 'productos'}`;
            if (noResults) noResults.hidden = visible !== 0;
        };

        const setCategory = category => {
            state.category = category;
            filterButtons.forEach(btn => btn.classList.toggle('is-active', btn.dataset.filter === category));
            applyCatalog();
        };

        filterButtons.forEach(btn => btn.addEventListener('click', () => setCategory(btn.dataset.filter)));
        productSearch?.addEventListener('input', () => { state.query = productSearch.value; applyCatalog(); });
        productSort?.addEventListener('change', () => { state.sort = productSort.value; applyCatalog(); });

        // Enlaces del inicio y del pie: /productos?categoria=aceite
        const wanted = new URLSearchParams(location.search).get('categoria');
        if (wanted && filterButtons.some(b => b.dataset.filter === wanted)) setCategory(wanted);
        else applyCatalog();
    }

    /* ------------------------------------------------------------------
       5. Carrito de compras (localStorage "yalpa_cart")
    ------------------------------------------------------------------ */
    const CART_KEY = 'yalpa_cart';

    const loadCart = () => {
        try {
            const data = JSON.parse(localStorage.getItem(CART_KEY));
            if (!Array.isArray(data)) return [];
            return data
                .map(item => ({ ...item, qty: Number(item.qty ?? item.quantity ?? 1) }))
                .filter(item => item.qty > 0);
        } catch (error) {
            return [];
        }
    };
    const saveCart = cart => {
        try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
        catch (error) { console.error('No se pudo guardar el carrito', error); }
    };

    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartTotal = document.getElementById('cartTotal');
    const cartFooter = document.getElementById('cartFooter');
    const cartButtons = document.querySelectorAll('.js-cart-toggle');
    const cartBadges = document.querySelectorAll('.js-cart-count');

    if (cartDrawer && cartItems) {
        let cart = loadCart();
        let lastTrigger = null;

        const el = (tag, className, text) => {
            const node = document.createElement(tag);
            if (className) node.className = className;
            if (text !== undefined) node.textContent = text;
            return node;
        };

        const updateCount = (bump = false) => {
            const total = cart.reduce((sum, item) => sum + item.qty, 0);
            cartBadges.forEach(badge => {
                badge.textContent = total > 99 ? '99+' : String(total);
                badge.hidden = total === 0;
                if (bump && total > 0) { badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump'); }
            });
        };

        const renderCart = (bump = false) => {
            cartItems.replaceChildren();
            cart.forEach(item => {
                const row = el('li', 'cart-item');

                const img = el('img');
                img.src = item.image || '';
                img.alt = item.name || '';

                const info = el('div', 'flex-1 min-w-0');
                info.append(el('p', 'font-bold text-forest leading-tight', item.name));
                info.append(el('p', 'text-sm text-muted', `${formatCurrency(item.price)}${item.unit ? ' / ' + item.unit : ''}`));

                const step = el('div', 'step');
                const minus = el('button', '', '−'); minus.type = 'button'; minus.dataset.action = 'decrease'; minus.dataset.id = item.id; minus.setAttribute('aria-label', 'Quitar una unidad');
                const plus = el('button', '', '+'); plus.type = 'button'; plus.dataset.action = 'increase'; plus.dataset.id = item.id; plus.setAttribute('aria-label', 'Agregar una unidad');
                step.append(minus, el('span', 'font-bold w-6 text-center', String(item.qty)), plus);
                info.append(step);

                const remove = el('button', 'remove', 'Eliminar');
                remove.type = 'button'; remove.dataset.action = 'remove'; remove.dataset.id = item.id;

                row.append(img, info, remove);
                cartItems.append(row);
            });

            const total = cart.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);
            if (cartTotal) cartTotal.textContent = formatCurrency(total);
            const isEmpty = cart.length === 0;
            if (cartEmpty) cartEmpty.hidden = !isEmpty;
            if (cartFooter) cartFooter.hidden = isEmpty;
            updateCount(bump);
        };

        const openCart = e => {
            lastTrigger = e?.currentTarget || null;
            cartDrawer.classList.add('is-open');
            cartDrawer.setAttribute('aria-hidden', 'false');
            if (cartOverlay) cartOverlay.hidden = false;
            document.body.style.overflow = 'hidden';
            document.getElementById('cartClose')?.focus();
        };
        const closeCart = () => {
            cartDrawer.classList.remove('is-open');
            cartDrawer.setAttribute('aria-hidden', 'true');
            if (cartOverlay) cartOverlay.hidden = true;
            document.body.style.overflow = '';
            lastTrigger?.focus();
        };

        cartButtons.forEach(button => button.addEventListener('click', openCart));
        document.getElementById('cartClose')?.addEventListener('click', closeCart);
        cartOverlay?.addEventListener('click', closeCart);
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && cartDrawer.classList.contains('is-open')) closeCart(); });

        cartItems.addEventListener('click', e => {
            const button = e.target.closest('button[data-action]');
            if (!button) return;
            const item = cart.find(p => String(p.id) === button.dataset.id);
            if (!item) return;
            if (button.dataset.action === 'increase') item.qty++;
            if (button.dataset.action === 'decrease') item.qty--;
            if (button.dataset.action === 'remove') item.qty = 0;
            cart = cart.filter(p => p.qty > 0);
            saveCart(cart);
            renderCart();
        });

        document.getElementById('cartClear')?.addEventListener('click', () => {
            cart = [];
            saveCart(cart);
            renderCart();
        });

        productCards.forEach(card => {
            const addButton = card.querySelector('.add-to-cart-btn');
            const quantityInput = card.querySelector('.qty-input');
            if (!addButton || !quantityInput) return;
            const label = addButton.textContent;
            let resetTimer;

            addButton.addEventListener('click', () => {
                const quantity = Math.max(1, parseInt(quantityInput.value, 10) || 1);
                const product = {
                    id: card.dataset.id,
                    name: card.dataset.name,
                    price: parseFloat(card.dataset.price),
                    unit: card.dataset.unit,
                    image: card.dataset.image,
                    qty: quantity
                };
                const existing = cart.find(item => String(item.id) === String(product.id));
                if (existing) existing.qty += quantity; else cart.push(product);

                saveCart(cart);
                renderCart(true);
                quantityInput.value = 1;

                addButton.textContent = 'Agregado';
                addButton.classList.add('is-added');
                clearTimeout(resetTimer);
                resetTimer = setTimeout(() => { addButton.textContent = label; addButton.classList.remove('is-added'); }, 1400);
            });
        });

        renderCart();
        document.addEventListener('yalpa:currencychange', () => renderCart());
        document.addEventListener('yalpa:languagechange', () => {
            renderCart();
            document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
                if (!btn.classList.contains('is-added')) btn.textContent = t('Agregar al carrito');
            });
        });
    }

    const refreshProductPrices = () => {
        document.querySelectorAll('.product-card').forEach(card => {
            const price = card.querySelector('.price-value');
            if (price) price.textContent = formatCurrency(Number(card.dataset.price));
        });
    };
    document.addEventListener('yalpa:currencychange', refreshProductPrices);
    refreshProductPrices();

    /* ------------------------------------------------------------------
       6. Microinteracciones: sombra del header, aparición al hacer scroll
          y contador de cifras (añadido en el rediseño)
    ------------------------------------------------------------------ */
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
        const onScroll = () => siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        if (reduceMotion || !('IntersectionObserver' in window)) {
            revealEls.forEach(el => el.classList.add('is-in'));
        } else {
            const io = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
            revealEls.forEach(el => io.observe(el));
        }
    }

    const counters = document.querySelectorAll('[data-count]');
    if (counters.length && !reduceMotion && 'IntersectionObserver' in window) {
        const co = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = Number(el.dataset.count);
                const suffix = el.querySelector('sup');
                const start = performance.now();
                const tick = now => {
                    const t = Math.min((now - start) / 1200, 1);
                    const value = Math.round(target * (1 - Math.pow(1 - t, 3)));
                    el.firstChild.nodeValue = String(value);
                    if (t < 1) requestAnimationFrame(tick);
                };
                if (el.firstChild && el.firstChild.nodeType === 3) requestAnimationFrame(tick);
                co.unobserve(el);
            });
        }, { threshold: 0.6 });
        counters.forEach(el => co.observe(el));
    }
    
    /* ------------------------------------------------------------------
       7. Modo oscuro (se recuerda en localStorage "yalpa_theme")
    ------------------------------------------------------------------ */
    const THEME_KEY = 'yalpa_theme';
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

    const getSavedTheme = () => {
        try { return localStorage.getItem(THEME_KEY); } catch (error) { return null; }
    };
    // Etiquetas del botón: se pasan por t() para respetar el idioma elegido (ES/EN/PT)
    const paintThemeToggle = () => {
        if (!themeToggle) return;
        const dark = root.getAttribute('data-theme') === 'dark';
        themeToggle.setAttribute('aria-pressed', String(dark));
        themeToggle.setAttribute('aria-label', t(dark ? 'Activar modo claro' : 'Activar modo oscuro'));
        themeToggle.title = t(dark ? 'Modo claro' : 'Modo oscuro');
        themeToggle.innerHTML = `<i class="fa-solid ${dark ? 'fa-sun' : 'fa-moon'} text-lg" aria-hidden="true"></i>`;
    };
    const applyTheme = theme => {
        const dark = theme === 'dark';
        root.setAttribute('data-theme', dark ? 'dark' : 'light');
        if (themeMeta) themeMeta.setAttribute('content', dark ? '#0E1812' : '#0B3D24');
        paintThemeToggle();
    };

    applyTheme(getSavedTheme() || (systemDark.matches ? 'dark' : 'light'));

    themeToggle?.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try { localStorage.setItem(THEME_KEY, next); } catch (error) { /* sin almacenamiento: solo esta visita */ }
    });
    // Si la persona nunca eligió, seguir el cambio del sistema
    systemDark.addEventListener?.('change', e => { if (!getSavedTheme()) applyTheme(e.matches ? 'dark' : 'light'); });
    // Al cambiar de idioma, i18n.js reescribe los atributos: se vuelve a poner la etiqueta correcta
    document.addEventListener('yalpa:languagechange', paintThemeToggle);

    /* ------------------------------------------------------------------
       8. Botón "volver al inicio": aparece al bajar y sube con scroll suave
    ------------------------------------------------------------------ */
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        const toggleBackToTop = () => backToTop.classList.toggle('is-visible', window.scrollY > 400);
        toggleBackToTop();
        window.addEventListener('scroll', toggleBackToTop, { passive: true });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
    }

    /* ------------------------------------------------------------------
       9. Menú del usuario autenticado (avatar en la barra)
    ------------------------------------------------------------------ */
    const userMenu = document.getElementById('userMenuWrap');
    const userBtn = document.getElementById('userMenuBtn');
    if (userMenu && userBtn) {
        const setUserMenu = open => {
            userMenu.classList.toggle('is-open', open);
            userBtn.setAttribute('aria-expanded', String(open));
        };
        userBtn.addEventListener('click', () => setUserMenu(!userMenu.classList.contains('is-open')));
        document.addEventListener('click', e => { if (!userMenu.contains(e.target)) setUserMenu(false); });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && userMenu.classList.contains('is-open')) { setUserMenu(false); userBtn.focus(); }
        });
        userMenu.addEventListener('focusout', e => { if (e.relatedTarget && !userMenu.contains(e.relatedTarget)) setUserMenu(false); });
    }
});
