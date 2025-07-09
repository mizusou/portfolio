if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
} else {
    window.addEventListener('beforeunload', () => {
        window.scrollTo(0, 0);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scroll indicator functionality
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
            scrollIndicator.style.animation = 'none';
            
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        });

        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Hide when scrolling down
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
                scrollIndicator.style.animation = 'none';
            }
            
            // Show when scrolling back to top
            if (currentScrollY < 100) {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
                scrollIndicator.style.animation = 'bounce 2s infinite';
            }
            
            lastScrollY = currentScrollY;
        });
    }
});

//why are you reading this