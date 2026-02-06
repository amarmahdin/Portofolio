# 🚀 Langkah Deploy Portfolio ke GitHub Pages

Repository Anda: **https://github.com/amarmahdin/Portofolio.git**

Base path sudah dikonfigurasi: `/Portofolio/` ✅

---

## 📝 Langkah-Langkah Deploy

### Step 1: Inisialisasi Git

Buka terminal di folder project dan jalankan:

```bash
git init
```

### Step 2: Tambahkan Semua File

```bash
git add .
```

### Step 3: Commit

```bash
git commit -m "Initial commit: Portfolio website with modern design"
```

### Step 4: Set Branch ke Main

```bash
git branch -M main
```

### Step 5: Tambahkan Remote Repository

```bash
git remote add origin https://github.com/amarmahdin/Portofolio.git
```

### Step 6: Push ke GitHub

```bash
git push -u origin main
```

**Catatan:** Jika diminta username dan password:
- Username: `amarmahdin`
- Password: Gunakan **Personal Access Token** (bukan password GitHub)
  - Cara buat token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token
  - Beri permission: `repo` (full control)

---

## ⚙️ Aktifkan GitHub Pages

Setelah push berhasil:

1. Buka: https://github.com/amarmahdin/Portofolio
2. Klik **Settings** (di menu atas)
3. Scroll ke bawah, klik **Pages** (sidebar kiri)
4. Di bagian **Source**:
   - Pilih **"GitHub Actions"** (bukan "Deploy from a branch")
5. Klik **Save**

---

## ⏳ Tunggu Deploy

1. Klik tab **"Actions"** di repository
2. Anda akan melihat workflow **"Deploy to GitHub Pages"** berjalan
3. Tunggu sampai status hijau (✅) - biasanya 2-3 menit
4. Jika ada error, klik workflow untuk lihat detail

---

## 🌐 Akses Website

Setelah deploy selesai, website akan tersedia di:

**https://amarmahdin.github.io/Portofolio/**

---

## 🔄 Update Website (Setelah Deploy)

Setiap kali Anda mengubah code:

```bash
git add .
git commit -m "Update: deskripsi perubahan"
git push origin main
```

GitHub Actions akan otomatis rebuild dan redeploy! 🚀

---

## ✅ Checklist

- [x] Base path sudah benar: `/Portofolio/`
- [x] Repository sudah dibuat: `amarmahdin/Portofolio`
- [ ] Git sudah diinisialisasi
- [ ] Code sudah di-push ke GitHub
- [ ] GitHub Pages sudah diaktifkan
- [ ] Website sudah bisa diakses

---

## 🆘 Troubleshooting

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/amarmahdin/Portofolio.git
```

### Error: "Permission denied"
- Gunakan Personal Access Token sebagai password
- Atau setup SSH key

### Website Blank/404
- Pastikan base path di `vite.config.js` adalah `/Portofolio/`
- Tunggu 2-3 menit setelah deploy
- Hard refresh browser (Ctrl+F5)

---

**Selamat! Portfolio Anda akan segera online! 🎉**
