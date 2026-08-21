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
                    e.preventDefault();
                    const isOpen = item.classList.contains('open');
                    dropdownItems.forEach(d => {
                        if (d !== item) d.classList.remove('open');
                    });
                    item.classList.toggle('open');
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

    // Comprehensive Site Search Index Array
    const siteSearchIndex = [
        { keywords: 'mbs tentang, profil, sejarah, visi, misi, tentang mbs', title: 'Tentang MBS Al Badar', url: 'about.html' },
        { keywords: 'mbs program, kurikulum, akademik, mata pelajaran, program mbs', title: 'Program & Kurikulum MBS', url: 'programs.html' },
        { keywords: 'mbs boarding, asrama, santri, boarding mbs', title: 'Program Boarding MBS', url: 'programs.html#boarding' },
        { keywords: 'mbs fullday, harian, non boarding, fullday mbs', title: 'Program Full Day MBS', url: 'programs.html#fullday' },
        { keywords: 'mbs ppdb, pendaftaran, psb, daftar mbs, ppdb mbs', title: 'Panduan PPDB MBS', url: 'ppdb.html' },
        { keywords: 'mbs kegiatan, siswa, ekstrakurikuler, fasilitas, kehidupan mbs', title: 'Kehidupan Siswa MBS', url: 'student-life.html' },
        { keywords: 'mbs berita, kabar, pengumuman, info mbs', title: 'Berita & Info MBS', url: 'news.html' },
        { keywords: 'mbs kontak, alamat, telepon, wa, email, kontak mbs', title: 'Kontak MBS', url: 'contact.html' },
        { keywords: 'mbs faq, tanya, jawab, bantuan', title: 'FAQ MBS', url: 'faq.html' }
    ];

    // Search Bar & Autocomplete Logic
    const searchToggle = document.getElementById('searchToggle');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');

    if (searchForm && searchInput) {
        // Create or find searchResultsContainer
        let searchResultsContainer = document.getElementById('searchResultsContainer');
        if (!searchResultsContainer) {
            searchResultsContainer = document.createElement('div');
            searchResultsContainer.id = 'searchResultsContainer';
            const searchItemParent = searchForm.closest('.nav-search-item') || searchForm.parentElement;
            if (searchItemParent) {
                searchItemParent.appendChild(searchResultsContainer);
            } else {
                searchForm.appendChild(searchResultsContainer);
            }
        }

        const hideSearchResults = () => {
            if (searchResultsContainer) {
                searchResultsContainer.classList.remove('active');
                searchResultsContainer.innerHTML = '';
            }
        };

        // Toggle Search Bar Open/Close
        if (searchToggle) {
            searchToggle.addEventListener('click', function() {
                searchForm.classList.toggle('active');
                if (searchForm.classList.contains('active')) {
                    searchInput.focus();
                } else {
                    hideSearchResults();
                }
            });
        }

        // Close Search Bar
        if (searchClose) {
            searchClose.addEventListener('click', function() {
                searchForm.classList.remove('active');
                hideSearchResults();
            });
        }

        // Autocomplete on Input
        searchInput.addEventListener('input', function() {
            const query = searchInput.value.trim().toLowerCase();
            if (!query) {
                hideSearchResults();
                return;
            }

            const matches = siteSearchIndex.filter(item => 
                item.keywords.toLowerCase().includes(query) || 
                item.title.toLowerCase().includes(query)
            );

            searchResultsContainer.innerHTML = '';
            if (matches.length > 0) {
                matches.forEach(match => {
                    const a = document.createElement('a');
                    a.href = match.url;
                    a.className = 'search-suggestion-item';
                    a.textContent = match.title;
                    searchResultsContainer.appendChild(a);
                });
            } else {
                const emptyMsg = document.createElement('div');
                emptyMsg.className = 'search-suggestion-empty';
                emptyMsg.textContent = 'Maaf, topik tidak ditemukan. Coba kata kunci lain.';
                searchResultsContainer.appendChild(emptyMsg);
            }

            searchResultsContainer.classList.add('active');
        });

        // Close suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchForm.contains(e.target) && !searchResultsContainer.contains(e.target) && (!searchToggle || !searchToggle.contains(e.target))) {
                hideSearchResults();
            }
        });

        // Handle Search Submit (Redirect to Google)
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchQuery = searchInput.value.trim();
            if (searchQuery) {
                const googleSearchUrl = 'https://www.google.com/search?q=site:iroyzlab.github.io/albadar/+' + encodeURIComponent(searchQuery);
                window.location.href = googleSearchUrl;
            }
        });
    }

    // Dynamic News Loader (Sequential Staggered Fade)
    const allNews = [
        { tag: "Boarding Experience", title: "Albadar Camp (ABC) Perdana", excerpt: "15-16 Agustus 2026 - Kegiatan malam bina iman dan taqwa (MABIT) bulanan dari Sabtu siang hingga Ahad pagi...", img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=600&auto=format&fit=crop" },
        { tag: "Pengembangan Guru", title: "Bimbingan Teknis Kurikulum Satuan Pendidikan (KSP)", excerpt: "Rabu, 29 Juli 2026 - Guru dan tenaga kependidikan mengikuti bimbingan teknis penyusunan dan evaluasi...", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop" },
        { tag: "Event Nasional", title: "Partisipasi Santri dalam Peringatan Hari Anak Nasional", excerpt: "Rabu, 22 Juli 2026 - Siswa kelas 7 mengikuti rangkaian HAN 2026 di Kompleks Candi Prambanan. Beberapa santri...", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop" },
        { tag: "Orientasi", title: "FORTASI: Forum Orientasi dan Taaruf Santri", excerpt: "14-16 Juli 2026 - Kegiatan orientasi selama 3 hari untuk mengenalkan budaya pesantren, kurikulum,...", img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop" },
        { tag: "Kegiatan Santri", title: "Penyerahan Resmi Santri Baru Angkatan Pertama", excerpt: "Senin, 13 Juli 2026 - Kegiatan penyerahan dan penerimaan santri baru dilaksanakan secara khidmat...", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop" }
    ];

    function updateNewsCard(cardId, newsItem) {
        const card = document.getElementById(cardId);
        if (!card) return;

        // 1. Fade out
        card.style.opacity = '0';

        // 2. After 500ms, change content and fade back in
        setTimeout(() => {
            card.href = "news.html"; // Keep link
            const imgEl = card.querySelector('.news-img-wrap img');
            if (imgEl) {
                imgEl.src = newsItem.img;
                imgEl.alt = newsItem.title;
            }
            const tagEl = card.querySelector('.news-tag-lux');
            if (tagEl) tagEl.textContent = newsItem.tag;
            const titleEl = card.querySelector('.news-title-lux');
            if (titleEl) titleEl.textContent = newsItem.title;
            const excerptEl = card.querySelector('.news-excerpt-lux');
            if (excerptEl) excerptEl.textContent = newsItem.excerpt;

            // 3. Fade in
            card.style.opacity = '1';
        }, 500);
    }

    // Initial Load
    if (document.getElementById('newsCard1')) {
        updateNewsCard('newsCard1', allNews[0]);
        updateNewsCard('newsCard2', allNews[1]);
        updateNewsCard('newsCard3', allNews[2]);
        
        let currentCard = 1; // Start with Card 1
        let newsOffset = 3; // Start from the 4th item (since 1,2,3 are loaded initially)

        // Auto-rotate: each card updates sequentially every 5 seconds
        setInterval(() => {
            const cardId = 'newsCard' + currentCard;
            updateNewsCard(cardId, allNews[newsOffset % allNews.length]);
            
            newsOffset++;
            currentCard = (currentCard % 3) + 1; // Loop: 1 -> 2 -> 3 -> 1
        }, 5000); // 5 seconds interval
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

    // Reveal on Scroll (Must be initialized AFTER news items are injected)
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
