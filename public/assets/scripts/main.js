document.addEventListener('DOMContentLoaded', () => {
    const landing = document.querySelector('.landing');
    const paginaLogin = document.querySelector('.pagina.login');
    const paginaRegistro = document.querySelector('.pagina.registro');
    const navLinks = document.querySelectorAll('.menu a, .logo');

    const scrollTargets = {
        '#home': '.inicio',
        '#nosotros': '.nosotros',
        '#sobre-app': '.app',
        '#contacto': '.contacto'
    };

    function mostrarLanding() {
        landing.classList.remove('hidden');
        paginaLogin.classList.add('hidden');
        paginaRegistro.classList.add('hidden');
    }

    function mostrarPagina(pagina) {
        landing.classList.add('hidden');
        paginaLogin.classList.add('hidden');
        paginaRegistro.classList.add('hidden');
        pagina.classList.remove('hidden');
        window.scrollTo(0, 0);
    }

    paginaLogin.classList.add('hidden');
    paginaRegistro.classList.add('hidden');

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        const href = link.getAttribute('href');
        const target = scrollTargets[href];

        if (target) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                mostrarLanding();
                document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
            });
        }
    });

    document.querySelectorAll('[data-pagina]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (link.dataset.pagina === 'login') {
                mostrarPagina(paginaLogin);
            } else {
                mostrarPagina(paginaRegistro);
            }
        });
    });

    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');

    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });

        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                menuBtn.classList.remove('active');
            });
        });
    }

    document.querySelector('.pagina.login form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Inicio de sesión correctamente.');
    });

    const contactForm = document.querySelector('.contacto .formulario');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fields = contactForm.querySelectorAll('input, textarea');
            const name = fields[0].value.trim();
            const email = fields[1].value.trim();
            const subject = fields[2].value.trim();

            if (!name || !email || !subject) {
                alert('Por favor, complete todos los campos.');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Por favor, ingrese un correo electrónico.');
                return;
            }

            alert(`¡Gracias, ${name}! Tu mensaje ha sido enviado correctamente.`);
            contactForm.reset();
        });
    }
});
