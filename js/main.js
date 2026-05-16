// Lógica Principal de la UI

document.addEventListener('DOMContentLoaded', () => {
    // 0. Splash Screen Logic
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                splashScreen.style.opacity = '0';
                setTimeout(() => {
                    splashScreen.style.display = 'none';
                }, 500);
            }, 1500);
        });
    }

    // 1. Manejo del Header Transparente -> Sólido al hacer scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 1.5 Manejo del Menú Drawer Mobile
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });

        // Cerrar el drawer al hacer clic en un enlace
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }

    // 2. Smooth Scrolling para los enlaces del nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // En caso de que sea el chatbot o similar
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Botón flotante del Chatbot (Acción de ejemplo)
    const floatingChat = document.getElementById('floating-chat');
    if (floatingChat) {
        floatingChat.addEventListener('click', (e) => {
            e.preventDefault();
            // Aquí se puede abrir un modal de chat o redirigir a WhatsApp
            console.log('Abrir Chat / WhatsApp');
            // window.open('https://wa.me/numero_aqui', '_blank');
            alert('¡Hola! Pronto podrás conversar con nosotros por aquí.');
        });
    }

    // 4. Citas Zen Dinámicas
    const initZenQuotes = () => {
        const zenQuotes = [
            { text: '"Lo que busco es un lugar donde simplemente pueda estar."', author: "Haruki Murakami", obra: "Crónica del pájaro que da cuerda al mundo" },
            { text: '"Observar el mundo en silencio es la mejor forma de entenderlo."', author: "Natsume Sōseki", obra: "Kusamakura" },
            { text: '"La soledad es el único estado que permite la lucidez."', author: "Amélie Nothomb", obra: "Higiene del asesino" }
        ];
        
        const zenContainer = document.getElementById('zen-quote-container');
        if (zenContainer) {
            const randomQuote = zenQuotes[Math.floor(Math.random() * zenQuotes.length)];
            zenContainer.innerHTML = `${randomQuote.text} <span class="zen-quote-author">— ${randomQuote.author} (<i>${randomQuote.obra}</i>)</span>`;
        }
    };
    
    // 5. Mountain Dashboard
    const updateMountainWeather = () => {
        const mountainDashboard = document.getElementById('mountain-dashboard');
        if (mountainDashboard) {
            // Null checks para cada elemento de montaña
            const tempHuarazEl = document.getElementById('temp-huaraz');
            if (tempHuarazEl) tempHuarazEl.innerText = "18°C";
            const condHuarazEl = document.getElementById('cond-huaraz');
            if (condHuarazEl) condHuarazEl.innerText = "Despejado";

            const tempChurupEl = document.getElementById('temp-churup');
            if (tempChurupEl) tempChurupEl.innerText = "8°C";
            const condChurupEl = document.getElementById('cond-churup');
            if (condChurupEl) condChurupEl.innerText = "Nublado";

            const tempVallunaEl = document.getElementById('temp-valluna');
            if (tempVallunaEl) tempVallunaEl.innerText = "-4°C";
            const condVallunaEl = document.getElementById('cond-valluna');
            if (condVallunaEl) condVallunaEl.innerText = "Viento Fuerte";

            // Animación sutil de carga
            Array.from(mountainDashboard.children).forEach((child, index) => {
                child.animate([
                    { opacity: 0, transform: 'translateY(10px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], { duration: 500, delay: index * 100, fill: 'forwards' });
            });
        }
    };

    updateMountainWeather();
    initZenQuotes();

    // 7. Custom Cursor Mover
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }
});
