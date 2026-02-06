# Panduan Deploy ke GitHub Pages

Website portfolio ini dapat di-deploy ke GitHub Pages dengan mudah. Ikuti langkah-langkah berikut:

## Metode 1: Menggunakan GitHub Actions (Otomatis) - RECOMMENDED

### Langkah 1: Push ke GitHub
1. Buat repository baru di GitHub (jika belum ada)
2. Push semua file ke repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPOSITORY-NAME.git
   git push -u origin main
   ```

### Langkah 2: Aktifkan GitHub Pages
1. Buka repository di GitHub
2. Pergi ke **Settings** → **Pages**
3. Di bagian **Source**, pilih **GitHub Actions**
4. File workflow sudah tersedia di `.github/workflows/deploy.yml`

### Langkah 3: Update Base Path (Jika perlu)
Jika nama repository Anda berbeda dari "Portofolio", update base path di:
- `vite.config.js` - ubah `/Portofolio/` menjadi `/NAMA-REPOSITORY-ANDA/`
- `.github/workflows/deploy.yml` - ubah `BASE_URL: /Portofolio/` menjadi `/NAMA-REPOSITORY-ANDA/`

### Langkah 4: Deploy
Setelah push ke branch `main`, GitHub Actions akan otomatis:
1. Build project
2. Deploy ke GitHub Pages
3. Website akan tersedia di: `https://USERNAME.github.io/REPOSITORY-NAME/`

---

## Metode 2: Menggunakan gh-pages (Manual)

### Langkah 1: Install gh-pages
```bash
npm install --save-dev gh-pages
```

### Langkah 2: Deploy
```bash
npm run deploy
```

### Langkah 3: Aktifkan GitHub Pages
1. Buka repository di GitHub
2. Pergi ke **Settings** → **Pages**
3. Di bagian **Source**, pilih branch **gh-pages** dan folder **/ (root)**
4. Website akan tersedia di: `https://USERNAME.github.io/REPOSITORY-NAME/`

---

## Catatan Penting

### Base Path
- Jika repository name adalah `username.github.io`, base path harus `/`
- Jika repository name lainnya, base path harus `/REPOSITORY-NAME/`

### Update Base Path di vite.config.js:
```javascript
base: process.env.NODE_ENV === 'production' ? '/REPOSITORY-NAME/' : '/',
```

### Update Base Path di .github/workflows/deploy.yml:
```yaml
env:
  BASE_URL: /REPOSITORY-NAME/
```

---

## Troubleshooting

### 1. Assets tidak muncul
- Pastikan base path sudah benar di `vite.config.js`
- Pastikan semua assets ada di folder `src/assets/` atau `public/`

### 2. 404 Error
- Pastikan base path sesuai dengan nama repository
- Pastikan GitHub Pages sudah diaktifkan di Settings

### 3. Build Error
- Pastikan semua dependencies terinstall: `npm install`
- Pastikan Node.js version >= 18

---

## URL Website
Setelah deploy berhasil, website akan tersedia di:
- `https://USERNAME.github.io/REPOSITORY-NAME/`

Contoh:
- Repository: `amarmahdin/Portofolio`
- URL: `https://amarmahdin.github.io/Portofolio/`

---

## Update Website
Setiap kali Anda push perubahan ke branch `main`, GitHub Actions akan otomatis rebuild dan redeploy website.
