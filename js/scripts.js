//
// noriben portfolio — nav behaviour (no framework)
//

(() => {
    const nav = document.getElementById('railNav');
    const toggle = document.querySelector('.rail-toggle');
    const links = Array.from(document.querySelectorAll('.rail-nav a[href^="#"]'));

    // --- Mobile menu -------------------------------------------------------

    const closeMenu = () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
    };

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const open = nav.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(open));
        });

        links.forEach((link) => link.addEventListener('click', closeMenu));

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });
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
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
        });
    };

    const update = () => {
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
