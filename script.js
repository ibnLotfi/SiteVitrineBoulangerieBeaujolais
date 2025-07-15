// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const header = document.getElementById('header');
const categoryButtons = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');
const productsGallery = document.querySelector('.products-gallery');

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = menuToggle.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
        
        // Reset hamburger animation
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        
        // Reset hamburger animation
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Product category filtering
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        
        // Update active button
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Add filtering class for transition effect
        productsGallery.classList.add('filtering');
        
        // Filter products
        setTimeout(() => {
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                    card.classList.add('show');
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('show');
                }
            });
            
            // Remove filtering class
            productsGallery.classList.remove('filtering');
        }, 150);
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed header
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
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

// Observe elements for scroll animations - EXCLURE les images
const animateElements = document.querySelectorAll('.value-item, .info-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Product card hover effect enhancement
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Gestion simplifiée des images - SANS animation d'opacité
const productImages = document.querySelectorAll('.product-image img');
productImages.forEach(img => {
    // Supprimer l'animation d'opacité qui pose problème
    img.style.opacity = '1'; // Garder visible
    
    // Gérer les erreurs de chargement
    img.addEventListener('error', () => {
        console.log('Erreur de chargement pour:', img.src);
        img.style.opacity = '1'; // Garder visible même en cas d'erreur
    });
});

// Map click functionality
const mapPlaceholder = document.querySelector('.map-placeholder');
if (mapPlaceholder) {
    mapPlaceholder.addEventListener('click', () => {
        // Replace with actual Google Maps URL
        const mapsUrl = 'https://www.google.com/maps/search/123+Cours+Emile+Zola+69100+Villeurbanne';
        window.open(mapsUrl, '_blank');
    });
}

// Service cards click functionality
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        // Scroll to products section
        const productsSection = document.getElementById('products');
        if (productsSection) {
            const offsetTop = productsSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Get the service type and filter products
            const serviceText = card.querySelector('.text').textContent.toLowerCase();
            let categoryToShow = 'all';
            
            if (serviceText.includes('boulangerie')) {
                categoryToShow = 'viennoiseries';
            } else if (serviceText.includes('sandwichs')) {
                categoryToShow = 'savoureux';
            } else if (serviceText.includes('café')) {
                categoryToShow = 'boissons';
            } else if (serviceText.includes('glaces')) {
                categoryToShow = 'glaces';
            }
            
            // Wait for scroll, then filter
            setTimeout(() => {
                const targetButton = document.querySelector(`[data-category="${categoryToShow}"]`);
                if (targetButton) {
                    targetButton.click();
                }
            }, 800);
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        
        // Reset hamburger animation
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial product filter to show all
    const allButton = document.querySelector('[data-category="all"]');
    if (allButton) {
        allButton.classList.add('active');
    }
    
    // Add loaded class to body for CSS transitions
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    console.log('Boulangerie du Beaujolais - Site loaded successfully! 🥖');
});

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        videoId: 'vrAcufBP6E8',
        playerVars: {
            autoplay: 1,
            loop: 1,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            mute: 1,
            playlist: 'vrAcufBP6E8'
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.mute();
    event.target.playVideo();
    // Faire apparaître la vidéo en douceur
    document.getElementById('youtube-player').style.opacity = '1';
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        player.playVideo();
    }
}

// Charger l'API YouTube
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);