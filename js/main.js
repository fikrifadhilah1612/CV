// main.js - JavaScript untuk fungsi interaktif dan animasi

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });

    // Progress bar animation using Intersection Observer
    const progressBars = document.querySelectorAll('.progress-bar');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Navbar active state based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
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

    // Add typing effect to the name
    const nameElement = document.querySelector('header h1');
    if (nameElement) {
        nameElement.classList.add('typing-effect');
    }

    // Portfolio items hover effect
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const overlay = item.querySelector('.portfolio-overlay');
            overlay.style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', () => {
            const overlay = item.querySelector('.portfolio-overlay');
            overlay.style.opacity = '0';
        });
    });

    // Form validation
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    valid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });
            
            if (valid) {
                // Here you would typically send the form data to a server
                // Since this is a static demo, we'll just show a success message
                const formContainer = form.parentElement;
                form.style.display = 'none';
                
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.textContent = 'Pesan Anda telah dikirim! Terima kasih telah menghubungi saya.';
                
                formContainer.appendChild(successMessage);
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    form.reset();
                    form.style.display = 'block';
                    formContainer.removeChild(successMessage);
                }, 5000);
            }
        });
    }

    // Add animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Add animation to experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    const experienceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                experienceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    experienceItems.forEach(item => {
        experienceObserver.observe(item);
    });

    // Navbar collapse on click (for mobile)
    const navLinks2 = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks2.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // Add pulse animation to important buttons
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.classList.add('pulse');
    });
});