document.addEventListener('DOMContentLoaded', function() {
    // Header Scroll
    const header = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    // Mobile Menu (Previous logic retained)
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const body = document.body;
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    body.appendChild(overlay);

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !expanded);
            navList.classList.toggle('active');
            overlay.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
    }
    const closeMenu = () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    };
    overlay.addEventListener('click', closeMenu);
    document.querySelectorAll('.nav-list a').forEach(link => link.addEventListener('click', closeMenu));

    // Custom Cursor
    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');
    
    if (window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
            cursorOutline.style.left = e.clientX + 'px';
            cursorOutline.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, .bento-card-lux').forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovered'));
        });
    }

    // Reveal on Scroll
    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger delay for hero items
                if (entry.target.classList.contains('reveal-stagger')) {
                    const children = Array.from(entry.target.parentNode.children).filter(c => c.classList.contains('reveal-stagger'));
                    const delay = children.indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealElements.forEach(el => observer.observe(el));

    // Set Year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Dynamic News Loader
    const newsContainer = document.getElementById('newsContainer');
    if (newsContainer) {
        const newsData = [
            {
                tag: "Info PPDB",
                title: "Pendaftaran Tahun Ajaran 2027/2028 Dibuka",
                excerpt: "SMP MBS Al Badar Prambanan resmi membuka PPDB. Segera amankan kuota Anda melalui Portal PSB.",
                img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop"
            },
            {
                tag: "Kurikulum",
                title: "Penerapan Koding & AI di Kelas",
                excerpt: "Sebagai langkah modernisasi, sekolah menyiapkan perangkat Chromebook untuk pembelajaran KKA.",
                img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop"
            },
            {
                tag: "Karakter",
                title: "Sinergi Program Sleman Religi",
                excerpt: "Pengintegrasian program Sleman Religi dengan kepesantrenan untuk membentuk akhlak Qur'ani.",
                img: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=600&auto=format&fit=crop"
            }
        ];

        newsContainer.innerHTML = newsData.map(news => `
            <a href="news.html" class="news-card-lux">
                <div class="news-img-wrap">
                    <img src="${news.img}" alt="${news.title}">
                </div>
                <div class="news-content-lux">
                    <span class="news-tag-lux">${news.tag}</span>
                    <h3 class="news-title-lux">${news.title}</h3>
                    <p class="news-excerpt-lux">${news.excerpt}</p>
                    <span class="news-read-lux">Baca Selengkapnya →</span>
                </div>
            </a>
        `).join('');
    }
});
