# AI Context & Design System Guidelines

Dokumentasi ini memuat panduan struktur, filosofi, palet warna, dan aturan pengembangan untuk repository **SMP MBS Al Badar Prambanan**.

---

## 1. Identitas & Filosofi Sekolah

- **Nama Resmi**: SMP Muhammadiyah Boarding School (MBS) Al Badar Prambanan
- **Tagline / Visi Utama**: *"Membentuk Generasi Qur'ani dan Cendekia"*
- **Visi**: *"Terwujudnya generasi rabbani yang cerdas, berdaya saing, dan berakhlak Qur’ani melalui pembinaan intensif di lingkungan pesantren."*
- **Lokasi**: Jamusan, Jirak, Bokoharjo, Kec. Prambanan, Kabupaten Sleman, DIY 55572
- **Domain Web Resmi (GitHub Pages)**: `https://iroyzlab.github.io/albadar/`
- **Fokus Kurikulum**: Integrasi pendidikan akademik nasional, pembentukan karakter Islam, Tahfidz Al-Qur'an (target 5 Juz), penguasaan bahasa internasional (Arab & Inggris), serta penguasaan teknologi masa depan (Coding & AI, STEM).

---

## 2. Sistem Palet Warna Khas MBS

| Warna | Hex Code | Variabel CSS | Penggunaan |
| :--- | :--- | :--- | :--- |
| **Hijau Muhammadiyah Tua** | `#04473A` | `--color-primary` | Warna utama identitas sekolah, header scrolled logo, button primary hover, hero background, footer background |
| **Biru Muhammadiyah Tua** | `#11366E` | `--color-secondary` | Warna aksen sekunder, sub-elemen mewah, button hover states |
| **Emas Terang (Lux Gold)** | `#D4B582` | `--lux-gold` | Aksen emas di atas **latar belakang GELAP** (`.page-hero`, `.bg-emerald`, `.bg-lux-dark`, `:focus-visible` outline) |
| **Emas Kontras WCAG AA** | `#6B5220` | Digunakan di `.eyebrow` | Teks aksen sub-header di atas **latar belakang TERANG** (Putih `#FAFBFC` / Sand `#F0F4F8`) untuk memenuhi kontras WCAG AA (> 4.5:1) |
| **Hitam Gelap Luxury** | `#050505` | `--lux-dark` | Heading utama (`h1`, `h2`, `h3`), teks gelap |
| **Putih Clean Premium** | `#FAFBFC` | `--lux-bg` | Latar belakang halaman utama |
| **Sand Light** | `#F0F4F8` | `.bg-sand` | Latar belakang alternatif antar section |

---

## 3. Tipografi & Aksesibilitas (A11y)

- **Font Heading**: `'Fraunces'`, serif
- **Font Body**: `'Inter'`, sans-serif
- **Fokus Navigasi Keyboard**: Seluruh elemen interaktif (`a`, `button`, `input`, `textarea`, `select`) memiliki garis outline `:focus-visible`:
  ```css
  outline: 2px solid #D4B582;
  outline-offset: 2px;
  ```
- **Kontras Teks**: Seluruh elemen `.eyebrow` pada latar terang wajib menggunakan `#6B5220`. Untuk latar gelap, gunakan class `.eyebrow-light`.

---

## 4. Struktur Repository & Halaman Web

- **Total 25 Halaman HTML**:
  - Beranda & Profil: `index.html`, `about.html`, `programs.html`, `boarding.html`, `non-boarding.html`, `student-life.html`, `achievements.html`, `gallery.html`, `news.html`, `faq.html`, `ppdb.html`, `contact.html`, `privacy-policy.html`, `404.html`
  - 11 Halaman Ekstrakurikuler: `ekstra-arabic-club.html`, `ekstra-coding-ai.html`, `ekstra-english-club.html`, `ekstra-futsal.html`, `ekstra-hizbul-wathan.html`, `ekstra-jurnalistik.html`, `ekstra-sinematografi.html`, `ekstra-stem.html`, `ekstra-tahfidz.html`, `ekstra-tapak-suci.html`, `ekstra-tenis-meja.html`
- **Aset Utama**:
  - `assets/css/style.css`: File Master CSS
  - `assets/js/main.js`: Logika JavaScript utama (Navigasi mobile, header scrolled state, current year)
  - `sitemap.xml` & `robots.txt`: Pengaturan SEO & Indexing

---

## 5. Prinsip Pengembangan AI / Developer

1. **Non-Destruktif**: Menambahkan fitur atau membenahi bug **tanpa mengubah desain dasar**, tata letak visual, atau skema warna yang sudah disepakati.
2. **Standard SEO & A11y**:
   - Meta description konsisten (130-160 karakter) menyertakan *"Prambanan, Sleman, Yogyakarta"*.
   - Open Graph tags lengkap pada setiap `<head>`.
   - JSON-LD Schema.org `EducationalOrganization` pada `index.html`, `about.html`, `contact.html`, `ppdb.html`.
3. **Pengelolaan Git**:
   - Gunakan branch fitur/fix yang jelas (`fix/...` atau `feature/...`).
   - Tunjukkan diff sebelum meng-commit jika diminta user.
