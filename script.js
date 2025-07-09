if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
} else {
    window.addEventListener('beforeunload', () => {
        window.scrollTo(0, 0);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const scrollIndicator = document.getElementById('scrollIndicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            scrollIndicator.classList.add('hidden');
            
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        });

        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                scrollIndicator.classList.add('hidden');
            }
            
            lastScrollY = currentScrollY;
        });
    }
});

//why are you reading this