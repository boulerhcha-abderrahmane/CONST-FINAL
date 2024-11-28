document.addEventListener('DOMContentLoaded', function() {
    const swiperDoctors = new Swiper('.swiper-doctors', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
            1400: {
                slidesPerView: 4,
            }
        },
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        },
        on: {
            init: function() {
                document.querySelectorAll('.doctor-card').forEach((card, index) => {
                    card.style.animationDelay = `${index * 0.1}s`;
                });
            }
        }
    });

    // Gestion du menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Fermer le menu quand on clique sur un lien
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
});

// Fonction pour afficher les modals
function showServiceDetails(serviceId) {
    const modal = document.getElementById(`modal-${serviceId}`);
    modal.style.display = "block";
}

// Fermeture des modals
document.querySelectorAll('.close-modal').forEach(button => {
    button.onclick = function() {
        this.closest('.service-modal').style.display = "none";
    }
});

// Fermer la modal en cliquant en dehors
window.onclick = function(event) {
    if (event.target.classList.contains('service-modal')) {
        event.target.style.display = "none";
    }
}

// Ajuster la hauteur des éléments en fonction de la fenêtre
window.addEventListener('resize', function() {
    adjustHeight();
});

function adjustHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Appeler une fois au chargement
adjustHeight(); 