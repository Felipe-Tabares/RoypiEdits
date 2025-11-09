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

// Variable para el contenedor del video
const videoContainer = document.getElementById('videoContainer');

// Array con las URLs de los videos para embed
// Twitter/X: https://x.com/Daveit_/status/1983673716090519606
// YouTube videos: usando youtube-nocookie.com para evitar problemas de cookies y Error 153
const videoUrls = [
    'https://platform.twitter.com/embed/Tweet.html?id=1983673716090519606&theme=dark&dnt=true', // Twitter/X
    'https://www.youtube-nocookie.com/embed/rmR77SOYNDM?si=FuvNhdQYjP6fgCZH&autoplay=1&rel=0&modestbranding=1', // YouTube
    'https://www.youtube-nocookie.com/embed/dKNuDwCpZN8?si=HKcDHzyhc--oi1_T&autoplay=1&rel=0&modestbranding=1', // YouTube
    'https://www.youtube-nocookie.com/embed/Yq4tucwULhk?si=Ey3qhQId7mtDxWlG&autoplay=1&rel=0&modestbranding=1', // YouTube
    'https://www.youtube-nocookie.com/embed/3E8J3QnAAhI?si=aiYoWE57uqNQNpTI&autoplay=1&rel=0&modestbranding=1'  // YouTube
];

// Array con los IDs de YouTube para thumbnails
const youtubeVideoIds = [
    null, // Twitter (no tiene YouTube ID)
    'rmR77SOYNDM',
    'dKNuDwCpZN8',
    'Yq4tucwULhk',
    '3E8J3QnAAhI'
];

// Array con URLs de thumbnails
// Para YouTube: usar la API de thumbnails de YouTube
// Para Twitter: usar una imagen placeholder (puedes reemplazarla con una imagen personalizada)
const videoThumbnails = [
    'https://pbs.twimg.com/media/GaZqQxGXcAEFJfZ?format=jpg&name=large', // Thumbnail del tweet (si no funciona, usar fallback)
    'https://img.youtube.com/vi/rmR77SOYNDM/maxresdefault.jpg',
    'https://img.youtube.com/vi/dKNuDwCpZN8/maxresdefault.jpg',
    'https://img.youtube.com/vi/Yq4tucwULhk/maxresdefault.jpg',
    'https://img.youtube.com/vi/3E8J3QnAAhI/maxresdefault.jpg'
];

// Fallback para thumbnails de YouTube si maxresdefault no está disponible
const videoThumbnailsFallback = [
    'https://via.placeholder.com/1280x720/1a2332/4a9eff?text=Twitter+Video', // Fallback para Twitter
    'https://img.youtube.com/vi/rmR77SOYNDM/hqdefault.jpg',
    'https://img.youtube.com/vi/dKNuDwCpZN8/hqdefault.jpg',
    'https://img.youtube.com/vi/Yq4tucwULhk/hqdefault.jpg',
    'https://img.youtube.com/vi/3E8J3QnAAhI/hqdefault.jpg'
];

// Aplicar thumbnails a las tarjetas de video
document.addEventListener('DOMContentLoaded', () => {
    const portfolioImages = document.querySelectorAll('#portfolio-videos .portfolio-image[data-video-thumbnail]');
    portfolioImages.forEach((img, index) => {
        const thumbnailIndex = parseInt(img.getAttribute('data-video-thumbnail'));
        if (videoThumbnails[thumbnailIndex]) {
            // Crear una imagen para verificar si el thumbnail carga correctamente
            const testImg = new Image();
            testImg.onload = () => {
                img.style.backgroundImage = `url('${videoThumbnails[thumbnailIndex]}')`;
                img.style.backgroundSize = 'cover';
                img.style.backgroundPosition = 'center';
                img.style.backgroundRepeat = 'no-repeat';
            };
            testImg.onerror = () => {
                // Si falla, usar el fallback
                if (videoThumbnailsFallback[thumbnailIndex]) {
                    img.style.backgroundImage = `url('${videoThumbnailsFallback[thumbnailIndex]}')`;
                    img.style.backgroundSize = 'cover';
                    img.style.backgroundPosition = 'center';
                    img.style.backgroundRepeat = 'no-repeat';
                }
            };
            testImg.src = videoThumbnails[thumbnailIndex];
        }
    });
});

portfolioCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        if (videoUrls[index]) {
            const url = videoUrls[index];
            
            // Verificar si estamos usando file:// protocol (puede causar problemas)
            const isLocalFile = window.location.protocol === 'file:';
            if (isLocalFile && (url.includes('youtube.com') || url.includes('youtube-nocookie.com'))) {
                // Si es file:// y es YouTube, mostrar advertencia y abrir en nueva pestaña
                if (confirm('Para ver los videos correctamente, es recomendable usar un servidor local (por ejemplo, con Live Server). ¿Deseas abrir el video en YouTube en una nueva pestaña?')) {
                    const videoId = youtubeVideoIds[index];
                    if (videoId) {
                        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
                    }
                }
                return;
            }
            
            // Para todos los videos, mostrar en el modal
            if (url.includes('platform.twitter.com')) {
                // Para Twitter, usar altura específica y permitir el embed
                if (videoContainer) {
                    videoContainer.className = 'ratio';
                    videoContainer.style.height = '650px';
                    videoFrame.style.height = '650px';
                    videoFrame.style.width = '100%';
                }
                // Limpiar iframe
                videoFrame.removeAttribute('src');
                videoFrame.src = 'about:blank';
                
                setTimeout(() => {
                    videoFrame.src = url;
                    videoFrame.setAttribute('allow', 'autoplay; encrypted-media');
                    videoFrame.setAttribute('allowfullscreen', 'true');
                    videoFrame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
                    videoModal.show();
                }, 50);
            } else if (url.includes('youtube.com') || url.includes('youtu.be') || url.includes('youtube-nocookie.com')) {
                // Para YouTube, usar ratio 16x9 con parámetros correctos
                if (videoContainer) {
                    videoContainer.className = 'ratio ratio-16x9';
                    videoContainer.style.height = '';
                    videoFrame.style.height = '';
                    videoFrame.style.width = '';
                }
                
                // Limpiar completamente el iframe antes de establecer la nueva URL
                videoFrame.removeAttribute('src');
                videoFrame.src = 'about:blank';
                
                // Esperar un momento para que el iframe se limpie completamente
                setTimeout(() => {
                    // Configurar TODOS los atributos necesarios del iframe en el orden correcto
                    videoFrame.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen');
                    videoFrame.setAttribute('allowfullscreen', '');
                    videoFrame.setAttribute('frameborder', '0');
                    videoFrame.setAttribute('title', 'YouTube video player');
                    videoFrame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
                    
                    // Asegurar que el iframe tenga los estilos correctos
                    videoFrame.style.border = 'none';
                    videoFrame.style.width = '100%';
                    videoFrame.style.height = '100%';
                    videoFrame.style.display = 'block';
                    
                    // Establecer la URL como último paso
                    videoFrame.setAttribute('src', url);
                    
                    // Mostrar el modal
                    videoModal.show();
                }, 150);
            }
        }
    });
});

// Limpiar el iframe cuando se cierre el modal
const videoModalElement = document.getElementById('videoModal');
if (videoModalElement) {
    videoModalElement.addEventListener('hidden.bs.modal', () => {
        if (videoFrame) {
            // Detener cualquier reproducción antes de limpiar
            try {
                videoFrame.contentWindow?.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
            } catch (e) {
                // Ignorar errores de cross-origin
            }
            // Limpiar completamente el iframe
            videoFrame.removeAttribute('src');
            videoFrame.src = 'about:blank';
        }
    });
    
    // También limpiar cuando el modal se oculte (por si acaso)
    videoModalElement.addEventListener('hide.bs.modal', () => {
        if (videoFrame) {
            try {
                videoFrame.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            } catch (e) {
                // Ignorar errores
            }
        }
    });
}

// ========================================
// Portfolio Thumbnail Modal
// ========================================
const thumbnailCards = document.querySelectorAll('#portfolio-miniaturas .portfolio-card');
const thumbnailModal = new bootstrap.Modal(document.getElementById('thumbnailModal'));
const thumbnailFullImage = document.getElementById('thumbnailFullImage');

// Array con las rutas de las imágenes de miniaturas
const thumbnailImages = [
    'img/miniaturas/alemizzle 2.png',
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
    
    // Actualizar botones de idioma (tanto desktop como móvil)
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
    const btnLangEsMobile = document.getElementById('btn-lang-es-mobile');
    const btnLangEnMobile = document.getElementById('btn-lang-en-mobile');
    
    // Desktop buttons
    if (btnLangEs) {
        btnLangEs.addEventListener('click', () => changeLanguage('es'));
    }
    
    if (btnLangEn) {
        btnLangEn.addEventListener('click', () => changeLanguage('en'));
    }
    
    // Mobile buttons
    if (btnLangEsMobile) {
        btnLangEsMobile.addEventListener('click', () => changeLanguage('es'));
    }
    
    if (btnLangEnMobile) {
        btnLangEnMobile.addEventListener('click', () => changeLanguage('en'));
    }
    
    // Aplicar idioma guardado al cargar la página
    changeLanguage(currentLanguage);
    
    // ========================================
    // Navbar Collapse Animation Handler
    // ========================================
    const navbarCollapse = document.getElementById('navbarNav');
    const navbarContainer = document.querySelector('.navbar-container');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCloseBtn = document.querySelector('.navbar-close-btn');
    
    if (navbarCollapse && navbarContainer) {
        navbarCollapse.addEventListener('show.bs.collapse', () => {
            navbarContainer.classList.add('menu-open');
            // Actualizar aria-expanded
            if (navbarToggler) {
                navbarToggler.setAttribute('aria-expanded', 'true');
            }
            if (navbarCloseBtn) {
                navbarCloseBtn.setAttribute('aria-expanded', 'true');
            }
        });
        
        navbarCollapse.addEventListener('hide.bs.collapse', () => {
            navbarContainer.classList.remove('menu-open');
            // Actualizar aria-expanded
            if (navbarToggler) {
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
            if (navbarCloseBtn) {
                navbarCloseBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

console.log('Roypi - Página cargada exitosamente');

