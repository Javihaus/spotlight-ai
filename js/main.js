// Smooth animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Logo hover effect
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // AI Network Animation
    function animateAINetwork() {
        const nodes = document.querySelectorAll('.ai-node');
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.animation = `nodeGlow 2s ease-in-out infinite alternate ${index * 0.5}s`;
            }, index * 200);
        });
    }

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
                
                if (entry.target.classList.contains('autonomous-ai-demo')) {
                    animateAINetwork();
                }
            }
        });
    }, observerOptions);

    // Observe all glass cards
    document.querySelectorAll('.glass-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // Parallax effect for background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('body::before');
        if (parallax) {
            document.body.style.backgroundPosition = `center ${scrolled * 0.5}px`;
        }
    });
});
