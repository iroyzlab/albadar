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

    // Dropdown handling:
    // - Desktop: Pure instant hover (CSS driven). Click on main trigger link calls preventDefault() with no toggle.
    // - Mobile: Tap on main trigger link toggles accordion (.open class) within drawer menu.
    dropdownItems.forEach(item => {
        const toggleLink = item.querySelector(':scope > a');
        if (toggleLink) {
            toggleLink.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent navigating to href (about.html, student-life.html, news.html)
                
                // Only perform accordion toggle on mobile / drawer navigation
                if (window.innerWidth <= 768) {
                    const isOpen = item.classList.contains('open');
                    dropdownItems.forEach(d => {
                        if (d !== item) d.classList.remove('open');
                    });
                    item.classList.toggle('open', !isOpen);
                }
            });
        }
    });

    // Close mobile dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item.dropdown') && window.innerWidth <= 768) {
            dropdownItems.forEach(d => d.classList.remove('open'));
        }
    });

    // Close menu when clicking normal links or dropdown sub-links
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.parentElement && link.parentElement.classList.contains('dropdown')) {
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
        { keywords: 'mbs kegiatan, siswa, ekstrakurikuler, fasilitas, kehidupan mbs, agenda periodik, muhadhoroh, muhadatsah, kajian tematik', title: 'Kehidupan Siswa & Agenda Periodik MBS', url: 'student-life.html' },
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

    // Custom Cursor & Magnetic Effect (Desktop only with hover & fine pointer support)
    const isDesktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth > 768;
    
    if (isDesktopPointer) {
        let cursorDot = document.getElementById('cursorDot');
        let cursorOutline = document.getElementById('cursorOutline');

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

        let mouseX = -100;
        let mouseY = -100;
        let outlineX = -100;
        let outlineY = -100;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Dot moves instantly without delay
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
            cursorDot.classList.remove('cursor-hidden');
            cursorOutline.classList.remove('cursor-hidden');
        });

        document.addEventListener('mouseleave', () => {
            cursorDot.classList.add('cursor-hidden');
            cursorOutline.classList.add('cursor-hidden');
        });

        document.addEventListener('mouseenter', () => {
            cursorDot.classList.remove('cursor-hidden');
            cursorOutline.classList.remove('cursor-hidden');
        });

        // Smooth trailing animation loop using rAF and Linear Interpolation (lerp)
        const renderCursor = () => {
            const ease = 0.15; // Smooth trailing factor
            outlineX += (mouseX - outlineX) * ease;
            outlineY += (mouseY - outlineY) * ease;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(renderCursor);
        };
        requestAnimationFrame(renderCursor);

        // Interactive elements hover state (outline scales down & increases opacity)
        const interactiveElements = document.querySelectorAll('a, button, .lux-img-zoom, .nav-link, .bento-card-lux, .tag-item, .news-card-lux, .faq-question, .step-card-lux, .facility-card, .magnetic-btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovered'));
        });

        // Magnetic Effect on interactive CTA buttons
        const magneticButtons = document.querySelectorAll('.magnetic-btn, .btn-gold-lux, .btn-primary-lux, a.nav-cta');
        magneticButtons.forEach((btn) => {
            const maxDisplacement = 15; // Max 15px magnetic attraction

            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const btnCenterX = rect.left + rect.width / 2;
                const btnCenterY = rect.top + rect.height / 2;

                const deltaX = (e.clientX - btnCenterX) / (rect.width / 2);
                const deltaY = (e.clientY - btnCenterY) / (rect.height / 2);

                const moveX = Math.max(Math.min(deltaX * maxDisplacement, maxDisplacement), -maxDisplacement);
                const moveY = Math.max(Math.min(deltaY * maxDisplacement, maxDisplacement), -maxDisplacement);

                btn.style.transform = `translate3d(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px, 0)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate3d(0px, 0px, 0)';
            });
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

    // Text Reveal Observer (Luxury Masked Line Animation)
    const textRevealElements = document.querySelectorAll('.text-reveal-wrap, .text-reveal');
    if (textRevealElements.length > 0) {
        const textRevealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        textRevealElements.forEach(el => textRevealObserver.observe(el));
    }

    // Parallax Geometric Pattern (Islamic Rub el Hizb)
    const parallaxPatterns = document.querySelectorAll('.parallax-pattern');
    if (parallaxPatterns.length > 0) {
        let isTicking = false;

        const updateParallax = () => {
            const windowHeight = window.innerHeight;
            parallaxPatterns.forEach((pattern) => {
                const parent = pattern.closest('.has-parallax-pattern') || pattern.parentElement;
                if (parent) {
                    const rect = parent.getBoundingClientRect();
                    // Process only when section is visible in or near viewport
                    if (rect.top < windowHeight && rect.bottom > 0) {
                        const speed = parseFloat(pattern.getAttribute('data-parallax-speed')) || 0.15;
                        // Smooth, subtle translation relative to section position
                        const offset = (windowHeight - rect.top) * speed;
                        pattern.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
                    }
                } else {
                    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
                    const offset = scrollY * 0.15;
                    pattern.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
                }
            });
            isTicking = false;
        };

        window.addEventListener('scroll', () => {
            if (!isTicking) {
                window.requestAnimationFrame(updateParallax);
                isTicking = true;
            }
        }, { passive: true });

        // Initial positioning on load
        updateParallax();
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

    // Luxury Form Submit Handlers (Direct WhatsApp Bridge)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('contactName') ? document.getElementById('contactName').value.trim() : '';
            const email = document.getElementById('contactEmail') ? document.getElementById('contactEmail').value.trim() : '';
            const phone = document.getElementById('contactPhone') ? document.getElementById('contactPhone').value.trim() : '';
            const topic = document.getElementById('contactTopic') ? document.getElementById('contactTopic').value : 'Informasi Umum';
            const message = document.getElementById('contactMessage') ? document.getElementById('contactMessage').value.trim() : '';

            const waText = `*Formulir Kontak SMP MBS Al Badar*\n\n` +
                `*Nama:* ${name}\n` +
                `*Email:* ${email}\n` +
                `*No. HP/WA:* ${phone}\n` +
                `*Topik:* ${topic}\n` +
                `*Pesan:* ${message}`;

            window.open('https://wa.me/6285729348915?text=' + encodeURIComponent(waText), '_blank');
        });
    }

    const ppdbInquiryForm = document.getElementById('ppdbInquiryForm');
    if (ppdbInquiryForm) {
        ppdbInquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const parentName = document.getElementById('ppdbParentName') ? document.getElementById('ppdbParentName').value.trim() : '';
            const studentName = document.getElementById('ppdbStudentName') ? document.getElementById('ppdbStudentName').value.trim() : '';
            const phone = document.getElementById('ppdbPhone') ? document.getElementById('ppdbPhone').value.trim() : '';
            const program = document.getElementById('ppdbProgramChoice') ? document.getElementById('ppdbProgramChoice').value : '';
            const question = document.getElementById('ppdbQuestion') ? document.getElementById('ppdbQuestion').value.trim() : '-';

            const programLabel = program === 'boarding' ? 'SMP Boarding School (Asrama 24 Jam)' : 'SMP Full Day School (Harian)';

            const waText = `*Konsultasi PPDB SMP MBS Al Badar*\n\n` +
                `*Orang Tua/Wali:* ${parentName}\n` +
                `*Calon Santri:* ${studentName}\n` +
                `*No. WA:* ${phone}\n` +
                `*Pilihan Jalur:* ${programLabel}\n` +
                `*Pertanyaan/Catatan:* ${question}`;

            window.open('https://wa.me/6285729348915?text=' + encodeURIComponent(waText), '_blank');
        });
    }
});
