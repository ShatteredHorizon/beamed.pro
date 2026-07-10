document.addEventListener('DOMContentLoaded', () => {

    // ===== NAVBAR SCROLL =====
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 10);
    });

    // ===== MOBILE MENU =====
    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('mobile-nav');

    if (burger && mobileNav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            mobileNav.classList.toggle('open');
            document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
        });

        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ===== SPLIT TEXT REVEAL =====
    const splitChildren = document.querySelectorAll('.split-child > span');
    if (splitChildren.length) {
        setTimeout(() => {
            splitChildren.forEach((span, i) => {
                setTimeout(() => span.classList.add('revealed'), i * 80);
            });
        }, 300);
    }

    // ===== BLUR TEXT REVEAL ON SCROLL =====
    const blurElements = document.querySelectorAll('.blur-text');
    if (blurElements.length) {
        const blurObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    blurObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        blurElements.forEach(el => blurObserver.observe(el));
    }

    // ===== FAQ ACCORDION =====
    document.querySelectorAll('.faq__question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const answer = item.querySelector('.faq__answer');
            const isActive = item.classList.contains('active');

            document.querySelectorAll('.faq__item').forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq__answer').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== HIGHLIGHT ACTIVE NAV LINK =====
    const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
    document.querySelectorAll('.header__link, .mobile-nav__link').forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/index\.html$/, '/');
        if (linkPath === currentPath || (currentPath === '/' && linkPath !== '/')) {
            // already handled by HTML classes
        }
    });

});