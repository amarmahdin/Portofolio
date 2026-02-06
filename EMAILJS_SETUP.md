# EmailJS Setup Guide

Form contact sudah terintegrasi dengan EmailJS untuk mengirim email ke Gmail Anda. Ikuti langkah-langkah berikut untuk setup:

## Langkah 1: Buat Akun EmailJS

1. Kunjungi [https://www.emailjs.com/](https://www.emailjs.com/)
2. Daftar akun gratis (Free tier: 200 email/bulan)
3. Login ke dashboard

## Langkah 2: Setup Email Service

1. Di dashboard, klik **Email Services**
2. Klik **Add New Service**
3. Pilih **Gmail** sebagai email service
4. Login dengan Gmail Anda (amarmahdin01@gmail.com)
5. Authorize EmailJS untuk mengakses Gmail
6. **Copy Service ID** yang diberikan (contoh: `service_xxxxx`)

## Langkah 3: Buat Email Template

1. Di dashboard, klik **Email Templates**
2. Klik **Create New Template**
3. Gunakan template berikut:

**Subject:**
```
New Contact Form Message from {{from_name}}
```

**Content:**
```
You have a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

4. **Copy Template ID** yang diberikan (contoh: `template_xxxxx`)

## Langkah 4: Dapatkan Public Key

1. Di dashboard, klik **Account** → **General**
2. **Copy Public Key** (contoh: `xxxxxxxxxxxxx`)

## Langkah 5: Update Kode

Buka file `src/components/Contact.vue` dan ganti nilai berikut:

```javascript
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY' // Ganti dengan Public Key Anda
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID' // Ganti dengan Service ID Anda
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID' // Ganti dengan Template ID Anda
```

## Testing

1. Jalankan website: `npm run dev`
2. Isi form contact
3. Klik "Send Message"
4. Cek inbox Gmail Anda (amarmahdin01@gmail.com)

## Catatan Penting

- **Free tier EmailJS**: 200 email per bulan
- Email akan masuk ke Gmail yang Anda daftarkan di Email Service
- Pastikan semua ID sudah benar sebelum testing
- Jika ada error, cek console browser untuk detail error

## Troubleshooting

- **Error "Invalid Public Key"**: Pastikan Public Key sudah benar
- **Error "Service not found"**: Pastikan Service ID sudah benar
- **Error "Template not found"**: Pastikan Template ID sudah benar
- **Email tidak masuk**: Cek spam folder atau pastikan Gmail service sudah terhubung dengan benar

---

**Alternatif**: Jika tidak ingin menggunakan EmailJS, Anda bisa menggunakan:
- Backend API (Node.js + Nodemailer)
- Formspree (alternatif service)
- Netlify Forms (jika deploy di Netlify)
