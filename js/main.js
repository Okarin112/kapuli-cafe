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

    // 3. Botón flotante del Chatbot ahora usa href directo en HTML

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

    // 8. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal-text');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const siblings = Array.from(entry.target.parentNode.querySelectorAll('.reveal-text'));
                    const index = siblings.indexOf(entry.target);
                    // Si el elemento no es parte de un grupo contiguo en su parent, el indexOf podría ser 0
                    // pero si lo es, añadimos retraso escalonado.
                    const delayIndex = index !== -1 ? index : 0;
                    
                    entry.target.style.transitionDelay = `${delayIndex * 150}ms`;
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // 9. Coffee Wheel Interactive Logic
    const wheelNodes = document.querySelectorAll('.wheel-node');
    const labCenterDisplay = document.getElementById('lab-center-display');
    const labTitle = document.getElementById('lab-title');
    const labDesc = document.getElementById('lab-desc');

    if (wheelNodes.length > 0 && labCenterDisplay) {
        const labData = {
            'extraccion': {
                title: 'Extracción Preferida',
                desc: 'Recomendamos V60 para resaltar sus notas cítricas limpias o Espresso para un cuerpo denso y achocolatado.',
                img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80'
            },
            'tueste': {
                title: 'Nivel de Tueste',
                desc: 'Tueste medio ligero. Perfil desarrollado cuidadosamente para equilibrar acidez brillante y dulzor natural.',
                img: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=800&q=80'
            },
            'secado': {
                title: 'Método de Secado',
                desc: 'Secado lento al sol en camas africanas elevadas, permitiendo una deshidratación homogénea y controlada.',
                img: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=800&q=80'
            },
            'origen': {
                title: 'Origen',
                desc: 'Junín, Perú. Cultivado a 1,530 m s. n. m. bajo la atenta mirada de la familia Marin.',
                img: 'https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=800&q=80'
            },
            'variedad': {
                title: 'Variedad',
                desc: 'Typica y Caturra bajo prácticas biodinámicas. Un ecosistema que respeta los ciclos cósmicos lunares.',
                img: 'https://images.unsplash.com/photo-1518832553480-1614ebf22497?auto=format&fit=crop&w=800&q=80'
            },
            'proceso': {
                title: 'Proceso',
                desc: 'Lavado orgánico con fermentación extendida. Las cerezas despulpadas reposan revelando su complejidad intrínseca.',
                img: 'https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&w=800&q=80'
            }
        };

        const updateCenterDisplay = (key) => {
            const data = labData[key];
            if (!data) return;

            // Trigger Fade Out
            labCenterDisplay.classList.add('fading');

            setTimeout(() => {
                labTitle.innerText = data.title;
                labDesc.innerText = data.desc;
                labCenterDisplay.style.backgroundImage = `url('${data.img}')`;
                
                // Trigger Fade In
                labCenterDisplay.classList.remove('fading');
            }, 400); // Matches the CSS transition duration
        };

        wheelNodes.forEach(node => {
            // Soporta click (mobile) y mouseenter (desktop)
            const triggerUpdate = (e) => {
                if (e.type === 'mouseenter' && window.innerWidth <= 900) return; // Prevent double trigger on mobile tap
                
                // Update active class
                wheelNodes.forEach(n => n.classList.remove('active'));
                node.classList.add('active');
                
                const key = node.getAttribute('data-key');
                updateCenterDisplay(key);
            };

            node.addEventListener('mouseenter', triggerUpdate);
            node.addEventListener('click', triggerUpdate);
        });
    }
});
