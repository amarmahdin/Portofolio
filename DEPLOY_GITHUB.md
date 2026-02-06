# 🚀 Panduan Lengkap Deploy Portfolio ke GitHub Pages

Panduan step-by-step untuk deploy website portfolio Vue.js ke GitHub Pages.

---

## 📋 Prerequisites (Yang Diperlukan)

1. ✅ Akun GitHub (gratis)
2. ✅ Git terinstall di komputer
3. ✅ Node.js terinstall (sudah ada karena project ini)
4. ✅ Repository GitHub sudah dibuat (atau akan dibuat)

---

## 🎯 Metode 1: Deploy Otomatis dengan GitHub Actions (RECOMMENDED)

Metode ini akan otomatis deploy setiap kali Anda push code ke GitHub.

### Step 1: Update Base Path di vite.config.js

**PENTING:** Sesuaikan base path dengan nama repository Anda!

1. Buka file `vite.config.js`
2. Cari baris: `base: process.env.NODE_ENV === 'production' ? '/Portofolio/' : '/',`
3. Ganti `/Portofolio/` dengan nama repository Anda

**Contoh:**
- Jika repository name: `my-portfolio` → ubah menjadi `/my-portfolio/`
- Jika repository name: `amarmahdin.github.io` → ubah menjadi `/`

```javascript
// vite.config.js
export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? '/NAMA-REPOSITORY-ANDA/' : '/',
  // ... rest of config
})
```

### Step 2: Inisialisasi Git (Jika Belum)

Buka terminal di folder project dan jalankan:

```bash
# Cek apakah sudah ada git
git status

# Jika belum ada, inisialisasi
git init
```

### Step 3: Buat Repository di GitHub

1. Buka https://github.com
2. Klik tombol **"+"** di kanan atas → **"New repository"**
3. Isi:
   - **Repository name**: `Portofolio` (atau nama lain)
   - **Description**: (opsional)
   - **Visibility**: Public (wajib untuk GitHub Pages gratis)
   - JANGAN centang "Initialize with README"
4. Klik **"Create repository"**

### Step 4: Push Code ke GitHub

Di terminal, jalankan perintah berikut (ganti USERNAME dan REPOSITORY-NAME):

```bash
# Tambahkan semua file
git add .

# Commit
git commit -m "Initial commit: Portfolio website"

# Rename branch ke main (jika perlu)
git branch -M main

# Tambahkan remote repository
git remote add origin https://github.com/USERNAME/REPOSITORY-NAME.git

# Push ke GitHub
git push -u origin main
```

**Contoh:**
```bash
git remote add origin https://github.com/amarmahdin/Portofolio.git
git push -u origin main
```

### Step 5: Aktifkan GitHub Pages

