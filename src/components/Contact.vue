<template>
  <main class="contact flex-1 min-h-0 w-full md:min-h-screen md:h-screen bg-white dark:bg-black md:border-l border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden transition-colors duration-500 ease-in-out">
    <header class="shrink-0 px-4 py-6 sm:px-6 md:px-8">
      <div class="flex justify-end mb-4">
        <LangToggle />
      </div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:text-4xl transition-colors duration-500 ease-in-out">{{ t.pageTitle }}</h1>
      <PageNav />
    </header>

    <div class="flex-1 min-h-0 overflow-y-auto px-4 pb-8 sm:px-6 md:px-8">
      <div class="max-w-5xl">
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
import { ref, computed, inject, onMounted } from 'vue'
import PageNav from './PageNav.vue'
import LangToggle from './LangToggle.vue'
import { getIconSvgByKey } from '@/utils/simpleIcons'

const lang = inject('lang')

const email = 'amarmahdin01@gmail.com'

const gmailHref = computed(() => `mailto:${email}`)

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
    navHome: 'Beranda',
    navAbout: 'Tentang Saya',
    navAchievements: 'Prestasi',
    navProjects: 'Proyek Saya',
    navContact: 'Kontak',
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
    navHome: 'Home',
    navAbout: 'Aboutme',
    navAchievements: 'Achievements',
    navProjects: 'My Projects',
    navContact: 'Contact',
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
