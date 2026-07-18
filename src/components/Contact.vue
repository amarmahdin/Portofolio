<template>
  <main class="contact flex-1 w-full md:min-h-0 md:min-h-screen md:h-screen bg-white dark:bg-black md:border-l border-gray-200 dark:border-gray-700 flex flex-col md:overflow-hidden transition-colors duration-500 ease-in-out">
    <header class="shrink-0 px-4 py-6 sm:px-6 md:px-8">
      <div class="flex justify-end mb-4">
        <LangToggle />
      </div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:text-4xl transition-colors duration-500 ease-in-out">{{ t.pageTitle }}</h1>
      <PageNav />
    </header>

    <div class="page-scroll px-4 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6 md:flex-1 md:min-h-0 md:px-8">
      <div class="max-w-5xl">
        <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-500 ease-in-out">
          {{ t.formTitle }}
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 transition-colors duration-500 ease-in-out">{{ t.formDesc }}</p>

        <form
          class="contact-form rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-black p-4 sm:p-6 mb-8 transition-colors duration-500 ease-in-out"
          novalidate
          @submit.prevent="handleSubmit"
        >
          <div v-if="!isEmailConfigured" class="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200">
            {{ t.formNotConfigured }}
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label for="contact-name" class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">{{ t.nameLabel }}</label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                autocomplete="name"
                class="contact-input"
                :placeholder="t.namePlaceholder"
                :disabled="isSubmitting"
              />
              <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
            </div>
            <div>
              <label for="contact-email" class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">{{ t.emailLabel }}</label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                class="contact-input"
                :placeholder="t.emailPlaceholder"
                :disabled="isSubmitting"
              />
              <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</p>
            </div>
          </div>

          <div class="mb-4">
            <label for="contact-subject" class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">{{ t.subjectLabel }}</label>
            <input
              id="contact-subject"
              v-model="form.subject"
              type="text"
              class="contact-input"
              :placeholder="t.subjectPlaceholder"
              :disabled="isSubmitting"
            />
            <p v-if="errors.subject" class="mt-1 text-xs text-red-500">{{ errors.subject }}</p>
          </div>

          <div class="mb-4">
            <label for="contact-message" class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">{{ t.messageLabel }}</label>
            <textarea
              id="contact-message"
              v-model="form.message"
              rows="5"
              class="contact-input resize-y min-h-[120px]"
              :placeholder="t.messagePlaceholder"
              :disabled="isSubmitting"
            />
            <p v-if="errors.message" class="mt-1 text-xs text-red-500">{{ errors.message }}</p>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              type="submit"
              class="contact-submit"
              :disabled="isSubmitting || !isEmailConfigured"
            >
              <span v-if="isSubmitting" class="inline-flex items-center gap-2">
                <svg class="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {{ t.sending }}
              </span>
              <span v-else>{{ t.sendBtn }}</span>
            </button>

            <p v-if="submitStatus === 'success'" class="text-sm text-green-600 dark:text-green-400">{{ t.successMsg }}</p>
            <p v-else-if="submitStatus === 'error'" class="text-sm text-red-500">{{ t.errorMsg }}</p>
          </div>
        </form>

        <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-500 ease-in-out">
          {{ t.sectionTitle }}
        </h2>

        <!-- Gmail card - full width -->
        <div
          class="contact-card block w-full rounded-xl border-2 border-gray-300 dark:border-gray-600 p-4 sm:p-5 mb-4 transition-all duration-300 hover:shadow-lg"
          :style="{ background: gradients.gmail }"
        >
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div class="flex-1">
              <h3 class="text-base font-bold text-white mb-1">{{ t.gmailTitle }}</h3>
              <p class="text-xs text-white/90">{{ t.gmailDesc }}</p>
              <a
                :href="gmailHref"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition-colors cursor-pointer"
              >
                {{ t.gmailBtn }}
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
            <div class="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
              <span class="contact-icon" v-html="icons.gmail"></span>
            </div>
          </div>
        </div>

        <!-- Instagram & TikTok row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div
            class="contact-card block rounded-xl border-2 border-gray-300 dark:border-gray-600 p-4 sm:p-5 transition-all duration-300 hover:shadow-lg"
            :style="{ background: gradients.instagram }"
          >
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div class="flex-1">
                <h3 class="text-base font-bold text-white mb-1">Instagram</h3>
                <p class="text-xs text-white/90">{{ t.instagramDesc }}</p>
                <a
                  href="https://www.instagram.com/amrmhdn_"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  {{ t.visitBtn }}
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>
              <div class="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
                <span class="contact-icon" v-html="icons.instagram"></span>
              </div>
            </div>
          </div>
          <div
            class="contact-card block rounded-xl border-2 border-gray-300 dark:border-gray-600 p-4 sm:p-5 transition-all duration-300 hover:shadow-lg"
            :style="{ background: gradients.tiktok }"
          >
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div class="flex-1">
                <h3 class="text-base font-bold text-white mb-1">TikTok</h3>
                <p class="text-xs text-white/90">{{ t.tiktokDesc }}</p>
                <a
                  href="https://www.tiktok.com/@blackswuit"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  {{ t.visitBtn }}
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>
              <div class="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
                <span class="contact-icon" v-html="icons.tiktok"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- LinkedIn & GitHub row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            class="contact-card block rounded-xl border-2 border-gray-300 dark:border-gray-600 p-4 sm:p-5 transition-all duration-300 hover:shadow-lg"
            :style="{ background: gradients.linkedin }"
          >
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div class="flex-1">
                <h3 class="text-base font-bold text-white mb-1">LinkedIn</h3>
                <p class="text-xs text-white/90">{{ t.linkedinDesc }}</p>
                <a
                  href="https://www.linkedin.com/in/muhammad-amar-mahdin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  {{ t.visitBtn }}
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>
              <div class="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
                <span class="contact-icon" v-html="icons.linkedin"></span>
              </div>
            </div>
          </div>
          <div
            class="contact-card block rounded-xl border-2 border-gray-300 dark:border-gray-600 p-4 sm:p-5 transition-all duration-300 hover:shadow-lg"
            :style="{ background: gradients.github }"
          >
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div class="flex-1">
                <h3 class="text-base font-bold text-white mb-1">GitHub</h3>
                <p class="text-xs text-white/90">{{ t.githubDesc }}</p>
                <a
                  href="https://github.com/amarmahdin"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  {{ t.visitBtn }}
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>
              <div class="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
                <span class="contact-icon" v-html="icons.github"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, inject, onMounted, reactive } from 'vue'