1. Buka repository di GitHub (https://github.com/USERNAME/REPOSITORY-NAME)
2. Klik tab **"Settings"** (di menu atas)
3. Scroll ke bawah, klik **"Pages"** (di sidebar kiri)
4. Di bagian **"Source"**:
   - Pilih **"GitHub Actions"** (bukan "Deploy from a branch")
5. Klik **"Save"**

### Step 6: Tunggu Deploy Selesai

1. Klik tab **"Actions"** di repository
2. Anda akan melihat workflow **"Deploy to GitHub Pages"** sedang berjalan
3. Tunggu sampai status menjadi hijau (✅) - biasanya 2-3 menit
4. Jika ada error, klik workflow untuk melihat detail error

### Step 7: Akses Website

Setelah deploy selesai, website akan tersedia di:
```
https://USERNAME.github.io/REPOSITORY-NAME/
```

**Contoh:**
- Repository: `amarmahdin/Portofolio`
- URL: `https://amarmahdin.github.io/Portofolio/`

---

## 🔄 Update Website (Setelah Deploy Pertama)

Setiap kali Anda mengubah code dan ingin update website:

```bash
# Tambahkan perubahan
git add .

# Commit dengan pesan
git commit -m "Update: deskripsi perubahan"

# Push ke GitHub
git push origin main
```

GitHub Actions akan otomatis:
1. Build project
2. Deploy ke GitHub Pages
3. Website terupdate dalam 2-3 menit

---

## 🛠️ Metode 2: Deploy Manual dengan gh-pages

Jika Anda ingin deploy manual tanpa GitHub Actions:

### Step 1: Install gh-pages

```bash
npm install --save-dev gh-pages
```

### Step 2: Build dan Deploy

```bash
npm run deploy
```

Perintah ini akan:
1. Build project (`npm run build`)
2. Deploy ke branch `gh-pages`

### Step 3: Aktifkan GitHub Pages

1. Buka repository → **Settings** → **Pages**
2. Di bagian **Source**, pilih:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
3. Klik **Save**

---

## ⚙️ Konfigurasi Base Path

### Jika Repository Name = "Portofolio"
```javascript
base: process.env.NODE_ENV === 'production' ? '/Portofolio/' : '/',
```

### Jika Repository Name = "my-portfolio"
```javascript
base: process.env.NODE_ENV === 'production' ? '/my-portfolio/' : '/',
```

### Jika Repository Name = "username.github.io" (Custom Domain)
```javascript
base: '/',
```

**PENTING:** Base path HARUS sesuai dengan nama repository!

---

## 🐛 Troubleshooting

### 1. Website Menampilkan Blank Page / 404

**Penyebab:** Base path tidak sesuai dengan nama repository

**Solusi:**
1. Cek nama repository di GitHub
2. Update base path di `vite.config.js`
3. Push ulang ke GitHub

### 2. Assets (Gambar) Tidak Muncul

**Penyebab:** Base path salah atau assets tidak ter-build

**Solusi:**
1. Pastikan base path benar
2. Pastikan semua gambar ada di `src/assets/`
3. Rebuild: `npm run build` lalu push ulang

### 3. GitHub Actions Error

**Penyebab:** Build error atau konfigurasi salah

**Solusi:**
1. Klik tab **"Actions"** → pilih workflow yang error
2. Lihat detail error di log
3. Pastikan:
   - Semua dependencies terinstall
   - Tidak ada syntax error
   - Base path sudah benar

### 4. Website Tidak Update Setelah Push

**Solusi:**
1. Tunggu 2-3 menit (GitHub perlu waktu untuk build)
2. Hard refresh browser (Ctrl+F5 atau Cmd+Shift+R)
3. Cek status di tab **"Actions"**

### 5. Permission Denied saat Push

**Solusi:**
```bash
# Cek remote
git remote -v

# Jika salah, update remote
git remote set-url origin https://github.com/USERNAME/REPOSITORY-NAME.git

# Atau gunakan SSH (jika sudah setup)
git remote set-url origin git@github.com:USERNAME/REPOSITORY-NAME.git
```

---

## 📝 Checklist Sebelum Deploy

- [ ] Base path di `vite.config.js` sudah sesuai nama repository
- [ ] Semua file sudah di-commit
- [ ] Repository GitHub sudah dibuat
- [ ] GitHub Pages sudah diaktifkan (Source: GitHub Actions)
- [ ] Workflow berhasil di tab "Actions"
- [ ] Website bisa diakses di URL GitHub Pages

---

## 🔗 Link Penting

- **GitHub Pages**: https://pages.github.com
- **GitHub Actions**: https://github.com/features/actions
- **Vite Deployment Guide**: https://vitejs.dev/guide/static-deploy.html

---

## 💡 Tips

1. **Custom Domain**: Anda bisa menggunakan domain sendiri dengan menambahkan file `CNAME` di folder `public/`
2. **HTTPS**: GitHub Pages otomatis menggunakan HTTPS (gratis)
3. **Auto Deploy**: Setiap push ke `main` akan otomatis deploy
4. **Preview**: Test build lokal dengan `npm run build` lalu `npm run preview`

---

## ✅ Setelah Deploy Berhasil

Website portfolio Anda sekarang live di GitHub Pages! 🎉

**URL Format:**
```
https://USERNAME.github.io/REPOSITORY-NAME/
```

**Contoh:**
```
https://amarmahdin.github.io/Portofolio/
```

Selamat! Portfolio Anda sudah online! 🚀
