// Initialize Lenis Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

const navbar = document.getElementById('navbar');

lenis.on('scroll', (e) => {
    ScrollTrigger.update();
    
    // Auto-hide navbar based on scroll direction
    if (e.direction === 1 && e.animatedScroll > 100) {
        // Scrolling down -> hide navbar
        navbar.classList.add('nav-hidden');
    } else if (e.direction === -1) {
        // Scrolling up -> show navbar
        navbar.classList.remove('nav-hidden');
    } else if (e.animatedScroll <= 100) {
        // At the top -> ensure shown
        navbar.classList.remove('nav-hidden');
    }
});

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0, 0);

// GSAP Parallax and Reveal Animations
gsap.registerPlugin(ScrollTrigger);

// 3D Hover Effect for Buttons
const buttons3D = document.querySelectorAll('.btn-3d');
buttons3D.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;
        
        gsap.to(btn, {
            duration: 0.3,
            rotateX, rotateY, scale: 1.05,
            ease: "power1.out"
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            duration: 0.5,
            rotateX: 0, rotateY: 0, scale: 1,
            ease: "power2.out"
        });
    });
});

// Mouse interactive parallax effects
const mouseRespondTexts = document.querySelectorAll('.mouse-respond');
const heroFloats = document.querySelectorAll('.hero-float');

document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) - 0.5;
    const mouseY = (e.clientY / window.innerHeight) - 0.5;
    
    // Text movement
    mouseRespondTexts.forEach(txt => {
        gsap.to(txt, {
            duration: 1,
            x: mouseX * -30,
            y: mouseY * -30,
            ease: "power2.out"
        });
    });

    // Inverse tracking for hero 3D objects
    heroFloats.forEach(float => {
        gsap.to(float, {
            duration: 1.5,
            x: mouseX * 50,
            y: mouseY * 50,
            rotateX: mouseY * -20,
            rotateY: mouseX * 20,
            ease: "power2.out"
        });
    });
});

// Card 3D Tilt Effect
const tiltCards = document.querySelectorAll('.organic-card, .about-panel');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -8; // Ultra smooth tilt
        const rotateY = ((x - centerX) / centerX) * 8;
        
        gsap.to(card, {
            duration: 0.4,
            rotateX, rotateY, 
            scale: 1.02, // Satisfying pop out effect
            transformPerspective: 1200,
            ease: "power2.out",
            force3D: true,
            overwrite: "auto" // Crucial: stops fighting with the scroll trigger
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            duration: 1,
            rotateX: 0, rotateY: 0, 
            scale: 1,
            ease: "elastic.out(1, 0.4)",
            overwrite: "auto"
        });
    });
});

// GSAP Parallax and Reveal Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Floating Pills Parallax
gsap.utils.toArray('.floating-pill').forEach(pill => {
    const speed = pill.getAttribute('data-speed');
    gsap.to(pill, {
        y: () => -100 * speed,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
});

// About Panels Parallax
gsap.utils.toArray('.about-panel').forEach(panel => {
    const speed = panel.getAttribute('data-speed') || 1;
    gsap.fromTo(panel, 
        { y: 100 },
        {
            y: -50 * speed,
            ease: "none",
            scrollTrigger: {
                trigger: ".about-section",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        }
    );
});

// Organic Card Reveal
gsap.from('.organic-card', {
    scrollTrigger: {
        trigger: ".organic-card",
        start: "top 85%",
    },
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
});

// Methodology Float Elements Reveal
gsap.from('.methodology-content', {
    scrollTrigger: {
        trigger: ".methodology-section",
        start: "top 70%",
    },
    x: -80, opacity: 0, duration: 1.2, ease: "power3.out"
});
gsap.from('.methodology-visual', {
    scrollTrigger: {
        trigger: ".methodology-section",
        start: "top 70%",
    },
    x: 80, opacity: 0, duration: 1.2, ease: "power3.out"
});

// Dynamic Starfield Generation for Global Background
const globalStarsContainer = document.querySelector('.global-stars');
if (globalStarsContainer) {
    // Determine height dynamically to scale star density
    const containerHeight = globalStarsContainer.offsetHeight || document.documentElement.scrollHeight || 3000;
    // Generate ~80 stars per 1000px of scrolling height
    const starCount = Math.min(500, Math.max(100, Math.round((containerHeight / 1000) * 80)));
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('about-star'); // Reuse styles for stars
        
        // Random color distribution: 70% white, 15% orange, 15% teal
        const randColor = Math.random();
        if (randColor < 0.15) {
            star.classList.add('orange');
        } else if (randColor < 0.30) {
            star.classList.add('teal');
        }

        // Identify a subset of stars (~8%) as "bright" stars with lens flares
        const isBright = Math.random() < 0.08;
        let size = 0;
        let initialOpacity = 0;
        let duration = 0;

        if (isBright) {
            star.classList.add('bright');
            size = Math.random() * 2 + 3.5; // 3.5px to 5.5px
            initialOpacity = Math.random() * 0.2 + 0.8; // 0.8 to 1.0 (very bright)
            duration = Math.random() * 3 + 3; // 3s to 6s
        } else {
            size = Math.random() * 1.5 + 1; // 1px to 2.5px
            initialOpacity = Math.random() * 0.4 + 0.45; // 0.45 to 0.85
            duration = Math.random() * 3 + 2; // 2s to 5s
        }

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Random positions
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        // Twinkle parameters
        const delay = Math.random() * 5; // 0s to 5s
        
        star.style.animation = `twinkle ${duration}s ease-in-out infinite alternate`;
        star.style.animationDelay = `${delay}s`;
        star.style.opacity = initialOpacity;

        globalStarsContainer.appendChild(star);
    }
}

// Parallax scroll animations for 3D gyroscopes across the page
gsap.to('.gyro-hero-left', {
    y: -60,
    rotate: 25,
    scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

gsap.to('.gyro-hero-right', {
    y: 60,
    rotate: -25,
    scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

gsap.to('.gyro-left', {
    y: -80,
    rotate: 35,
    scrollTrigger: {
        trigger: ".about-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

gsap.to('.gyro-right', {
    y: 80,
    rotate: -35,
    scrollTrigger: {
        trigger: ".about-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

gsap.to('.gyro-services-right', {
    y: -60,
    rotate: 25,
    scrollTrigger: {
        trigger: ".pipeline-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});


