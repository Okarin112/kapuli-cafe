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
        { text: '"Lo que busco es un lugar donde simplemente pueda estar."', author: "Haruki Murakami, <i>Crónica del pájaro que da cuerda al mundo</i>" },
        { text: '"Observar el mundo en silencio es la mejor forma de entenderlo."', author: "Natsume Sōseki, <i>Kusamakura</i>" },
        { text: '"La soledad es el único estado que permite la lucidez."', author: "Amélie Nothomb, <i>Higiene del asesino</i>" }
    ];
    
    const zenContainer = document.getElementById('zen-quote-container');
    if (zenContainer) {
        const randomQuote = zenQuotes[Math.floor(Math.random() * zenQuotes.length)];
        zenContainer.innerHTML = `${randomQuote.text} <span class="zen-quote-author">— ${randomQuote.author}</span>`;
    }
});
