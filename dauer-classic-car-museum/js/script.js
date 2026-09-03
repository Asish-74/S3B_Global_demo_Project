const navbar = document.querySelector('.custom-navbar');

function updateNavbar() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 35);
}

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

/* Mobile navbar closes after navigation */
const navbarMenu = document.querySelector('#mainNavbar');
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (!navbarMenu || !navbarMenu.classList.contains('show')) return;
        const collapse = bootstrap.Collapse.getInstance(navbarMenu);
        if (collapse) collapse.hide();
    });
});

/* Scroll reveal */
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
if (revealElements.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.14 });

    revealElements.forEach((element, index) => {
        element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
        revealObserver.observe(element);
    });
}

/* Gallery lightbox */
const lightbox = document.querySelector('#galleryLightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxCaption = document.querySelector('#lightboxCaption');
const lightboxClose = document.querySelector('#lightboxClose');

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('show');
    document.body.style.overflow = '';
}

document.querySelectorAll('.gallery-view-btn').forEach(button => {
    button.addEventListener('click', () => {
        if (!lightbox || !lightboxImage) return;
        lightboxImage.src = button.dataset.image;
        lightboxImage.alt = button.dataset.title || 'Dauer Classic Cars';
        if (lightboxCaption) lightboxCaption.textContent = button.dataset.title || '';
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
    lightbox.addEventListener('click', event => {
        if (event.target === lightbox) closeLightbox();
    });
}
document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeLightbox();
});

/* Small count-up used on the home page */
const counters = document.querySelectorAll('[data-counter]');
if (counters.length) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const element = entry.target;
            const target = Number(element.dataset.counter);
            let current = 0;
            const step = Math.max(1, Math.ceil(target / 40));

            const tick = () => {
                current += step;
                if (current >= target) {
                    element.textContent = `${target}+`;
                    return;
                }
                element.textContent = current;
                requestAnimationFrame(tick);
            };
            tick();
            observer.unobserve(element);
        });
    }, { threshold: .6 });
    counters.forEach(counter => counterObserver.observe(counter));
}
