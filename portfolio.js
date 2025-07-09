document.addEventListener('DOMContentLoaded', () => {
    const flickrRSSUrl = 'https://www.flickr.com/services/feeds/photos_public.gne?id=200981204@N05&format=rss_200&lang=en-us&per_page=50';
    const loadingSpinner = document.getElementById('loadingSpinner');
    const galleryGrid = document.querySelector('.gallery-grid');
    const errorMessage = document.getElementById('errorMessage');
    const portfolioFooter = document.querySelector('.portfolio-footer');
    const flickrLinkSection = document.querySelector('.flickr-link-section');
    let galleryItems = [];

    async function loadFlickrPhotos() {
        loadingSpinner.classList.remove('hidden');
        galleryGrid.style.display = 'none';
        errorMessage.classList.remove('show');
        portfolioFooter.classList.remove('show');
        flickrLinkSection.classList.remove('show');
        galleryGrid.innerHTML = '';
        try {
            const proxyUrl = 'https://api.allorigins.win/raw?url=';
            const response = await fetch(proxyUrl + encodeURIComponent(flickrRSSUrl));
            const text = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, 'text/xml');
            const items = xmlDoc.querySelectorAll('item');
            let photosLoaded = 0;
            items.forEach((item, index) => {
                if (index >= 50) return;
                const title = item.querySelector('title')?.textContent || 'Flickr Photo';
                const description = item.querySelector('description')?.textContent || '';
                const imgMatch = description.match(/<img[^>]+src=\"([^\"]+)\"/);
                if (!imgMatch) return;
                const imgSrc = imgMatch[1].replace(/_m\.(jpg|png)$/, '_b.$1');
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s both`;
                galleryItem.innerHTML = `
                    <img src="${imgSrc}" alt="${title}" loading="lazy">
                    <div class="gallery-overlay">
                        <h3>${title}</h3>
                        <p>Flickr photo</p>
                    </div>
                `;
                galleryGrid.appendChild(galleryItem);
                photosLoaded++;
            });
            loadingSpinner.classList.add('hidden');
            galleryGrid.style.display = 'grid';
            if (photosLoaded === 0) {
                errorMessage.classList.add('show');
            } else {
                portfolioFooter.classList.add('show');
                flickrLinkSection.classList.add('show');
            }
            galleryItems = document.querySelectorAll('.gallery-item');
            attachLightboxListeners();
        } catch (error) {
            loadingSpinner.classList.add('hidden');
            galleryGrid.style.display = 'grid';
            errorMessage.classList.add('show');
        }
    }

    function attachLightboxListeners() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.querySelector('.lightbox-image');
        const lightboxCaption = document.querySelector('.lightbox-caption');
        const closeLightbox = document.querySelector('.close-lightbox');
        const prevBtn = document.querySelector('.lightbox-nav.prev');
        const nextBtn = document.querySelector('.lightbox-nav.next');
        let currentImageIndex = 0;
        let visibleImages = Array.from(galleryItems);

        function openLightbox(item) {
            const img = item.querySelector('img');
            const overlay = item.querySelector('.gallery-overlay');
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxCaption.querySelector('h3').textContent = overlay.querySelector('h3').textContent;
            lightboxCaption.querySelector('p').textContent = overlay.querySelector('p').textContent;
            window.scrollTo({ top: 0, behavior: 'instant' });
            document.body.style.overflow = 'hidden';
            lightbox.classList.add('active');
        }
        function closeLightboxFunc() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        function showImage(index) {
            if (index < 0) index = visibleImages.length - 1;
            if (index >= visibleImages.length) index = 0;
            currentImageIndex = index;
            openLightbox(visibleImages[currentImageIndex]);
        }
        galleryItems.forEach((item, idx) => {
            item.onclick = () => {
                visibleImages = Array.from(galleryItems);
                currentImageIndex = visibleImages.indexOf(item);
                openLightbox(item);
            };
        });
        closeLightbox.onclick = closeLightboxFunc;
        lightbox.onclick = e => { if (e.target === lightbox) closeLightboxFunc(); };
        prevBtn.onclick = () => showImage(currentImageIndex - 1);
        nextBtn.onclick = () => showImage(currentImageIndex + 1);
        document.onkeydown = e => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightboxFunc();
            if (e.key === 'ArrowLeft') showImage(currentImageIndex - 1);
            if (e.key === 'ArrowRight') showImage(currentImageIndex + 1);
        };
    }

    loadFlickrPhotos();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style); 