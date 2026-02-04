/*
 * COA — Custom JavaScript
 * GSAP Animations, Parallax Effects, and Smooth Scrolling
 */

// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Lenis scroll event
lenis.on('scroll', ScrollTrigger.update);

// GSAP ticker for Lenis
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // LOADING ANIMATION
    // ============================================
    const loader = document.getElementById('loader');
    const loaderProgress = document.getElementById('loader-progress');
    const loaderLogo = document.querySelector('.loader-logo');
    
    // Animate loader
    gsap.set(loaderLogo, { opacity: 0, y: 20 });
    gsap.set(loaderProgress, { width: '0%' });
    
    const loaderTl = gsap.timeline();
    
    loaderTl
        .to(loaderLogo, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
        .to(loaderProgress, { width: '100%', duration: 2, ease: "power2.inOut" }, "-=0.5")
        .to(loader, { opacity: 0, duration: 0.5, ease: "power2.inOut" })
        .set(loader, { display: 'none' })
        .call(initAnimations);

    // ============================================
    // NAVIGATION SCROLL EFFECT
    // ============================================
    const nav = document.getElementById('nav');
    
    ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: { className: "scrolled", targets: nav }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link, .hero-cta, .nav-cta').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                lenis.scrollTo(targetElement, {
                    offset: -100,
                    duration: 1.5
                });
            }
        });
    });

    // ============================================
    // MAIN ANIMATIONS INITIALIZATION
    // ============================================
    function initAnimations() {
        
        // Hero Animations
        animateHero();
        
        // Parallax Effects
        initParallax();
        
        // Section Animations
        animateSections();
        
        // Treatment Cards
        animateTreatments();
        
        // Why Cards Corner Animation
        animateWhyCorners();
        
        // Package Cards Scale
        animatePackages();
        
        // Testimonials Carousel
        initTestimonialsCarousel();
        
        // FAQ Accordion
        initFAQ();
        
        // Contact Form
        initContactForm();
        
        // Info Strips
        initInfoStrips();
        
        // Animated Background
        initAnimatedBackground();
        
        // About Section
        animateAbout();
        
        // About Us Section
        animateAboutUs();
    }

    // ============================================
    // HERO ANIMATIONS
    // ============================================
    function animateHero() {
        const heroTl = gsap.timeline({ delay: 0.5 });
        
        gsap.set('.hero-eyebrow span', { y: 100 });
        gsap.set('.hero-title .line-inner', { y: 120 });
        gsap.set('.hero-desc', { opacity: 0, y: 30 });
        gsap.set('.hero-cta', { opacity: 0, y: 30 });
        gsap.set('.gallery-item', { opacity: 0, y: 50, scale: 0.8 });
        
        heroTl
            .to('.hero-eyebrow span', { y: 0, duration: 0.8, ease: "power3.out" })
            .to('.hero-title .line-inner', { y: 0, duration: 1, ease: "power3.out", stagger: 0.1 }, "-=0.3")
            .to('.hero-desc', { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5")
            .to('.hero-cta', { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
            .to('.gallery-item', { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                duration: 1, 
                ease: "power2.out", 
                stagger: 0.1 
            }, "-=0.4");
    }

    // ============================================
    // PARALLAX EFFECTS
    // ============================================
    function initParallax() {
        // Hero Gallery Parallax
        const galleryItems = document.querySelectorAll('.gallery-item[data-speed]');
        
        if (galleryItems.length > 0) {
            // Scroll-based parallax for gallery items
            ScrollTrigger.create({
                trigger: '.hero-gallery',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    
                    galleryItems.forEach((item, index) => {
                        const speed = parseFloat(item.dataset.speed);
                        const yPos = progress * speed * 100;
                        
                        gsap.set(item, {
                            y: yPos,
                            ease: "none"
                        });
                    });
                }
            });
            
            // Mouse parallax effect for gallery
            let mouseX = 0;
            let mouseY = 0;
            
            document.addEventListener('mousemove', (e) => {
                mouseX = (e.clientX / window.innerWidth) * 2 - 1;
                mouseY = (e.clientY / window.innerHeight) * 2 - 1;
            });
            
            gsap.ticker.add(() => {
                galleryItems.forEach((item, index) => {
                    const speed = (index + 1) * 0.02;
                    gsap.to(item, {
                        x: mouseX * 20 * speed,
                        rotationY: mouseX * 5 * speed,
                        rotationX: -mouseY * 5 * speed,
                        duration: 2,
                        ease: "power2.out"
                    });
                });
            });
            
            console.log('✅ Gallery parallax effects initialized');
        }
        
        // Floating elements parallax (existing)
        const floatElements = document.querySelectorAll('.float-element');
        
        if (floatElements.length > 0) {
            ScrollTrigger.create({
                trigger: '.hero',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    
                    floatElements.forEach((element, index) => {
                        const speed = (index + 1) * 0.5;
                        gsap.set(element, {
                            y: progress * speed * 50,
                            rotation: progress * speed * 20,
                            ease: "none"
                        });
                    });
                }
            });
        }
    }

    // ============================================
    // SECTION ANIMATIONS
    // ============================================
    function animateSections() {
        // Animate section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            const eyebrow = header.querySelector('.section-eyebrow');
            const title = header.querySelector('.section-title');
            const desc = header.querySelector('.section-desc');
            
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: header,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
            
            if (eyebrow) tl.from(eyebrow, { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" });
            if (title) tl.from(title, { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" }, "-=0.4");
            if (desc) tl.from(desc, { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" }, "-=0.6");
        });
    }

    // ============================================
    // TREATMENT CARDS ANIMATION
    // ============================================
    function animateTreatments() {
        gsap.utils.toArray('.treatment-card').forEach((card, index) => {
            gsap.from(card, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.1
            });
        });
    }

    // ============================================
    // WHY COA CORNER ANIMATION
    // ============================================
    function animateWhyCorners() {
        const whySection = document.querySelector('#why-coa');
        const cornerCards = document.querySelectorAll('.corner-card');
        const centerContent = document.querySelector('.why-center-content');
        
        if (!whySection || cornerCards.length === 0) return;
        
        let animationComplete = false;
        let currentCardIndex = 0;
        let animationStarted = false;
        
        // Wait longer before setting up ScrollTrigger to avoid any premature triggering
        setTimeout(() => {
            // Additional check - only setup if user has actually scrolled
            const hasScrolled = window.scrollY > 200; // User must have scrolled at least 200px
            if (hasScrolled) {
                console.log('📜 User has scrolled enough, setting up ScrollTrigger...');
                setupScrollTrigger();
            } else {
                console.log('📜 User hasn\'t scrolled enough yet, waiting...');
                // Check again after more time
                setTimeout(() => {
                    setupScrollTrigger();
                }, 3000);
            }
        }, 2500); // Increased delay to 2.5 seconds
        
        // Initially hide all cards completely
        gsap.set(cornerCards, {
            opacity: 0,
            scale: 0.5,
            visibility: 'hidden'
        });
        
        // Also hide center content initially
        gsap.set(centerContent, {
            opacity: 0,
            y: 30
        });
        
        // Disable scrolling initially
        function disableScroll() {
            document.body.style.overflow = 'hidden';
        }
        
        function enableScroll() {
            document.body.style.overflow = '';
        }
        
        function setupScrollTrigger() {
            // Create the scroll trigger - when center text is slightly below screen center
            ScrollTrigger.create({
                trigger: '.why-center-content',
                start: "center 60%", // Trigger when center text is at 60% from top (below center)
                end: "center 60%",   // Single point trigger
                onEnter: () => {
                    // Check that center text is at the right position for card visibility
                    const centerText = document.querySelector('.why-center-content');
                    const rect = centerText.getBoundingClientRect();
                    const screenHeight = window.innerHeight;
                    const textCenterY = rect.top + rect.height / 2;
                    const targetPosition = screenHeight * 0.6; // 60% from top
                    const distanceFromTarget = Math.abs(textCenterY - targetPosition);
                    
                    console.log('🎯 Center text position check:');
                    console.log('Screen height:', screenHeight);
                    console.log('Target position (60%):', targetPosition);
                    console.log('Text center Y:', textCenterY);
                    console.log('Distance from target:', distanceFromTarget);
                    
                    // Only trigger if text is close to 60% position (within 80px tolerance)
                    if (!animationStarted && distanceFromTarget < 80) {
                        console.log('✅ Center text is at 60% position, all cards should be visible!');
                        animationStarted = true;
                        disableScroll();
                        startCornerAnimation();
                    } else {
                        console.log('❌ Center text not at optimal position for card visibility');
                    }
                },
                onLeave: () => {
                    // Don't do anything on leave
                },
                onEnterBack: () => {
                    // Don't restart animation if coming back
                },
                markers: false // Set to true for debugging
            });
        }
        
        function startCornerAnimation() {
            console.log('🎭 Starting corner animation with optimal card visibility...');
            
            // Animate background elements first
            animateBackgroundElements();
            
            // Then animate center content
            gsap.to(centerContent, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => {
                    // Start corner cards animation after center content
                    setTimeout(() => {
                        animateNextCard();
                    }, 300); // Reduced delay for faster card appearance
                }
            });
        }
        
        function animateBackgroundElements() {
            // Animate background circles
            gsap.fromTo('.bg-circle', {
                scale: 0,
                opacity: 0
            }, {
                scale: 1,
                opacity: 1,
                duration: 2,
                ease: "power2.out",
                stagger: 0.3
            });
            
            // Animate background gradients
            gsap.fromTo('.bg-gradient', {
                scale: 0,
                rotation: -180,
                opacity: 0
            }, {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 3,
                ease: "power2.out",
                stagger: 0.5
            });
            
            // Animate dots pattern
            gsap.fromTo('.bg-dots', {
                opacity: 0,
                scale: 1.2
            }, {
                opacity: 1,
                scale: 1,
                duration: 2,
                ease: "power2.out",
                delay: 0.5
            });
            
            // Animate lines
            gsap.fromTo('.bg-line', {
                scaleX: 0,
                opacity: 0
            }, {
                scaleX: 1,
                opacity: 1,
                duration: 1.5,
                ease: "power2.out",
                stagger: 0.2,
                delay: 1
            });
        }
        
        function animateNextCard() {
            if (currentCardIndex >= cornerCards.length) {
                // All cards animated, enable scrolling
                animationComplete = true;
                enableScroll();
                console.log('🎉 All corner cards animated, scrolling enabled');
                return;
            }
            
            const card = cornerCards[currentCardIndex];
            const corner = card.dataset.corner;
            
            console.log(`🎯 Animating card ${currentCardIndex + 1}: ${corner}`);
            
            // Set initial position based on corner (further away)
            let initialX = 0, initialY = 0;
            switch(corner) {
                case 'top-left':
                    initialX = -200;
                    initialY = -200;
                    break;
                case 'top-right':
                    initialX = 200;
                    initialY = -200;
                    break;
                case 'bottom-left':
                    initialX = -200;
                    initialY = 200;
                    break;
                case 'bottom-right':
                    initialX = 200;
                    initialY = 200;
                    break;
            }
            
            // Make card visible and set initial position
            card.classList.add('animating');
            gsap.set(card, {
                x: initialX,
                y: initialY,
                opacity: 0,
                scale: 0.3,
                visibility: 'visible'
            });
            
            // Animate to final position
            gsap.to(card, {
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8, // Reduced from 1 second
                ease: "back.out(1.7)",
                onComplete: () => {
                    card.classList.add('visible');
                    card.classList.remove('animating');
                    currentCardIndex++;
                    
                    // Wait before next card (reduced timing)
                    setTimeout(() => {
                        animateNextCard();
                    }, 250); // Reduced from 400ms
                }
            });
        }
        
        // Handle scroll attempts during animation
        let scrollAttempts = 0;
        function handleScrollAttempt(e) {
            if (!animationComplete && animationStarted) {
                e.preventDefault();
                e.stopPropagation();
                scrollAttempts++;
                
                // Show a subtle hint after multiple scroll attempts
                if (scrollAttempts > 2) {
                    gsap.to('.why-center-content', {
                        scale: 1.05,
                        duration: 0.2,
                        yoyo: true,
                        repeat: 1,
                        ease: "power2.inOut"
                    });
                    scrollAttempts = 0; // Reset counter
                }
                return false;
            }
        }
        
        // Add scroll blocking with more comprehensive coverage
        const scrollEvents = ['wheel', 'touchmove', 'scroll'];
        scrollEvents.forEach(event => {
            window.addEventListener(event, handleScrollAttempt, { passive: false });
            document.addEventListener(event, handleScrollAttempt, { passive: false });
        });
        
        // Block keyboard scrolling
        window.addEventListener('keydown', (e) => {
            if (!animationComplete && animationStarted) {
                if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(e.key)) {
                    e.preventDefault();
                    handleScrollAttempt(e);
                    return false;
                }
            }
        });
    }

    // ============================================
    // PACKAGE CARDS SCALE ANIMATION
    // ============================================
    function animatePackages() {
        gsap.utils.toArray('.package-card').forEach((card, index) => {
            gsap.from(card, {
                opacity: 0,
                scale: 0.8,
                y: 30,
                duration: 0.8,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.1
            });
        });
    }

    // ============================================
    // TESTIMONIALS CAROUSEL
    // ============================================
    function initTestimonialsCarousel() {
        const track = document.getElementById('testimonials-track');
        const cards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.getElementById('prev-testimonial');
        const nextBtn = document.getElementById('next-testimonial');
        
        if (!track || cards.length === 0) {
            console.log('❌ Testimonials carousel elements not found');
            return;
        }
        
        let currentSlide = 0;
        const totalSlides = cards.length;
        let autoplayInterval;
        let isPlaying = true;
        
        console.log('🎠 Initializing testimonials carousel with', totalSlides, 'slides');
        
        function updateCarousel(animate = true) {
            const translateX = -(currentSlide * 20); // 20% per slide
            
            if (animate) {
                track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            } else {
                track.style.transition = 'none';
            }
            
            track.style.transform = `translateX(${translateX}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
            
            console.log('📍 Moved to slide', currentSlide);
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }
        
        function prevSlide() {
            currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
            updateCarousel();
        }
        
        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateCarousel();
        }
        
        function startAutoplay() {
            if (autoplayInterval) clearInterval(autoplayInterval);
            
            autoplayInterval = setInterval(() => {
                if (isPlaying) {
                    nextSlide();
                }
            }, 3500); // 3.5 seconds
            
            console.log('▶️ Autoplay started');
        }
        
        function stopAutoplay() {
            isPlaying = false;
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
            console.log('⏸️ Autoplay stopped');
        }
        
        function resumeAutoplay() {
            isPlaying = true;
            startAutoplay();
            console.log('▶️ Autoplay resumed');
        }
        
        // Event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoplay();
                setTimeout(resumeAutoplay, 6000);
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoplay();
                setTimeout(resumeAutoplay, 6000);
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                stopAutoplay();
                setTimeout(resumeAutoplay, 6000);
            });
        });
        
        // Pause on hover
        const carousel = document.querySelector('.testimonials-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                stopAutoplay();
            });
            
            carousel.addEventListener('mouseleave', () => {
                resumeAutoplay();
            });
        }
        
        // Touch support
        let startX = 0;
        let isDragging = false;
        
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopAutoplay();
        }, { passive: true });
        
        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            
            isDragging = false;
            setTimeout(resumeAutoplay, 6000);
        }, { passive: true });
        
        // Initialize
        updateCarousel(false);
        
        // Start autoplay after a short delay
        setTimeout(() => {
            startAutoplay();
        }, 1000);
        
        // Animate testimonials section on scroll
        gsap.from('.testimonials-carousel', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.testimonials-carousel',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
        
        console.log('✅ Testimonials carousel fully initialized');
    }

    // ============================================
    // FAQ ACCORDION
    // ============================================
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (faqItems.length === 0) return;
        
        let activeItem = null;
        
        function closeAllItems() {
            faqItems.forEach(item => {
                item.classList.remove('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = '0';
            });
            activeItem = null;
        }
        
        function openItem(item) {
            const answer = item.querySelector('.faq-answer');
            const content = answer.querySelector('.faq-answer-content');
            
            item.classList.add('active');
            answer.style.maxHeight = content.scrollHeight + 32 + 'px'; // Add padding
            activeItem = item;
        }
        
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isCurrentlyActive = item === activeItem;
                
                // Close all items first
                closeAllItems();
                
                // If the clicked item wasn't active, open it
                if (!isCurrentlyActive) {
                    openItem(item);
                }
            });
            
            // Animate FAQ items on scroll
            gsap.from(item, {
                opacity: 0,
                y: 20,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.1
            });
        });
        
        // Keyboard navigation
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
                
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextItem = faqItems[index + 1];
                    if (nextItem) {
                        nextItem.querySelector('.faq-question').focus();
                    }
                }
                
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevItem = faqItems[index - 1];
                    if (prevItem) {
                        prevItem.querySelector('.faq-question').focus();
                    }
                }
            });
            
            // Make questions focusable
            question.setAttribute('tabindex', '0');
        });
    }

    // ============================================
    // CONTACT FORM
    // ============================================
    function initContactForm() {
        const form = document.getElementById('contact-form');
        const submitBtn = form?.querySelector('.form-submit-btn');
        const btnText = submitBtn?.querySelector('.btn-text');
        const btnLoading = submitBtn?.querySelector('.btn-loading');
        const formSuccess = document.getElementById('form-success');
        
        if (!form) return;
        
        // Form submission handler
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            try {
                // Simulate API call (replace with actual endpoint)
                await simulateFormSubmission(data);
                
                // Show success message
                form.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Animate success message
                gsap.from(formSuccess, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    ease: "power2.out"
                });
                
                console.log('✅ Contact form submitted successfully');
                
            } catch (error) {
                console.error('❌ Form submission error:', error);
                alert('Sorry, there was an error sending your message. Please try again.');
                
                // Reset button state
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearValidation);
        });
        
        // Animate form elements on scroll
        gsap.utils.toArray('.contact-item').forEach((item, index) => {
            gsap.from(item, {
                opacity: 0,
                x: -30,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.1
            });
        });
        
        gsap.from('.contact-form-container', {
            opacity: 0,
            x: 30,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.contact-form-container',
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
        
        function validateField(e) {
            const field = e.target;
            const value = field.value.trim();
            
            // Remove existing validation classes
            field.classList.remove('error', 'success');
            
            if (field.hasAttribute('required') && !value) {
                field.classList.add('error');
                return false;
            }
            
            if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    field.classList.add('error');
                    return false;
                }
            }
            
            if (value) {
                field.classList.add('success');
            }
            
            return true;
        }
        
        function clearValidation(e) {
            const field = e.target;
            field.classList.remove('error', 'success');
        }
        
        async function simulateFormSubmission(data) {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Log form data (in real app, send to server)
            console.log('📧 Form submission data:', data);
            
            // Simulate success (in real app, handle server response)
            return { success: true, message: 'Form submitted successfully' };
        }
    }
    
    // Global function to reset contact form
    window.resetContactForm = function() {
        const form = document.getElementById('contact-form');
        const formSuccess = document.getElementById('form-success');
        const submitBtn = form?.querySelector('.form-submit-btn');
        const btnText = submitBtn?.querySelector('.btn-text');
        const btnLoading = submitBtn?.querySelector('.btn-loading');
        
        if (form && formSuccess) {
            // Reset form
            form.reset();
            form.style.display = 'flex';
            formSuccess.style.display = 'none';
            
            // Reset button state
            if (submitBtn) {
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            }
            
            // Clear validation classes
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.classList.remove('error', 'success');
            });
            
            // Animate form back in
            gsap.from(form, {
                opacity: 0,
                y: 20,
                duration: 0.6,
                ease: "power2.out"
            });
        }
    };

    // ============================================
    // INFO STRIPS ENHANCEMENT
    // ============================================
    function initInfoStrips() {
        const infoStrips = document.querySelectorAll('.info-strip');
        
        infoStrips.forEach((strip, stripIndex) => {
            const items = strip.querySelectorAll('.info-item');
            
            // Add hover effects to info items
            items.forEach((item, index) => {
                item.addEventListener('mouseenter', () => {
                    gsap.to(item, {
                        scale: 1.1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                    
                    // Glow effect on dot
                    const dot = item.querySelector('.info-dot');
                    if (dot) {
                        gsap.to(dot, {
                            scale: 1.5,
                            boxShadow: '0 0 20px rgba(255, 222, 163, 0.8)',
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    }
                });
                
                item.addEventListener('mouseleave', () => {
                    gsap.to(item, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                    
                    const dot = item.querySelector('.info-dot');
                    if (dot) {
                        gsap.to(dot, {
                            scale: 1,
                            boxShadow: stripIndex === 0 ? 'none' : '0 0 10px rgba(255, 222, 163, 0.5)',
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    }
                });
            });
            
            // Pause animation on hover for better readability
            const stripInner = strip.querySelector('.info-strip-inner');
            if (stripInner) {
                strip.addEventListener('mouseenter', () => {
                    stripInner.style.animationPlayState = 'paused';
                });
                
                strip.addEventListener('mouseleave', () => {
                    stripInner.style.animationPlayState = 'running';
                });
            }
        });
        
        // Animate info strips on scroll
        gsap.utils.toArray('.info-strip').forEach((strip, index) => {
            gsap.from(strip, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: strip,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            });
        });
        
        console.log('📜 Info strips enhanced with interactions');
    }

    // ============================================
    // ANIMATED BACKGROUND ELEMENTS - DISABLED
    // ============================================
    function initAnimatedBackground() {
        // Background animations disabled to prevent color overlay issues
        console.log('✨ Background animations disabled to prevent color overlay');
    }

    // ============================================
    // ABOUT SECTION ANIMATION
    // ============================================
    function animateAbout() {
        const aboutGrid = document.querySelector('.about-grid');
        const aboutQuote = document.querySelector('.about-quote');
        
        if (!aboutGrid) return;
        
        const aboutTl = gsap.timeline({
            scrollTrigger: {
                trigger: aboutGrid,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate quote line only if quote exists
        if (aboutQuote) {
            // Use a different approach for pseudo-element animation
            gsap.set(aboutQuote, { '--quote-line-scale': 0 });
            aboutTl.to(aboutQuote, {
                '--quote-line-scale': 1,
                duration: 0.8,
                ease: "power2.out"
            });
        }

        // Animate content
        const aboutContent = document.querySelector('.about-content');
        if (aboutContent) {
            const contentElements = aboutContent.children;
            if (contentElements.length > 0) {
                gsap.from(contentElements, {
                    opacity: 0,
                    x: 50,
                    duration: 0.8,
                    ease: "power2.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: aboutContent,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        }

        const aboutVisual = document.querySelector('.about-visual');
        if (aboutVisual) {
            gsap.from(aboutVisual, {
                opacity: 0,
                x: -50,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: aboutVisual,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    }

    // ============================================
    // ABOUT US SECTION ANIMATIONS
    // ============================================
    function animateAboutUs() {
        // Check if About Us section exists
        const aboutUsSection = document.querySelector('.about-us');
        if (!aboutUsSection) return;

        // Animate title
        gsap.from('.about-us-title', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.about-us-title',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // Page fold animations for images
        const foldImages = document.querySelectorAll('.fold-animation');
        
        foldImages.forEach((image, index) => {
            // Initial state - folded
            gsap.set(image, {
                rotationY: -90,
                transformOrigin: "left center",
                opacity: 0
            });

            // Unfold animation
            gsap.to(image, {
                rotationY: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: image,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            // Add hover fold effect
            image.addEventListener('mouseenter', () => {
                gsap.to(image, {
                    rotationY: 5,
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            image.addEventListener('mouseleave', () => {
                gsap.to(image, {
                    rotationY: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Animate text content
        gsap.from('.about-us-center .about-us-text', {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power2.out",
            stagger: 0.2,
            delay: 0.5,
            scrollTrigger: {
                trigger: '.about-us-center',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // Add parallax effect to left and right columns
        gsap.to('.about-us-left', {
            y: -30,
            scrollTrigger: {
                trigger: '.about-us-layout',
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });

        gsap.to('.about-us-right', {
            y: 30,
            scrollTrigger: {
                trigger: '.about-us-layout',
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    }

    // ============================================
    // HOVER EFFECTS
    // ============================================

    // Treatment card hover effects
    document.querySelectorAll('.treatment-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -8, duration: 0.3, ease: "power2.out" });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
        });
    });

    // Why card hover effects
    document.querySelectorAll('.why-card').forEach(card => {
        const icon = card.querySelector('.why-icon');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -12, duration: 0.3, ease: "power2.out" });
            gsap.to(icon, { scale: 1.1, rotation: 5, duration: 0.3, ease: "power2.out" });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
            gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
        });
    });

    // Package card hover effects
    document.querySelectorAll('.package-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -12, scale: 1.02, duration: 0.3, ease: "power2.out" });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
        });
    });

    // Gallery item hover effects
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, { 
                scale: 1.08, 
                y: -15,
                rotationY: 5,
                duration: 0.4, 
                ease: "power2.out" 
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, { 
                scale: 1, 
                y: 0,
                rotationY: 0,
                duration: 0.4, 
                ease: "power2.out" 
            });
        });
    });

    // FAQ item hover effects
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('mouseenter', () => {
            gsap.to(question, { x: 5, duration: 0.2, ease: "power2.out" });
        });
        
        question.addEventListener('mouseleave', () => {
            gsap.to(question, { x: 0, duration: 0.2, ease: "power2.out" });
        });
    });

    // Button hover effects
    document.querySelectorAll('.hero-cta, .nav-cta').forEach(button => {
        const arrow = button.querySelector('svg');
        
        button.addEventListener('mouseenter', () => {
            if (arrow) {
                gsap.to(arrow, { rotation: 45, duration: 0.3, ease: "power2.out" });
            }
        });
        
        button.addEventListener('mouseleave', () => {
            if (arrow) {
                gsap.to(arrow, { rotation: 0, duration: 0.3, ease: "power2.out" });
            }
        });
    });

    // ============================================
    // SCROLL-TRIGGERED ANIMATIONS
    // ============================================
    
    // Fade in elements
    gsap.utils.toArray('.fade-in').forEach(element => {
        gsap.from(element, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Slide in from left
    gsap.utils.toArray('.slide-in-left').forEach(element => {
        gsap.from(element, {
            opacity: 0,
            x: -50,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Slide in from right
    gsap.utils.toArray('.slide-in-right').forEach(element => {
        gsap.from(element, {
            opacity: 0,
            x: 50,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Scale in elements
    gsap.utils.toArray('.scale-in').forEach(element => {
        gsap.from(element, {
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Stagger items
    gsap.utils.toArray('.stagger-item').forEach((element, index) => {
        gsap.from(element, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out",
            delay: index * 0.1,
            scrollTrigger: {
                trigger: element.parentElement,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // ============================================
    // PERFORMANCE OPTIMIZATIONS
    // ============================================
    
    // Refresh ScrollTrigger on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });

    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            gsap.globalTimeline.pause();
        } else {
            gsap.globalTimeline.resume();
        }
    });

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    
    // Smooth scroll to top
    function scrollToTop() {
        lenis.scrollTo(0, {
            duration: 2
        });
    }

    // Add scroll to top functionality if needed
    window.scrollToTop = scrollToTop;

    // ============================================
    // MOBILE OPTIMIZATIONS
    // ============================================
    
    // Reduce motion for mobile devices but keep some effects
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Reduce animation durations slightly
        gsap.globalTimeline.timeScale(1.2);
        
        // Disable heavy parallax effects on mobile for performance
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars.scrub && trigger.vars.scrub > 1.5) {
                trigger.kill();
            }
        });
    }

    // ============================================
    // ACCESSIBILITY
    // ============================================
    
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        gsap.globalTimeline.timeScale(10); // Speed up animations
        ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Disable scroll triggers
    }

    // Listen for changes in motion preference
    prefersReducedMotion.addEventListener('change', () => {
        if (prefersReducedMotion.matches) {
            gsap.globalTimeline.timeScale(10);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        } else {
            gsap.globalTimeline.timeScale(1);
            ScrollTrigger.refresh();
        }
    });

    console.log('🌟 COA animations initialized');
});

// ============================================
// ADDITIONAL INTERACTIVE FEATURES
// ============================================

// Cursor follow effect (optional enhancement)
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    }
});

// Magnetic effect for buttons (optional enhancement)
document.querySelectorAll('.hero-cta, .nav-cta, .package-btn, .treatment-btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(button, {
            x: x * 0.1,
            y: y * 0.1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});