<template>
  <main class="contact flex-1 min-h-screen h-screen bg-white dark:bg-black border-l border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden transition-colors duration-500 ease-in-out">
    <header class="shrink-0 px-4 py-6 sm:px-6 md:px-8">
      <div class="flex justify-end mb-4">
        <div class="lang-toggle inline-flex rounded-full p-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-sm transition-colors duration-500 ease-in-out" role="group" aria-label="Choose language">
          <button type="button" class="lang-btn cursor-pointer" :class="{ 'lang-btn-active': lang === 'id' }" @click="lang = 'id'" title="Indonesia">Id</button>
          <button type="button" class="lang-btn cursor-pointer" :class="{ 'lang-btn-active': lang === 'en' }" @click="lang = 'en'" title="English">Eng</button>
        </div>
      </div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:text-4xl transition-colors duration-500 ease-in-out">{{ t.pageTitle }}</h1>
      <nav class="flex flex-wrap gap-4 sm:gap-6 border-b border-gray-200 dark:border-gray-700 pb-3 transition-colors duration-500 ease-in-out">
        <a href="#" class="nav-link text-sm font-medium" @click.prevent="setPage('home')">{{ t.navHome }}</a>
        <a href="#" class="nav-link text-sm font-medium" @click.prevent="setPage('aboutme')">{{ t.navAbout }}</a>
        <a href="#" class="nav-link text-sm font-medium" @click.prevent="setPage('achievements')">{{ t.navAchievements }}</a>
        <a href="#" class="nav-link text-sm font-medium" @click.prevent="setPage('projects')">{{ t.navProjects }}</a>
        <a href="#" class="nav-link nav-link-active text-sm font-medium">{{ t.navContact }}</a>
      </nav>
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
                  href="https://www.linkedin.com/in/muhammad-amar-mahdin-st-mos-mcf-962b9a2a0"
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
import * as simpleIcons from 'simple-icons'

const lang = ref('en')
const setPage = inject('setPage')

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
  try {
    const icon = simpleIcons[iconKey]
    if (!icon?.path) return ''
    return `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 sm:w-12 sm:h-12"><path fill="${fillColor}" d="${icon.path}"/></svg>`
  } catch (e) { return '' }
}

const linkedinSvg = '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 sm:w-12 sm:h-12"><path fill="#ffffff" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>'

onMounted(() => {
  icons.value = {
    gmail: getIconSVG('siGmail'),
    instagram: getIconSVG('siInstagram'),
    tiktok: getIconSVG('siTiktok'),
    linkedin: getIconSVG('siLinkedin') || linkedinSvg,
    github: getIconSVG('siGithub')
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
.lang-toggle {
  transition: box-shadow 0.2s ease, background-color 0.5s ease, border-color 0.5s ease;
}
.lang-toggle:hover {
  box-shadow: 0 2px 8px rgba(20, 83, 45, 0.15);
}
.lang-btn {
  padding: 0.25rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #6b7280;
  background: transparent;
}
.lang-btn:hover {
  color: #374151;
}
.lang-btn-active {
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(22, 163, 74, 0.4);
}
.lang-btn-active:hover {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  box-shadow: 0 4px 12px rgba(22, 163, 74, 0.5);
}

.nav-link {
  color: #6b7280;
  transition: color 0.25s ease;
}
.nav-link:hover {
  color: #374151;
}
:global(.dark) .nav-link {
  color: #9ca3af;
}
:global(.dark) .nav-link:hover {
  color: #e5e7eb;
}
.nav-link-active {
  color: #16a34a;
  border-bottom: 2px solid #16a34a;
  padding-bottom: 0.25rem;
  margin-bottom: -0.375rem;
}
:global(.dark) .nav-link-active {
  color: #22c55e;
  border-bottom-color: #22c55e;
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
