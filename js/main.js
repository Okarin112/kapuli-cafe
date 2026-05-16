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
    
    // 5. Mountain Dashboard
    const mountainDashboard = document.getElementById('mountain-dashboard');
    if (mountainDashboard) {
        // Estructura lista para futura conexión a OpenWeather API:
        // const fetchWeather = async (lat, lon) => {
        //     const API_KEY = 'TU_API_KEY_AQUI';
        //     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        //     return await response.json();
        // };

        // Datos simulados basados en gradientes térmicos reales
        const mountainData = [
            { name: "Huaraz (3,052m)", temp: "18°C", cond: "Despejado", icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>` },
            { name: "Laguna Churup (4,450m)", temp: "8°C", cond: "Nublado", icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>` },
            { name: "Nevado Vallunaraju (5,686m)", temp: "-4°C", cond: "Viento Fuerte", icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>` }
        ];

        const updateMountainWeather = () => {
            mountainDashboard.innerHTML = mountainData.map(m => `
                <div class="weather-card">
                    <div class="weather-location">${m.name}</div>
                    <div class="weather-data" style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                        ${m.icon}
                        <span>${m.temp} | ${m.cond}</span>
                    </div>
                </div>
            `).join('');
            
            // Animación sutil de carga
            Array.from(mountainDashboard.children).forEach((child, index) => {
                child.animate([
                    { opacity: 0, transform: 'translateY(10px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], { duration: 500, delay: index * 100, fill: 'forwards' });
            });
        };

        updateMountainWeather();
    }

    // 7. Custom Cursor Mover
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }
});