import emailjs from '@emailjs/browser'
import PageNav from './PageNav.vue'
import LangToggle from './LangToggle.vue'
import { getIconSvgByKey } from '@/utils/simpleIcons'

const lang = inject('lang')

const email = 'amarmahdin01@gmail.com'
const gmailHref = computed(() => `mailto:${email}`)

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const isEmailConfigured = computed(() =>
  Boolean(serviceId && templateId && publicKey)
)

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)
const submitStatus = ref(null)

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validateForm = () => {
  errors.name = ''
  errors.email = ''
  errors.subject = ''
  errors.message = ''

  if (!form.name.trim()) {
    errors.name = lang.value === 'id' ? 'Nama wajib diisi.' : 'Name is required.'
  } else if (form.name.trim().length < 2) {
    errors.name = lang.value === 'id' ? 'Nama minimal 2 karakter.' : 'Name must be at least 2 characters.'
  }

  if (!form.email.trim()) {
    errors.email = lang.value === 'id' ? 'Email wajib diisi.' : 'Email is required.'
  } else if (!emailPattern.test(form.email.trim())) {
    errors.email = lang.value === 'id' ? 'Format email tidak valid.' : 'Invalid email format.'
  }

  if (!form.subject.trim()) {
    errors.subject = lang.value === 'id' ? 'Subjek wajib diisi.' : 'Subject is required.'
  }

  if (!form.message.trim()) {
    errors.message = lang.value === 'id' ? 'Pesan wajib diisi.' : 'Message is required.'
  } else if (form.message.trim().length < 10) {
    errors.message = lang.value === 'id' ? 'Pesan minimal 10 karakter.' : 'Message must be at least 10 characters.'
  }

  return !errors.name && !errors.email && !errors.subject && !errors.message
}

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
}

