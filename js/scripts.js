/*!
* Start Bootstrap - Resume v7.0.5 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Accessibility: give icon-only links discernible names
    const socialLinks = document.querySelectorAll('.social-icons a.social-icon');
    socialLinks.forEach((link) => {
        if (link.getAttribute('aria-label')) return;

        const href = link.getAttribute('href') || '';
        const icon = link.querySelector('i');
        const iconClass = icon ? icon.className : '';

        let label = 'Social link';
        if (iconClass.includes('fa-twitter') || href.includes('twitter.com')) label = 'X (Twitter)';
        else if (iconClass.includes('fa-youtube') || href.includes('youtube.com') || href.includes('youtu.be')) label = 'YouTube';
        else if (iconClass.includes('fa-github') || href.includes('github.com')) label = 'GitHub';
        else if (href) label = href.replace(/^https?:\/\//, '').replace(/\/$/, '');

        link.setAttribute('aria-label', label);
        link.setAttribute('title', label);
    });

});
