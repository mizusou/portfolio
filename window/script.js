// Prevent auto-scrolling on page load
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function() {
        window.scrollTo(0, 0);
    }
}

// Smooth scrolling for the arrow
document.addEventListener('DOMContentLoaded', function() {
    const scrollArrow = document.querySelector('.scroll-arrow');
    const aboutSection = document.getElementById('about');
    
    if (scrollArrow && aboutSection) {
        scrollArrow.addEventListener('click', function(e) {
            e.preventDefault();
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// Smooth scrolling for the arrow
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                // Custom smooth scroll with 600ms duration
                const start = window.pageYOffset;
                const target = aboutSection.getBoundingClientRect().top + window.pageYOffset;
                const distance = target - start;
                const duration = 600; // 0.6 seconds
                let startTime = null;
                
                // More pronounced ease-in-out function
                function easeInOutCubic(t, b, c, d) {
                    t /= d/2;
                    if (t < 1) return c/2*t*t*t + b;
                    t -= 2;
                    return c/2*(t*t*t + 2) + b;
                }
                
                function animation(currentTime) {
                    if (!startTime) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = easeInOutCubic(timeElapsed, start, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                requestAnimationFrame(animation);
            }
        });
    }
});
