// ===========================
// Navigation & Scroll Effects
// ===========================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===========================
// Typing Animation
// ===========================

const typingText = document.querySelector('.typing-text');
const textArray = [
    'Full Stack Developer',
    'Web Designer',
    'Problem Solver',
    'Tech Enthusiast'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500;
    }

    setTimeout(typeText, typeSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeText, 1000);
});

// ===========================
// Smooth Scroll
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// Skill Bars Animation
// ===========================

const skillSection = document.querySelector('.skills');
let skillsAnimated = false;

function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

window.addEventListener('scroll', () => {
    if (!skillsAnimated && skillSection) {
        const skillSectionTop = skillSection.offsetTop;
        const skillSectionHeight = skillSection.clientHeight;
        const scrollPosition = window.scrollY + window.innerHeight;

        if (scrollPosition > skillSectionTop + skillSectionHeight / 3) {
            animateSkills();
            skillsAnimated = true;
        }
    }
});

// ===========================
// Project Filter
// ===========================

const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===========================
// Contact Form Handling
// ===========================

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // For now, just show success message (backend will be added later)
    formStatus.className = 'form-status success';
    formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
    
    // Reset form
    contactForm.reset();

    // Hide message after 5 seconds
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);

    // When backend is ready, uncomment this:
    /*
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Oops! Something went wrong. Please try again later.';
    }

    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
    */
});

// ===========================
// Back to Top Button
// ===========================

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// Intersection Observer for Animations
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===========================
// Particles Background Effect (Optional)
// ===========================

// Add subtle particle effect to hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.position = 'absolute';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.overflow = 'hidden';
    particlesContainer.style.pointerEvents = 'none';
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = '#6366f1';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${5 + Math.random() * 10}s infinite ease-in-out`;
        
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(particlesContainer);
}

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0);
        }
        25% {
            transform: translate(10px, -10px);
        }
        50% {
            transform: translate(-10px, 10px);
        }
        75% {
            transform: translate(10px, 10px);
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// ===========================
// Form Input Effects
// ===========================

const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// ===========================
// Preloader (Optional)
// ===========================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===========================
// Console Message
// ===========================

console.log('%c👋 Welcome to my Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cLooking for a developer? Let\'s connect!', 'color: #ec4899; font-size: 14px;');
console.log('%cFind me on GitHub, LinkedIn, or drop me an email!', 'color: #14b8a6; font-size: 12px;');
