<template>
  <main class="achievements flex-1 min-h-0 w-full md:min-h-screen md:h-screen bg-white dark:bg-black md:border-l border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden transition-colors duration-500 ease-in-out">
    <header class="shrink-0 px-4 py-6 sm:px-6 md:px-8">
      <div class="flex justify-end mb-4">
        <LangToggle />
      </div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:text-4xl transition-colors duration-500 ease-in-out">{{ t.pageTitle }}</h1>
      <PageNav />
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
          class="image-modal fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          @click.self="closePopup"
          @touchmove.prevent
        >
          <button
            type="button"
            class="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors touch-manipulation"
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
            class="max-w-full max-h-[85dvh] w-auto h-auto object-contain rounded-lg shadow-2xl"
            @click.stop
          />
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import PageNav from './PageNav.vue'
import LangToggle from './LangToggle.vue'
import { useModalScrollLock } from '@/composables/useModalScrollLock'
import mcfImg from '../assets/mcf.webp'
import mosImg from '../assets/mos.webp'
import msibImg from '../assets/msib.webp'
import dicodingImg from '../assets/dicoding.webp'
import babaImg from '../assets/baba.webp'
import sicenceImg from '../assets/sicence.webp'

const lang = inject('lang')
const searchQuery = ref('')
const popupImage = ref(null)

const isPopupOpen = computed(() => Boolean(popupImage.value))
useModalScrollLock(isPopupOpen)

const openPopup = (src) => { popupImage.value = src }
const closePopup = () => { popupImage.value = null }

const achievements = [
  { title: 'Azure AI Fundamentals', certificate: 'Microsoft', issuedDate: 'Sept 2025', image: mcfImg },
  { title: 'Word 2019 Specialist', certificate: 'Microsoft', issuedDate: 'Apr 2025', image: mosImg },
  { title: 'Study Independent', certificate: 'Kampus Merdeka', issuedDate: 'Jul 2024', image: msibImg },
  { title: 'R Fundamental for Data Science', certificate: 'DQLab', issuedDate: 'Jul 2023', image: sicenceImg },
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
