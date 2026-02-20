// ==========================================
// HGW Landing Page - Interactive Features
// ==========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // STICKY HEADER ON SCROLL
    // ==========================================
    const header = document.getElementById('header');


    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================
    // TESTIMONIAL CAROUSEL
    // ==========================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');

    let currentTestimonial = 0;
    const totalTestimonials = testimonialCards.length;

    // Function to show specific testimonial
    function showTestimonial(index) {
        // Remove active class from all cards and dots
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current card and dot
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');

        currentTestimonial = index;
    }

    // Next testimonial
    function nextTestimonial() {
        let next = (currentTestimonial + 1) % totalTestimonials;
        showTestimonial(next);
    }

    // Previous testimonial
    function prevTestimonial() {
        let prev = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        showTestimonial(prev);
    }

    // Event listeners for carousel buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', nextTestimonial);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevTestimonial);
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            showTestimonial(index);
        });
    });

    // Auto-advance carousel every 5 seconds
    let autoAdvance = setInterval(nextTestimonial, 5000);

    // Pause auto-advance on hover
    const carouselContainer = document.querySelector('.testimonial-carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', function () {
            clearInterval(autoAdvance);
        });

        carouselContainer.addEventListener('mouseleave', function () {
            autoAdvance = setInterval(nextTestimonial, 5000);
        });
    }

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        carouselContainer.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next
            nextTestimonial();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous
            prevTestimonial();
        }
    }

    // ==========================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ==========================================
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Don't prevent default for #comprar links (they go to external site)
            if (href === '#comprar') {
                return;
            }

            if (href !== '#' && href !== '') {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==========================================
    // CTA CLICK TRACKING
    // (Ready for Facebook Pixel integration)
    // ==========================================
    const ctaButtons = document.querySelectorAll('.cta-btn');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonText = this.textContent.trim();

            // Log click event (replace with Facebook Pixel event)
            console.log('CTA Clicked:', buttonText);

            // Example Facebook Pixel event (uncomment when ready):
            // if (typeof fbq !== 'undefined') {
            //     fbq('track', 'AddToCart', {
            //         content_name: 'HGW Toothpaste',
            //         content_category: 'Health',
            //         value: 0.00,
            //         currency: 'USD'
            //     });
            // }
        });
    });

    // ==========================================
    // BENEFIT CARDS SEQUENTIAL ANIMATION
    // ==========================================
    const benefitCards = document.querySelectorAll('.benefit-card');

    benefitCards.forEach((card, index) => {
        // Add slight delay for each card
        card.style.transitionDelay = `${index * 0.05}s`;
    });

    // ==========================================
    // DYNAMIC YEAR IN FOOTER
    // ==========================================
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');

    yearElements.forEach(element => {
        element.textContent = currentYear;
    });

    // ==========================================
    // PERFORMANCE: LAZY LOAD IMAGES
    // ==========================================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // ==========================================
    // MOBILE MENU (if needed in future)
    // ==========================================
    // This is a placeholder for mobile menu functionality
    // Currently the nav auto-stacks on mobile via CSS

    // ==========================================
    // ANALYTICS & TRACKING HELPERS
    // ==========================================

    // Track time on page
    let timeOnPage = 0;
    setInterval(function () {
        timeOnPage += 1;
        // Every 30 seconds, log engagement (can send to analytics)
        if (timeOnPage % 30 === 0) {
            console.log('User engaged for', timeOnPage, 'seconds');
        }
    }, 1000);

    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', function () {
        const scrollPercentage = (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100;

        if (scrollPercentage > maxScrollDepth) {
            maxScrollDepth = Math.round(scrollPercentage);

            // Log significant scroll milestones
            if (maxScrollDepth === 25 || maxScrollDepth === 50 || maxScrollDepth === 75 || maxScrollDepth === 100) {
                console.log('Scroll depth:', maxScrollDepth + '%');

                // Example: Send to Facebook Pixel or Google Analytics
                // fbq('trackCustom', 'ScrollDepth', { depth: maxScrollDepth });
            }
        }
    });

    // ==========================================
    // CONSOLE MESSAGE
    // ==========================================
    console.log('%c🦷 HGW Landing Page Loaded Successfully! ', 'background: #2D8659; color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
    console.log('%cReady for Facebook Pixel integration', 'color: #4ECDC4; font-size: 12px;');

});

// ==========================================
// HELPER FUNCTIONS
// ==========================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
