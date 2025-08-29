document.addEventListener('DOMContentLoaded', () => {

    // --- QUOTE FETCHER SECTION (WITH FALLBACK) ---
    const quoteText = document.querySelector('.quote-text');
    const quoteAuthor = document.querySelector('.quote-author');
    const newQuoteBtn = document.getElementById('new-quote-btn');

    const fallbackQuotes = [
        { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
    ];

    function showFallbackQuote() {
        console.log("API failed. Using a fallback quote.");
        const fallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        quoteText.textContent = `"${fallback.quote}"`;
        quoteAuthor.textContent = `— ${fallback.author}`;
    }

    async function fetchQuote() {
        if (!quoteText || !quoteAuthor) return; // Stop if elements don't exist
        quoteText.textContent = 'Loading...';
        quoteAuthor.textContent = '';
        try {
            const response = await fetch('https://dummyjson.com/quotes/random');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            quoteText.textContent = `"${data.quote}"`;
            quoteAuthor.textContent = `— ${data.author}`;
        } catch (error) {
            console.error("Failed to fetch quote from API:", error);
            showFallbackQuote();
        }
    }

    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', fetchQuote);
    }
    
    // --- IMAGE CAROUSEL SECTION (REBUILT) ---
    const carouselContainer = document.querySelector('.carousel-container');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const imageUpload = document.getElementById('image-upload');
    
    // UPDATED: Default images now point to a reliable online placeholder service
    const defaultImageUrls = [
        "https://placehold.co/800x600/007bff/white?text=Image+1",
        "https://placehold.co/800x600/28a745/white?text=Image+2",
        "https://placehold.co/800x600/dc3545/white?text=Image+3",
        "https://placehold.co/800x600/ffc107/black?text=Image+4"
    ];

    let slides = [];
    let dots = [];
    let currentSlide = 0;

    function showSlide(index) {
        if (slides.length === 0) return;
        currentSlide = (index + slides.length) % slides.length;
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function buildCarousel(imageUrls) {
        if (!carouselContainer || !dotsContainer) return; // Stop if elements don't exist
        carouselContainer.innerHTML = '';
        dotsContainer.innerHTML = '';

        if (!imageUrls || imageUrls.length === 0) {
            carouselContainer.innerHTML = '<p>No images to display.</p>';
            return;
        }

        imageUrls.forEach((url, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            const img = document.createElement('img');
            img.src = url;
            img.alt = `Carousel image ${index + 1}`;
            // Add error handling for each image
            img.onerror = () => {
                img.alt = "Image failed to load.";
                console.error(`Error loading image: ${url}`);
            };
            slide.appendChild(img);
            carouselContainer.appendChild(slide);

            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.addEventListener('click', () => showSlide(index));
            dotsContainer.appendChild(dot);
        });

        slides = document.querySelectorAll('.carousel-slide');
        dots = document.querySelectorAll('.dot');
        showSlide(0);
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    }

    if (imageUpload) {
        imageUpload.addEventListener('change', (event) => {
            const files = event.target.files;
            if (files && files.length > 0) {
                const uploadedUrls = Array.from(files).map(file => URL.createObjectURL(file));
                buildCarousel(uploadedUrls);
            }
        });
    }

    // --- INITIALIZE THE PAGE ---
    fetchQuote();
    buildCarousel(defaultImageUrls);
});