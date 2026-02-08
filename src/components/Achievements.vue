<template>
  <main class="achievements flex-1 min-h-screen h-screen bg-white dark:bg-black border-l border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden transition-colors duration-500 ease-in-out">
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
        <a href="#" class="nav-link nav-link-active text-sm font-medium">{{ t.navAchievements }}</a>
        <a href="#" class="nav-link text-sm font-medium" @click.prevent="setPage('projects')">{{ t.navProjects }}</a>
        <a href="#" class="nav-link text-sm font-medium" @click.prevent="setPage('contact')">{{ t.navContact }}</a>
      </nav>
    </header>

    <div class="flex-1 min-h-0 overflow-y-auto px-4 pb-8 sm:px-6 md:px-8">
      <div class="max-w-5xl">
        <div class="flex flex-wrap items-center gap-4 mb-4">
          <div class="relative w-48 sm:w-56">
            <span class="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="t.searchPlaceholder"
              class="w-full pl-8 pr-3 py-2 text-sm rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-green-500/30 focus:border-green-500 shadow-sm dark:shadow-none transition-colors duration-500 ease-in-out"
            />
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-500 ease-in-out">{{ t.total }} : {{ filteredAchievements.length }}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mt-8 sm:mt-10">
          <div
            v-for="(item, index) in filteredAchievements"
            :key="index"
            class="achievement-card rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-black overflow-hidden transition-colors duration-500 ease-in-out"
          >
            <div v-if="item.image" class="w-full border-b-2 border-gray-300 dark:border-gray-600 cursor-pointer" @click="openPopup(item.image)">
              <img :src="item.image" :alt="item.title" class="w-full h-auto block object-contain hover:opacity-95 transition-opacity" />
            </div>
            <div v-else class="w-full h-40 border-b-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-black" />
            <div class="p-4">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-500 ease-in-out">{{ item.title }}</h3>
              <p v-if="item.batch" class="text-sm text-gray-600 dark:text-gray-400 mb-0.5 transition-colors duration-500 ease-in-out">{{ item.batch }}</p>
              <p v-if="item.domain" class="text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-500 ease-in-out">{{ item.domain }}</p>
              <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 transition-colors duration-500 ease-in-out">{{ item.certificate }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-500 mb-0.5 transition-colors duration-500 ease-in-out">{{ t.issuedOn }}</p>
              <p class="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-500 ease-in-out">{{ item.issuedDate }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="popup">
        <div
          v-if="popupImage"
          class="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex items-start sm:items-center justify-center pt-16 sm:pt-4 pb-4 px-4"
          @click.self="closePopup"
        >
          <button
            type="button"
            class="fixed top-3 right-3 sm:top-4 sm:right-4 z-10 min-w-[44px] min-h-[44px] w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors touch-manipulation"
            aria-label="Close"
            @click="closePopup"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            :src="popupImage"
            alt="Certificate"
            class="max-w-[95vw] sm:max-w-2xl max-h-[calc(100dvh-5rem)] sm:max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl shrink-0"
            @click.stop
          />
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import mcfImg from '../assets/mcf.png'
import mosImg from '../assets/mos.png'
import msibImg from '../assets/msib.png'
import dicodingImg from '../assets/dicoding.png'
import babaImg from '../assets/baba.png'

const lang = ref('en')
const setPage = inject('setPage')
const searchQuery = ref('')
const popupImage = ref(null)

const openPopup = (src) => { popupImage.value = src }
const closePopup = () => { popupImage.value = null }

const achievements = [
  { title: 'Azure AI Fundamentals', certificate: 'Microsoft', issuedDate: 'Sept 2025', image: mcfImg },
  { title: 'Word 2019 Specialist', certificate: 'Microsoft', issuedDate: 'Apr 2025', image: mosImg },
  { title: 'Study Independent', certificate: 'Kampus Merdeka', issuedDate: 'Jul 2024', image: msibImg },
  { title: 'Belajar Dasar Pemrograman Web', certificate: 'dicoding', issuedDate: 'Jun 2020', image: dicodingImg },
  { title: 'HTML and CSS', certificate: 'babastudio', issuedDate: 'Nov 2019', image: babaImg }
]

const filteredAchievements = computed(() => {
  if (!searchQuery.value.trim()) return achievements
  const q = searchQuery.value.toLowerCase()
  return achievements.filter(a =>
    a.title.toLowerCase().includes(q) ||
    (a.batch || '').toLowerCase().includes(q) ||
    (a.domain || '').toLowerCase().includes(q) ||
    a.certificate.toLowerCase().includes(q) ||
    a.issuedDate.toLowerCase().includes(q)
  )
})

const translations = {
  id: {
    pageTitle: 'Prestasi',
    navHome: 'Beranda',
    navAbout: 'Tentang Saya',
    navAchievements: 'Prestasi',
    navProjects: 'Proyek Saya',
    navContact: 'Kontak',
    searchPlaceholder: 'Cari..',
    total: 'Total',
    issuedOn: 'Diterbitkan pada'
  },
  en: {
    pageTitle: 'Achievements',
    navHome: 'Home',
    navAbout: 'Aboutme',
    navAchievements: 'Achievements',
    navProjects: 'My Projects',
    navContact: 'Contact',
    searchPlaceholder: 'Search..',
    total: 'Total',
    issuedOn: 'Issued on'
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

.achievement-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06);
}
:global(.dark) .achievement-card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.2s ease;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}
</style>
