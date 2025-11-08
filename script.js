// ========================================
// Smooth Scroll para enlaces de navegación
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Cerrar menú móvil si está abierto
            const navbarCollapse = document.querySelector('.navbar-collapse');
            const navbarContainer = document.querySelector('.navbar-container');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse);
                if (collapseInstance) {
                    collapseInstance.hide();
                }
            }
            // Remover clase menu-open
            if (navbarContainer) {
                navbarContainer.classList.remove('menu-open');
            }
        }
    });
});

// ========================================
// Navbar Scroll Effect
// ========================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const navbarContainer = document.querySelector('.navbar-container');
    
    if (currentScroll > 100) {
        if (navbarContainer) {
            navbarContainer.style.padding = '0.6rem 1.8rem';
            navbarContainer.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.05) inset, 0 0 40px rgba(74, 158, 255, 0.1)';
        }
        navbar.style.padding = '1rem 1rem';
    } else {
        if (navbarContainer) {
            navbarContainer.style.padding = '0.75rem 2rem';
            navbarContainer.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset, 0 0 40px rgba(74, 158, 255, 0.08)';
        }
        navbar.style.padding = '1.5rem 1rem';
    }
    
    lastScroll = currentScroll;
});

// Portfolio filtering removed - categories are now displayed on cards

// ========================================
// Portfolio Video Modal
// ========================================
const portfolioCards = document.querySelectorAll('#portfolio-videos .portfolio-card');
const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
const videoFrame = document.getElementById('videoFrame');

portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
        // Aquí puedes agregar la URL del video cuando la tengas
        // Por ahora, usaremos un video de ejemplo de YouTube
        const videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
        videoFrame.src = videoUrl;
        videoModal.show();
    });
});

// Limpiar el iframe cuando se cierre el modal
document.getElementById('videoModal').addEventListener('hidden.bs.modal', () => {
    videoFrame.src = '';
});

// ========================================
// Portfolio Thumbnail Modal
// ========================================
const thumbnailCards = document.querySelectorAll('#portfolio-miniaturas .portfolio-card');
const thumbnailModal = new bootstrap.Modal(document.getElementById('thumbnailModal'));
const thumbnailFullImage = document.getElementById('thumbnailFullImage');

// Array con las rutas de las imágenes de miniaturas
const thumbnailImages = [
    'img/miniaturas/David.png',
    'img/miniaturas/David2.png',
    'img/miniaturas/Nicolenco.png',
    'img/miniaturas/Kilos.png',
    'img/miniaturas/Alemizzle.png',
    'img/miniaturas/CuchoRapido.png'
];

thumbnailCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        if (thumbnailImages[index]) {
            thumbnailFullImage.src = thumbnailImages[index];
            thumbnailFullImage.alt = `Miniatura ${index + 1}`;
            thumbnailModal.show();
        }
    });
});

// Limpiar la imagen cuando se cierre el modal
document.getElementById('thumbnailModal').addEventListener('hidden.bs.modal', () => {
    thumbnailFullImage.src = '';
});

// ========================================
// Hero Video Placeholder Click
// ========================================
const heroVideoPlaceholder = document.querySelector('.video-placeholder');
if (heroVideoPlaceholder) {
    heroVideoPlaceholder.addEventListener('click', () => {
        const videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
        videoFrame.src = videoUrl;
        videoModal.show();
    });
}

// ========================================
// Form Validation y Submit
// ========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener valores del formulario
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validación básica
        const inputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
                input.addEventListener('input', () => {
                    input.style.borderColor = '';
                }, { once: true });
            }
        });
        
        if (isValid) {
            // Aquí puedes agregar la lógica para enviar el formulario
            // Por ejemplo, usando Fetch API o enviando a un servidor
            showNotification('¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.', 'success');
            contactForm.reset();
        } else {
            showNotification('Por favor, completa todos los campos requeridos.', 'error');
        }
    });
}

