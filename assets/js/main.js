document.addEventListener('DOMContentLoaded', function() {
    // Header Scroll
    const header = document.getElementById('siteHeader');
    if (header) {
        const handleHeaderScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        // Run on page load and on scroll
        handleHeaderScroll();
        window.addEventListener('scroll', handleHeaderScroll);
    }

    // Mobile Menu & Dropdowns
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const body = document.body;
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    body.appendChild(overlay);

    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !expanded);
            if (navList) navList.classList.toggle('active');
            overlay.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
    }

    const closeMenu = () => {
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        if (navList) navList.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
        dropdownItems.forEach(d => d.classList.remove('open'));
    };

    if (overlay) overlay.addEventListener('click', closeMenu);

    // Mobile dropdown toggle handling
    dropdownItems.forEach(item => {
        const toggleLink = item.querySelector(':scope > a');
        if (toggleLink) {
            toggleLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 1024) {
                    const isOpen = item.classList.contains('open');
                    dropdownItems.forEach(d => {
                        if (d !== item) d.classList.remove('open');
                    });
                    if (!isOpen) {
                        e.preventDefault();
                        item.classList.add('open');
                    }
                }
            });
        }
    });

    // Close menu when clicking normal links or dropdown sub-links
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.parentElement && link.parentElement.classList.contains('dropdown') && window.innerWidth <= 1024) {
                return;
            }
            closeMenu();
        });
    });

    // Search Form Logic
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchValue = searchInput.value.trim();
            if (searchValue) {
                const targetUrl = 'https://www.google.com/search?q=site:iroyzlab.github.io/albadar/+' + encodeURIComponent(searchValue);
                window.location.href = targetUrl;
            }
        });
    }

    // Custom Cursor (Auto-inject ke semua halaman)
    let cursorDot = document.getElementById('cursorDot');
    let cursorOutline = document.getElementById('cursorOutline');
    
    if (window.innerWidth > 768) {
        if (!cursorDot) {
            cursorDot = document.createElement('div');
            cursorDot.id = 'cursorDot';
            cursorDot.className = 'cursor-dot';
            document.body.appendChild(cursorDot);
        }
        if (!cursorOutline) {
            cursorOutline = document.createElement('div');
            cursorOutline.id = 'cursorOutline';
            cursorOutline.className = 'cursor-outline';
            document.body.appendChild(cursorOutline);
        }

        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
            cursorOutline.style.left = e.clientX + 'px';
            cursorOutline.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, .bento-card-lux, .tag-item, .news-card-lux, .faq-question, .step-card-lux, .facility-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovered'));
        });
    }

    // Reveal on Scroll
    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
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
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            const answer = this.nextElementSibling;
            faqQuestions.forEach(q => {
                q.setAttribute('aria-expanded', 'false');
                if (q.nextElementSibling) q.nextElementSibling.style.maxHeight = null;
            });
            if (!expanded) {
                this.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Set Year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Dynamic News Loader
    const newsContainer = document.getElementById('newsContainer');
    if (newsContainer) {
        const newsData = [
            { tag: "Info PPDB", title: "Pendaftaran Tahun Ajaran 2027/2028 Dibuka", excerpt: "SMP MBS Al Badar Prambanan resmi membuka PPDB. Segera amankan kuota Anda melalui Portal PSB.", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop" },
            { tag: "Kurikulum", title: "Penerapan Koding & AI di Kelas", excerpt: "Sebagai langkah modernisasi, sekolah menyiapkan perangkat Chromebook untuk pembelajaran KKA.", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop" },
            { tag: "Karakter", title: "Sinergi Program Sleman Religi", excerpt: "Pengintegrasian program Sleman Religi dengan kepesantrenan untuk membentuk akhlak Qur'ani.", img: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=600&auto=format&fit=crop" }
        ];
        newsContainer.innerHTML = newsData.map(news => `
            <a href="news.html" class="news-card-lux">
                <div class="news-img-wrap"><img src="${news.img}" alt="${news.title}" loading="lazy" onerror="this.onerror=null;this.src='assets/img/placeholder.svg';"></div>
                <div class="news-content-lux">
                    <span class="news-tag-lux">${news.tag}</span>
                    <h3 class="news-title-lux">${news.title}</h3>
                    <p class="news-excerpt-lux">${news.excerpt}</p>
                    <span class="news-read-lux">Baca Selengkapnya →</span>
                </div>
            </a>
        `).join('');
    }

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const zoomableImages = document.querySelectorAll('.zoomable');
    if (lightbox && lightboxImg) {
        zoomableImages.forEach(img => {
            img.addEventListener('click', function() {
                lightboxImg.src = this.src;
                lightbox.classList.add('active');
            });
        });
        lightbox.addEventListener('click', function() {
            lightbox.classList.remove('active');
        });
    }
});
