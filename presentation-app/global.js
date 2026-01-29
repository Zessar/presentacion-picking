/**
 * Global Presentation Logic
 * Features: Sidebar Nav, Smooth Transitions, Scaling, Preloading
 */

const SLIDES = [
    { file: "slide01.html", title: "PORTADA" },
    { file: "slide_new.html", title: "COMPARATIVA OPERATIVA" },
    { file: "slide_new2.html", title: "PRODUCTIVIDAD TURNO" },
    { file: "slide_new3.html", title: "PRODUCTIVIDAD ZONA" },
    { file: "slide_new4.html", title: "RENDIMIENTO SEGUN TIPOLOGIA" },
    { file: "slide03.html", title: "SECCION 01" },
    { file: "slide04.html", title: "EVITAR DESPLAZAMIENTOS" },
    { file: "slide05.html", title: "LIMITAR PRENDAS" },
    { file: "slide06.html", title: "RE-ETIQUETADO" },
    { file: "slide07.html", title: "SEÑALIZACION INTEGRAL" },
    { file: "slide08.html", title: "F3B: RECONFIGURACION" },
    { file: "slide09.html", title: "SECCION 02" },
    { file: "slide010.html", title: "EXCLUSIVOS AGV" },
    { file: "slide011.html", title: "ASIGNACION DINAMICA" },
    { file: "slide012.html", title: "PAUSAR, REANUDAR OT" },
    { file: "slide013.html", title: "COMPORTAMIENTO DE RACKS" },
    { file: "slide_new5.html", title: "HERRAMIENTAS OPERACIONALES" },
    { file: "slide_new6.html", title: "INVESTIGACION CALIDAD" },
    { file: "slide_new7.html", title: "IMPACTO & HOJA RUTA" },
    { file: "slide02.html", title: "AGENDA" },
    { file: "slide_final.html", title: "CIERRE" }
];

// Clean path to find current file
const pathParts = window.location.pathname.split("/");
const currentFile = pathParts[pathParts.length - 1] || "slide01.html";
const currentIndex = SLIDES.findIndex(s => s.file === currentFile);

// --- Navigation & Transitions ---

function navigateTo(url) {
    if (!url) return;

    // Save Sidebar State
    const sidebar = document.getElementById('nav-sidebar');
    if (sidebar && sidebar.classList.contains('open')) {
        localStorage.setItem('sidebarOpen', 'true');
    } else {
        localStorage.setItem('sidebarOpen', 'false');
    }

    // 1. Add Exit Class
    document.body.classList.add('page-exiting');
    const container = document.querySelector('.slide-container');
    if (container) container.style.opacity = '0';

    // 2. Wait for transition then go
    setTimeout(() => {
        window.location.href = url;
    }, 300); // Matches CSS transition time
}

function handleKeyDown(e) {
    if (e.key === "ArrowRight" && currentIndex < SLIDES.length - 1) {
        navigateTo(SLIDES[currentIndex + 1].file);
    } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        navigateTo(SLIDES[currentIndex - 1].file);
    }
}

// --- Scaling Logic ---

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

    // Reveal container after scaling to avoid layout jump
    requestAnimationFrame(() => {
        container.classList.add('slide-loaded');
    });

    // Ensure body background
    document.body.style.backgroundColor = "#000";
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";
}

// --- Sidebar & UI ---

function setupUI() {
    // 1. Inject Fonts & Icons
    if (!document.querySelector('link[href*="Montserrat"]')) {
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800&display=swap';
        document.head.appendChild(fontLink);
    }

    const lucideScript = document.createElement('script');
    lucideScript.src = 'https://unpkg.com/lucide@latest';
    lucideScript.onload = () => { if (typeof lucide !== 'undefined') lucide.createIcons(); };
    document.head.appendChild(lucideScript);

    // 2. Check Persistence
    const wasOpen = localStorage.getItem('sidebarOpen') === 'true';
    const initialClass = wasOpen ? 'open' : '';
    const initialIcon = wasOpen ? 'x' : 'menu';

    // 3. Inject Sidebar HTML
    const sidebarHTML = `
        <div id="nav-toggle">
            <i data-lucide="${initialIcon}"></i>
        </div>
        <nav id="nav-sidebar" class="${initialClass}">
            <div style="padding: 0 24px; margin-bottom: 20px;">
                <h3 style="color: white; font-weight: 800; font-size: 1.2rem;">Índice</h3>
                <p style="color: #64748b; font-size: 0.8rem;">GXO Logistics</p>
            </div>
            <ul class="nav-slides-list">
                ${SLIDES.map((slide, index) => {
        const isActive = index === currentIndex ? 'class="active"' : '';
        return `<li><a href="#" onclick="event.preventDefault(); navigateTo('${slide.file}')" ${isActive}>${slide.title}</a></li>`;
    }).join('')}
            </ul>
        </nav>
    `;

    const div = document.createElement('div');
    div.innerHTML = sidebarHTML;
    document.body.appendChild(div);

    // 3. Sidebar Logic
    const toggle = document.getElementById('nav-toggle');
    const sidebar = document.getElementById('nav-sidebar');

    if (toggle && sidebar) {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            const isOpen = sidebar.classList.contains('open');
            localStorage.setItem('sidebarOpen', isOpen);

            // Update icon
            const icon = isOpen ? 'x' : 'menu';
            toggle.innerHTML = `<i data-lucide="${icon}"></i>`;
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }
}

// --- Preload Next Slide Images ---
function preloadNext() {
    if (currentIndex < SLIDES.length - 1) {
        const nextSlide = SLIDES[currentIndex + 1].file;
        // Fetch HTML text to parse img src
        fetch(nextSlide)
            .then(res => res.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const images = doc.querySelectorAll('img');
                images.forEach(img => {
                    const i = new Image();
                    i.src = img.src;
                });
            })
            .catch(() => { });
    }
}

// --- Init ---

window.addEventListener('load', () => {
    handleScaling();
    setupUI();
    document.addEventListener('keydown', handleKeyDown);
    setTimeout(preloadNext, 1000); // Preload after initial stability
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

window.navigateTo = navigateTo; // Expose globally just in case
