# Website Portofolio

Website portofolio modern dan responsive yang dibangun menggunakan Vue.js 3 dan Vite.

## 🚀 Fitur

- ✨ Design modern dan responsive
- 🎨 UI/UX yang menarik
- 📱 Mobile-friendly
- ⚡ Fast loading dengan Vite
- 🎯 Smooth scrolling navigation
- 📧 Contact form
- 💼 Projects showcase

## 🛠️ Teknologi

- **Vue.js 3** - Progressive JavaScript Framework
- **Vite** - Next Generation Frontend Tooling
- **CSS3** - Modern styling dengan animations

## 📦 Instalasi

1. Clone repository ini atau gunakan project yang sudah ada
2. Install dependencies:

```bash
npm install
```

## 🏃 Menjalankan Development Server

```bash
npm run dev
```

Website akan berjalan di `http://localhost:5173`

## 🏗️ Build untuk Production

```bash
npm run build
```

File hasil build akan berada di folder `dist/`

## 👀 Preview Build

```bash
npm run preview
```

## 📝 Customization

Anda dapat mengkustomisasi website dengan mengedit:

- **Informasi Personal**: Edit komponen di `src/components/`
  - `Hero.vue` - Nama, role, deskripsi, social links
  - `About.vue` - Tentang saya, skills
  - `Projects.vue` - Daftar proyek
  - `Contact.vue` - Informasi kontak
  - `Footer.vue` - Footer links

- **Styling**: Edit file CSS di masing-masing komponen atau `src/style.css`

- **Meta Tags**: Edit `index.html` untuk SEO

## 🚀 Deployment

### Vercel (Recommended)

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Vercel akan otomatis detect Vue.js dan deploy

### Netlify

1. Push code ke GitHub
2. Import project di [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages

1. Install `gh-pages`: `npm install --save-dev gh-pages`
2. Tambahkan script di `package.json`:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```
3. Run: `npm run deploy`

### Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Init: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## 📄 License

MIT

---

Dibuat dengan ❤️ menggunakan Vue.js & Vite
