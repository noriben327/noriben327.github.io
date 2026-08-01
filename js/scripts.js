//
// noriben portfolio — nav behaviour (no framework)
//

(() => {
    const rail = document.querySelector('.rail');
    const nav = document.getElementById('railNav');
    const toggle = document.querySelector('.rail-toggle');
    const links = Array.from(document.querySelectorAll('.rail-nav a[href^="#"]'));
    const hero = document.getElementById('about');
    const mobile = window.matchMedia('(max-width: 768px)');

    // --- Mobile menu -------------------------------------------------------

    const setMenuOpen = (open, restoreFocus = false) => {
        if (!nav || !toggle) return;
        nav.classList.toggle('is-open', open);
        nav.toggleAttribute('inert', mobile.matches && !open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
        if (!open && restoreFocus) toggle.focus();
    };

    const closeMenu = (restoreFocus = false) => setMenuOpen(false, restoreFocus);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            setMenuOpen(!nav.classList.contains('is-open'));
        });

        links.forEach((link) => link.addEventListener('click', () => closeMenu()));

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('is-open')) {
                closeMenu(true);
            }
        });

        document.addEventListener('click', (e) => {
            if (mobile.matches && nav.classList.contains('is-open') && !rail.contains(e.target)) {
                closeMenu();
            }
        });

        mobile.addEventListener('change', () => closeMenu());
        closeMenu();
    }

    // --- Scrollspy ---------------------------------------------------------
    // A probe line sits at 35% of the viewport; the section crossing it wins.
    // Ratio-based observation is unusable here because #experience is many
    // screens tall while #contact is short.

    const sections = links
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if (!sections.length) return;

    let current = null;

    const setActive = (id) => {
        if (id === current) return;
        current = id;
        links.forEach((link) => {
            const active = link.getAttribute('href') === '#' + id;
            link.classList.toggle('is-active', active);
            if (active) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    // --- Bar visibility ----------------------------------------------------
    // The bar stays tucked away while the hero owns the screen, which keeps
    // the hero full-bleed and stops the avatar appearing twice at once.

    const barHeight = () =>
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--bar-h'))
            * parseFloat(getComputedStyle(document.documentElement).fontSize) || 60;

    const updateBar = () => {
        if (!rail || !hero) return;
        const tuck = hero.getBoundingClientRect().bottom > barHeight();
        if (tuck === rail.hasAttribute('data-tucked')) return;
        rail.toggleAttribute('inert', tuck);
        if (tuck) {
            rail.setAttribute('data-tucked', '');
            closeMenu();
        } else {
            rail.removeAttribute('data-tucked');
        }
    };

    const update = () => {
        updateBar();

        const probe = window.innerHeight * 0.35;
        const atBottom =
            window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;

        if (atBottom) {
            setActive(sections[sections.length - 1].id);
            return;
        }

        let active = sections[0];
        sections.forEach((section) => {
            if (section.getBoundingClientRect().top <= probe) active = section;
        });
        setActive(active.id);
    };

    // Called straight from the event — four getBoundingClientRect reads is
    // cheap, and rAF would stall whenever the page is not being painted.
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
})();
