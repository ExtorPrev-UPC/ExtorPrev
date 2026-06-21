document.addEventListener('DOMContentLoaded', () => {
    let intentosFallidos = 0;
    let loginBloqueado = false;
    const navLinks = document.querySelectorAll('.menu a');

    window.addEventListener('hashchange', () => {
        const hash = window.location.hash;
        if (hash === '#registro') {
            resetRegistro();
        } else if (hash === '#recuperacion') {
            resetRecuperar();
        }
    });

    if (window.location.hash === '#registro') {
        resetRegistro();
    }
    if (window.location.hash === '#recuperacion') {
        resetRecuperar();
    }

    const recuperarPaso1 = document.getElementById('recuperar-paso1');
    const recuperarPaso2 = document.getElementById('recuperar-paso2');
    const formRecuperarEmail = document.getElementById('form-recuperar-email');
    const formRecuperarPassword = document.getElementById('form-recuperar-password');

    function resetRecuperar() {
        if (recuperarPaso1 && recuperarPaso2 && formRecuperarEmail && formRecuperarPassword) {
            recuperarPaso1.classList.remove('hidden');
            recuperarPaso2.classList.add('hidden');
            formRecuperarEmail.reset();
            formRecuperarPassword.reset();
        }
    }

    const registroOpciones = document.querySelector('.registro-opciones');
    const registroFormularioContainer = document.querySelector('.registro-formulario-container');
    const formRegistro = document.getElementById('form-registro');
    const regRolInput = document.getElementById('reg-rol');
    const registroTitulo = document.getElementById('registro-titulo');

    const campoInstitucion = document.getElementById('campo-institucion');
    const camposConductor = document.getElementById('campos-conductor');

    function resetRegistro() {
        if (registroOpciones && registroFormularioContainer && formRegistro) {
            registroOpciones.classList.remove('hidden');
            registroFormularioContainer.classList.add('hidden');
            formRegistro.reset();
        }
    }

    document.querySelectorAll('.btn-tipo-registro').forEach(button => {
        button.addEventListener('click', () => {
            const tipo = button.dataset.tipo;
            regRolInput.value = tipo;

            registroOpciones.classList.add('hidden');
            registroFormularioContainer.classList.remove('hidden');

            if (tipo === 'pasajero') {
                registroTitulo.textContent = 'Registro de Pasajero';
                campoInstitucion.classList.remove('hidden');
                camposConductor.classList.add('hidden');
            } else {
                registroTitulo.textContent = 'Registro de Conductor';
                campoInstitucion.classList.add('hidden');
                camposConductor.classList.remove('hidden');
            }
        });
    });

    document.querySelector('.btn-volver-registro')?.addEventListener('click', () => {
        resetRegistro();
    });

    formRegistro?.addEventListener('submit', (e) => {
        e.preventDefault();

        const rol = regRolInput.value;
        const nombre = document.getElementById('reg-nombre').value.trim();
        const correo = document.getElementById('reg-correo').value.trim();
        const password = document.getElementById('reg-password').value.trim();

        // Validación
        if (!nombre || !correo || !password) {
            alert('Por favor, complete todos los campos obligatorios del registro.');
            return;
        }

        // Validación de campos según el rol
        if (rol === 'pasajero') {
            const institucion = document.getElementById('reg-institucion').value.trim();
            if (!institucion) {
                alert('Por favor, ingrese su Universidad o Institución.');
                return;
            }
        } else if (rol === 'conductor') {
            const placa = document.getElementById('reg-placa').value.trim();
            const linea = document.getElementById('reg-linea').value.trim();
            if (!placa || !linea) {
                alert('Por favor, ingrese la placa del vehículo y la línea de transporte.');
                return;
            }
        }

        alert(`¡Registro exitoso! Cuenta creada para ${nombre}. Ya puedes iniciar sesión.`);
        resetRegistro();
        window.location.hash = '#login';
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

    const landingSections = document.querySelectorAll('main.landing section[id]');

    const scrollSpy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.menu a[href="#${entry.target.id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, { threshold: 0.45, rootMargin: '-60px 0px 0px 0px' });

    landingSections.forEach(section => scrollSpy.observe(section));

    const loginForm = document.getElementById('form-login');
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        if (loginBloqueado) {
            alert('El acceso está bloqueado temporalmente por seguridad. Intente más tarde.');
            return;
        }

        const correo = document.getElementById('login-correo').value.trim();
        const password = document.getElementById('login-password').value.trim();

        // Validación 
        if (!correo || !password) {
            alert('Por favor, complete todos los campos obligatorios para iniciar sesión.');
            return;
        }

        // Simulación
        if (password === '123456') {
            intentosFallidos = 0;
            alert('¡Inicio de sesión exitoso! Bienvenido a ExtorPrev.');
            loginForm.reset();
            window.location.hash = '#home';
        } else {
            intentosFallidos++;
            if (intentosFallidos >= 3) {
                loginBloqueado = true;
                alert('Límite de intentos superado. Su cuenta ha sido bloqueada por 15 segundos.');
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                if (submitBtn) submitBtn.disabled = true;

                setTimeout(() => {
                    loginBloqueado = false;
                    intentosFallidos = 0;
                    if (submitBtn) submitBtn.disabled = false;
                    alert('El bloqueo temporal ha finalizado. Ya puede intentar iniciar sesión.');
                }, 15000);
            } else {
                alert(`Contraseña incorrecta. ${intentosFallidos} de 3.`);
            }
        }
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
                alert('Por favor ingrese un correo electrónico válido.');
                return;
            }

            alert(`¡Gracias, ${name}! Tu mensaje ha sido enviado correctamente.`);
            contactForm.reset();
        });
    }

    formRecuperarEmail?.addEventListener('submit', (e) => {
        e.preventDefault();
        const correo = document.getElementById('rec-correo').value.trim();

        if (!correo) {
            alert('Por favor, ingrese su correo electrónico.');
            return;
        }

        alert('Se han enviado las instrucciones de recuperación a tu correo electrónico.');
        recuperarPaso1.classList.add('hidden');
        recuperarPaso2.classList.remove('hidden');
    });

    formRecuperarPassword?.addEventListener('submit', (e) => {
        e.preventDefault();
        const nuevaPass = document.getElementById('rec-nueva-pass').value;
        const confirmarPass = document.getElementById('rec-confirmar-pass').value;

        if (!nuevaPass || !confirmarPass) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        if (nuevaPass !== confirmarPass) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        // Validación de requisitos
        if (nuevaPass.length < 8 || !/\d/.test(nuevaPass)) {
            alert('La contraseña debe tener al menos 8 caracteres y contener al menos un número.');
            return;
        }

        alert('¡Contraseña restablecida con éxito!');
        resetRecuperar();
        window.location.hash = '#login';
    });
});
