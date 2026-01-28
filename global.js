/**
 * Global Presentation Logic (Simplified Version)
 */

const SLIDES = [
    "slide01.html", "slide_new.html", "slide_new2.html", "slide_new3.html", "slide_new4.html",
    "slide03.html", "slide04.html",
    "slide05.html", "slide06.html", "slide07.html", "slide08.html",
    "slide09.html", "slide010.html", "slide011.html", "slide012.html",
    "slide013.html",
    "slide_new5.html", "slide_new6.html", "slide_new7.html",
    "slide014.html",
    "slide02.html", "slide_final.html"
];

const currentFile = window.location.pathname.split("/").pop() || "slide01.html";
const currentIndex = SLIDES.indexOf(currentFile);

// Scaling Logic
function handleScaling() {
    const container = document.querySelector('.slide-container');
    if (!container) return;

    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const baseW = 1280;
    const baseH = 720;

    const scale = Math.min(winW / baseW, winH / baseH);

    container.style.position = 'absolute';
    container.style.left = '50%';
    container.style.top = '50%';
    container.style.transform = `translate(-50%, -50%) scale(${scale})`;
    container.style.transformOrigin = 'center';

    // Ensure body background
    document.body.style.backgroundColor = "#000";
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";
}

// Navigation
function handleKeyDown(e) {
    if (e.key === "ArrowRight" && currentIndex < SLIDES.length - 1) {
        window.location.href = SLIDES[currentIndex + 1];
    } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        window.location.href = SLIDES[currentIndex - 1];
    }
}

// UI Setup
function setupUI() {
    // 1. Inject Montserrat Font if missing
    if (!document.querySelector('link[href*="Montserrat"]')) {
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800&display=swap';
        document.head.appendChild(fontLink);
    }

    // 2. Inject Lucide Icons CDN
    const lucideScript = document.createElement('script');
    lucideScript.src = 'https://unpkg.com/lucide@latest';
    lucideScript.onload = () => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    };
    document.head.appendChild(lucideScript);
}

window.addEventListener('load', () => {
    handleScaling();
    setupUI();
    document.addEventListener('keydown', handleKeyDown);
});

window.addEventListener('resize', handleScaling);

// Video Function (Global)
window.playVideo = function () {
    const video = document.getElementById('myDemoVideo');
    const overlay = document.getElementById('videoOverlay');
    if (video) {
        if (overlay) overlay.style.display = 'none';
        video.setAttribute('controls', 'true');
        video.play();
    }
};