// ========================================
// Notification System
// ========================================
function showNotification(message, type = 'success') {
    // Remover notificación existente si hay una
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bi ${type === 'success' ? 'bi-check-circle' : 'bi-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Agregar estilos inline para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#A5D6A7' : '#EF9A9A'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ========================================
// Intersection Observer para animaciones
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos que deben animarse al hacer scroll
const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .portfolio-item, .contact-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ========================================
// Back to Top Button
// ========================================
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.transform = 'translateY(0)';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.transform = 'translateY(10px)';
        }
    });
    
    backToTop.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    backToTop.style.opacity = '0';
}

// ========================================
// Parallax Effect en Hero Section
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroVideo = document.querySelector('.hero-video-container');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
    
    if (heroVideo && scrolled < window.innerHeight) {
        heroVideo.style.transform = `translateY(${scrolled * 0.2}px)`;
        heroVideo.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// ========================================
// Active Navigation Link
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Counter Animation (opcional para estadísticas)
// ========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ========================================
// Cursor Effect (opcional, efecto suave)
// ========================================
document.addEventListener('mousemove', (e) => {
    // Efecto de cursor suave opcional
    // Puedes descomentar esto si quieres un efecto de cursor personalizado
    /*
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
    */
});

// ========================================
// Preloader (opcional)
// ========================================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// ========================================
// Agregar animaciones CSS adicionales
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-content i {
        font-size: 1.5rem;
    }
    
    .navbar-nav .nav-link.active {
        color: var(--primary-color) !important;
        background: var(--pastel-lavender);
    }
`;
document.head.appendChild(style);

// ========================================
// Sistema de Traducción (i18n)
// ========================================
const translations = {
    es: {
        nav: {
            home: "Inicio",
            clients: "Mis Clientes",
            portfolio: "Portafolio",
            testimonials: "Recomendaciones",
            contact: "Contacto"
        },
        hero: {
            title: "Transformamos tus Ideas en ",
            titleHighlight: "Videos Excepcionales",
            subtitle: "Edición profesional con un toque artístico. Cada frame cuenta una historia única.",
            btnPortfolio: "Ver Portafolio",
            btnContact: "Contactar",
            featuredVideo: "Video Destacado"
        },
        services: {
            title: "Nuestros Servicios",
            subtitle: "Soluciones completas de edición para cada necesidad",
            service1: {
                title: "Edición de Videos",
                description: "Edición profesional con cortes precisos, transiciones suaves y efectos visuales impactantes."
            },
            service2: {
                title: "Miniaturas",
                description: "Diseño de miniaturas atractivas y profesionales que capturan la atención y aumentan el clic en tus videos."
            }
        },
        portfolio: {
            title: "Portafolio",
            watchVideo: "Ver Video",
            viewFull: "Ver Completo",
            videos: {
                title: "Videos"
            },
            miniaturas: {
                title: "Miniaturas"
            },
            category: {
                professional: "Estilo Profesional",
                advanced3d: "3D Avanzado",
                karmaland: "KARMALAND",
                multicam: "Multicámaras"
            },
            modal: {
                videoTitle: "Reproducir Video",
                thumbnailTitle: "Miniatura Completa"
            }
        },
        clients: {
            title: "Mis Clientes",
            subtitle: "Descubre los creadores de contenido con los que trabajo. Me enorgullece ayudar a mis clientes a alcanzar sus objetivos y superar sus expectativas.",
            client1: {
                name: "Amichain",
                metric: "@amichainORG"
            },
            client2: {
                name: "Alemizzle",
                metric: "@alemizzle"
            },
            client3: {
                name: "Say Guz",
                metric: "@say_guz"
            },
            client4: {
                name: "Andy Lives",
                metric: "@andylives00"
            },
            client5: {
                name: "Leandro Loaiza",
                metric: "@leandroloaizam"
            },
            client6: {
                name: "UltravioletaDAO LLC",
                metric: "@UltravioletaDAO"
            }
        },
        testimonials: {
            title: "Recomendaciones",
            subtitle: "Escucha lo que dicen nuestros clientes sobre nuestro servicio",
            audioNotSupported: "Tu navegador no soporta la reproducción de audio.",
            testimonial1: {
                text: "\"Increíble trabajo. Superó todas nuestras expectativas. El editor tiene un ojo increíble para los detalles y la creatividad.\"",
                name: "María González",
                role: "Directora de Marketing"
            },
            testimonial2: {
                text: "\"Profesionalismo y calidad excepcional. Entregaron el proyecto antes de tiempo y con una calidad que nos dejó sin palabras.\"",
                name: "Carlos Ramírez",
                role: "CEO, TechStart"
            },
            testimonial3: {
                text: "\"El mejor editor con el que hemos trabajado. Entiende perfectamente la visión del cliente y la lleva a otro nivel.\"",
                name: "Ana Martínez",
                role: "Productora de Eventos"
            }
        },
        contact: {
            title: "Vamos a Trabajar Juntos",
            subtitle: "Listo para llevar tu contenido al siguiente nivel? Contáctame y empecemos",
            email: {
                title: "Email",
                button: "Email"
            },
            twitter: {
                title: "Twitter",
                button: "Twitter"
            },
            telegram: {
                title: "Telegram",
                button: "Telegram"
            }
        },
        modal: {
            videoTitle: "Reproducir Video",
            thumbnailTitle: "Miniatura Completa"
        }
    },
    en: {
        nav: {
            home: "Home",
            clients: "My Clients",
            portfolio: "Portfolio",
            testimonials: "Recommendations",
            contact: "Contact"
        },
        hero: {
            title: "We Transform Your Ideas into ",
            titleHighlight: "Exceptional Videos",
            subtitle: "Professional editing with an artistic touch. Every frame tells a unique story.",
            btnPortfolio: "View Portfolio",
            btnContact: "Contact",
            featuredVideo: "Featured Video"
        },
        services: {
            title: "Our Services",
            subtitle: "Complete editing solutions for every need",
            service1: {
                title: "Video Editing",
                description: "Professional editing with precise cuts, smooth transitions and impactful visual effects."
            },
            service2: {
                title: "Thumbnails",
                description: "Design of attractive and professional thumbnails that capture attention and increase clicks on your videos."
            }
        },
        portfolio: {
            title: "Portfolio",
            watchVideo: "Watch Video",
            viewFull: "View Full",
            videos: {
                title: "Videos"
            },
            miniaturas: {
                title: "Thumbnails"
            },
            category: {
                professional: "Professional Style",
                advanced3d: "Advanced 3D",
                karmaland: "KARMALAND",
                multicam: "Multi-Cameras"
            },
            modal: {
                videoTitle: "Play Video",
                thumbnailTitle: "Full Thumbnail"
            }
        },
        clients: {
            title: "My Clients",
            subtitle: "Discover the content creators I work with. I am proud to help my clients achieve their goals and exceed their expectations.",
            client1: {
                name: "Amichain",
                metric: "@amichainORG"
            },
            client2: {
                name: "Alemizzle",
                metric: "@alemizzle"
            },
            client3: {
                name: "Say Guz",
                metric: "@say_guz"
            },
            client4: {
                name: "Andy Lives",
                metric: "@andylives00"
            },
            client5: {
                name: "Leandro Loaiza",
                metric: "@leandroloaizam"
            },
            client6: {
                name: "UltravioletaDAO LLC",
                metric: "@UltravioletaDAO"
            }
        },
        testimonials: {
            title: "Recommendations",
            subtitle: "Listen to what our clients say about our service",
            audioNotSupported: "Your browser does not support audio playback.",
            testimonial1: {
                text: "\"Incredible work. It exceeded all our expectations. The editor has an incredible eye for detail and creativity.\"",
                name: "María González",
                role: "Marketing Director"
            },
            testimonial2: {
                text: "\"Exceptional professionalism and quality. They delivered the project ahead of time with a quality that left us speechless.\"",
                name: "Carlos Ramírez",
                role: "CEO, TechStart"
            },
            testimonial3: {
                text: "\"The best editor we have worked with. He perfectly understands the client's vision and takes it to another level.\"",
                name: "Ana Martínez",
                role: "Event Producer"
            }
        },
        contact: {
            title: "Let's Work Together",
            subtitle: "Ready to take your content to the next level? Contact me and let's get started",
            email: {
                title: "Email",
                button: "Email"
            },
            twitter: {
                title: "Twitter",
                button: "Twitter"
            },
            telegram: {
                title: "Telegram",
                button: "Telegram"
            }
        },
        modal: {
            videoTitle: "Play Video",
            thumbnailTitle: "Full Thumbnail"
        }
    }
};

// Obtener idioma guardado o usar español por defecto
let currentLanguage = localStorage.getItem('language') || 'es';

// Función para obtener traducción
function getTranslation(key, lang = currentLanguage) {
    const keys = key.split('.');
    let value = translations[lang];
    
    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            // Si no encuentra la traducción, intenta con español
            if (lang !== 'es') {
                return getTranslation(key, 'es');
            }
            return key; // Devuelve la clave si no encuentra traducción
        }
    }
    
    return value;
}

// Función para cambiar el idioma
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Actualizar atributo lang del HTML
    document.getElementById('html-lang').setAttribute('lang', lang);
    
        // Actualizar título de la página
        document.title = lang === 'es' 
            ? 'Roypi - Edición Profesional de Videos'
            : 'Roypi - Professional Video Editing';
    
    // Traducir todos los elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key, lang);
        
        if (translation) {
            // Si el elemento es un input, textarea, actualizar el placeholder o value
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.getAttribute('placeholder')) {
                    element.setAttribute('placeholder', translation);
                } else {
                    element.value = translation;
                }
            } 
            // Si es un botón sin iconos dentro
            else if (element.tagName === 'BUTTON' && !element.querySelector('i') && !element.querySelector('svg')) {
                element.textContent = translation;
            } 
            // Si es un span dentro de un botón con icono (como los botones de contacto)
            else if (element.tagName === 'SPAN' && element.parentElement.classList.contains('contact-card-btn')) {
                element.textContent = translation;
            }
            // Si es un span dentro de portfolio-category
            else if (element.tagName === 'SPAN' && element.parentElement.classList.contains('portfolio-category')) {
                element.textContent = translation;
            }
            // Para elementos normales (p, h1, h2, h3, etc.) o spans normales
            else {
                element.textContent = translation;
            }
        }
    });
    
    // Actualizar botones de idioma
    document.querySelectorAll('.btn-language').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// Event listeners para los botones de idioma
document.addEventListener('DOMContentLoaded', () => {
    const btnLangEs = document.getElementById('btn-lang-es');
    const btnLangEn = document.getElementById('btn-lang-en');
    
    if (btnLangEs) {
        btnLangEs.addEventListener('click', () => changeLanguage('es'));
    }
    
    if (btnLangEn) {
        btnLangEn.addEventListener('click', () => changeLanguage('en'));
    }
    
    // Aplicar idioma guardado al cargar la página
    changeLanguage(currentLanguage);
    
    // ========================================
    // Navbar Collapse Animation Handler
    // ========================================
    const navbarCollapse = document.getElementById('navbarNav');
    const navbarContainer = document.querySelector('.navbar-container');
    
    if (navbarCollapse && navbarContainer) {
        navbarCollapse.addEventListener('show.bs.collapse', () => {
            navbarContainer.classList.add('menu-open');
        });
        
        navbarCollapse.addEventListener('hide.bs.collapse', () => {
            navbarContainer.classList.remove('menu-open');
        });
    }
});

console.log('Roypi - Página cargada exitosamente');