const handleSubmit = async () => {
  submitStatus.value = null
  if (!validateForm() || !isEmailConfigured.value) return

  isSubmitting.value = true

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        name: form.name.trim(),
        email: form.email.trim(),
        title: form.subject.trim(),
        message: form.message.trim(),
      },
      { publicKey }
    )

    submitStatus.value = 'success'
    resetForm()
  } catch {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

const gradients = {
  gmail: 'linear-gradient(135deg, #EA4335 0%, #D33426 50%, #BB2A1E 100%)',
  instagram: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
  tiktok: 'linear-gradient(135deg, #000000 0%, #2d2d2d 50%, #1a1a1a 100%)',
  linkedin: 'linear-gradient(135deg, #0A66C2 0%, #004182 50%, #003366 100%)',
  github: 'linear-gradient(135deg, #2d333b 0%, #181717 50%, #0d1117 100%)'
}

const icons = ref({
  gmail: '',
  instagram: '',
  tiktok: '',
  linkedin: '',
  github: ''
})

const getIconSVG = (iconKey, fillColor = '#ffffff') => {
  return getIconSvgByKey(iconKey, {
    color: fillColor,
    className: 'w-10 h-10 sm:w-12 sm:h-12',
  })
}

onMounted(() => {
  icons.value = {
    gmail: getIconSVG('siGmail'),
    instagram: getIconSVG('siInstagram'),
    tiktok: getIconSVG('siTiktok'),
    linkedin: getIconSVG('siLinkedin'),
    github: getIconSVG('siGithub'),
  }
})

const translations = {
  id: {
    pageTitle: 'Kontak',
    formTitle: 'Kirim Pesan',
    formDesc: 'Isi form di bawah — pesan akan langsung masuk ke email saya.',
    formNotConfigured: 'Form email belum dikonfigurasi. Salin .env.example ke .env lalu isi kredensial EmailJS.',
    nameLabel: 'Nama',
    namePlaceholder: 'Nama lengkap Anda',
    emailLabel: 'Email',
    emailPlaceholder: 'email@example.com',
    subjectLabel: 'Subjek',
    subjectPlaceholder: 'Topik pesan',
    messageLabel: 'Pesan',
    messagePlaceholder: 'Tulis pesan Anda di sini...',
    sendBtn: 'Kirim Pesan',
    sending: 'Mengirim...',
    successMsg: 'Pesan berhasil dikirim. Terima kasih!',
    errorMsg: 'Gagal mengirim pesan. Silakan coba lagi atau gunakan Gmail.',
    sectionTitle: 'Temukan saya di media sosial',
    gmailTitle: 'Stay In Touch',
    gmailDesc: 'Hubungi via email untuk pertanyaan atau kolaborasi.',
    gmailBtn: 'Buka Gmail',
    instagramDesc: 'Ikuti untuk update dan keseharian saya.',
    tiktokDesc: 'Mari terhubung melalui konten kreatif.',
    linkedinDesc: 'Terhubung untuk peluang profesional.',
    githubDesc: 'Lihat proyek dan kode saya.',
    visitBtn: 'Kunjungi'
  },
  en: {
    pageTitle: 'Contact',
    formTitle: 'Send a Message',
    formDesc: 'Fill out the form below — your message will go directly to my inbox.',
    formNotConfigured: 'Email form is not configured yet. Copy .env.example to .env and add your EmailJS credentials.',
    nameLabel: 'Name',
    namePlaceholder: 'Your full name',
    emailLabel: 'Email',
    emailPlaceholder: 'email@example.com',
    subjectLabel: 'Subject',
    subjectPlaceholder: 'Message subject',
    messageLabel: 'Message',
    messagePlaceholder: 'Write your message here...',
    sendBtn: 'Send Message',
    sending: 'Sending...',
    successMsg: 'Message sent successfully. Thank you!',
    errorMsg: 'Failed to send message. Please try again or use Gmail.',
    sectionTitle: 'Find me on social media',
    gmailTitle: 'Stay In Touch',
    gmailDesc: 'Reach out via email for inquiries or collaborations.',
    gmailBtn: 'Go to Gmail',
    instagramDesc: 'Follow for updates and daily life.',
    tiktokDesc: 'Let\'s connect through creative content.',
    linkedinDesc: 'Connect for professional opportunities.',
    githubDesc: 'Check out my projects and code.',
    visitBtn: 'Visit'
  }
}

const t = computed(() => translations[lang.value] || translations.en)
</script>

<style scoped>
.contact-form {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}
:global(.dark) .contact-form {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.contact-input {
  width: 100%;
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  border: 2px solid #d1d5db;
  background: #fff;
  color: #111827;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.contact-input:focus {
  outline: none;
  border-color: #16a34a;
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.15);
}
.contact-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
:global(.dark) .contact-input {
  border-color: #4b5563;
  background: #000;
  color: #f3f4f6;
}
:global(.dark) .contact-input:focus {
  border-color: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15);
}

.contact-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  box-shadow: 0 2px 8px rgba(22, 163, 74, 0.35);
  transition: all 0.2s ease;
}
.contact-submit:hover:not(:disabled) {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  box-shadow: 0 4px 12px rgba(22, 163, 74, 0.45);
}
.contact-submit:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.contact-card a {
  text-decoration: none;
}

.contact-icon :deep(svg) {
  width: 1.75rem;
  height: 1.75rem;
}
@media (min-width: 640px) {
  .contact-icon :deep(svg) {
    width: 2rem;
    height: 2rem;
  }
}
</style>
