<template>
  <main class="projects flex-1 min-h-screen h-screen bg-white dark:bg-black border-l border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden transition-colors duration-500 ease-in-out">
    <header class="shrink-0 px-4 py-6 sm:px-6 md:px-8">
      <div class="flex justify-end mb-4">
        <LangToggle />
      </div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:text-4xl transition-colors duration-500 ease-in-out">{{ t.pageTitle }}</h1>
      <PageNav />
    </header>

    <div class="flex-1 min-h-0 overflow-y-auto px-4 pb-8 sm:px-6 md:px-8">
      <div class="max-w-5xl">
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-500 ease-in-out">{{ t.total }} : {{ filteredProjects.length }}</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mt-6 sm:mt-8">
          <div
            v-for="(item, index) in filteredProjects"
            :key="index"
            class="project-card rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-black overflow-visible transition-colors duration-500 ease-in-out"
          >
            <div
              class="aspect-video bg-gray-100 dark:bg-gray-900 border-b-2 border-gray-300 dark:border-gray-600 overflow-hidden"
              :class="{ 'cursor-pointer': item.carouselImages?.length }"
              @click="item.carouselImages?.length && openCarousel(index)"
            >
              <img v-if="item.image" :src="item.image" :alt="item.title" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">{{ t.noImage }}</div>
            </div>
            <div class="p-4">
              <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-500 ease-in-out">{{ item.title }}</h3>
              <button
                type="button"
                class="text-left w-full text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 transition-colors duration-500 ease-in-out hover:text-green-600 dark:hover:text-green-400 cursor-pointer"
                :title="getProjectDescription(item)"
                @click="openDescriptionPopup(index)"
              >
                {{ getProjectDescription(item) }}
              </button>
              <div class="flex flex-wrap gap-2 overflow-visible">
                <div
                  v-for="(tech, i) in getTechIcons(item.techStack)"
                  :key="i"
                  class="project-tech-item group relative flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 p-2 transition-all duration-300 cursor-default overflow-visible"
                  :data-tooltip="tech.name"
                >
                  <span class="project-tech-icon shrink-0" v-html="tech.icon" :style="{ color: tech.color }"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="popup">
        <div
          v-if="carouselOpen"
          class="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex items-start sm:items-center justify-center pt-16 sm:pt-4 pb-16 sm:pb-4 px-4"
          @click.self="closeCarousel"
        >
          <button
            type="button"
            class="fixed top-3 right-3 sm:top-4 sm:right-4 z-10 min-w-[44px] min-h-[44px] w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors touch-manipulation"
            aria-label="Close"
            @click="closeCarousel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="relative flex items-center gap-2 sm:gap-4 max-w-[95vw] sm:max-w-4xl" @click.stop>
            <button
              type="button"
              class="shrink-0 min-w-[44px] min-h-[44px] w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors touch-manipulation"
              aria-label="Previous"
              @click="carouselPrev"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <img v-if="carouselImages.length" :src="carouselImages[carouselIndex]" alt="Project screenshot" class="max-w-[75vw] sm:max-w-2xl max-h-[calc(100dvh-6rem)] sm:max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl shrink-0" />
            <button
              type="button"
              class="shrink-0 min-w-[44px] min-h-[44px] w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors touch-manipulation"
              aria-label="Next"
              @click="carouselNext"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <p class="fixed bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/80 z-10">{{ carouselIndex + 1 }} / {{ carouselImages.length }}</p>
        </div>
      </Transition>
    </Teleport>

    <Teleport to="body">
      <Transition name="popup">
        <div
          v-if="descriptionPopupOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          @click.self="closeDescriptionPopup"
        >
          <div
            v-if="descriptionPopupProject"
            class="max-w-[95vw] sm:max-w-lg w-full bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-2xl border border-gray-200 dark:border-gray-600 mx-2 sm:mx-0"
            @click.stop
          >
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ descriptionPopupProject.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{{ getProjectDescription(descriptionPopupProject) }}</p>
            <button
              type="button"
              class="w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors"
              @click="closeDescriptionPopup"
            >
              {{ t.close }}
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<script setup>
import { ref, computed, inject, onMounted, onUnmounted } from 'vue'
import PageNav from './PageNav.vue'
import LangToggle from './LangToggle.vue'
import { getSimpleIcon, getIconSvgByKey } from '@/utils/simpleIcons'
import S1 from '../assets/S1.webp'
import S2 from '../assets/S2.webp'
import S3 from '../assets/S3.webp'
import S4 from '../assets/S4.webp'
import S5 from '../assets/S5.webp'
import S6 from '../assets/S6.webp'
import S7 from '../assets/S7.webp'
import S8 from '../assets/S8.webp'
import S9 from '../assets/S9.webp'
import SH1 from '../assets/SH1.webp'
import SH2 from '../assets/SH2.webp'
import D1 from '../assets/D1.webp'
import D2 from '../assets/D2.webp'
import D3 from '../assets/D3.webp'
import D4 from '../assets/D4.webp'
import D5 from '../assets/D5.webp'
import D6 from '../assets/D6.webp'
import D7 from '../assets/D7.webp'
import D8 from '../assets/D8.webp'
import O1 from '../assets/O1.webp'
import O2 from '../assets/O2.webp'
import O3 from '../assets/O3.webp'
import O4 from '../assets/O4.webp'
import O5 from '../assets/O5.webp'
import O6 from '../assets/O6.webp'
import O7 from '../assets/O7.webp'
import O8 from '../assets/O8.webp'
import O9 from '../assets/O9.webp'
import O10 from '../assets/O10.webp'
import A1 from '../assets/A1.webp'
import A2 from '../assets/A2.webp'
import A3 from '../assets/A3.webp'
import A4 from '../assets/A4.webp'
import A5 from '../assets/A5.webp'
import A6 from '../assets/A6.webp'
import A7 from '../assets/A7.webp'
import A8 from '../assets/A8.webp'
import T1 from '../assets/T1.webp'
import T2 from '../assets/T2.webp'
import T3 from '../assets/T3.webp'
import T4 from '../assets/T4.webp'
import T5 from '../assets/T5.webp'
import T6 from '../assets/T6.webp'
import T7 from '../assets/T7.webp'
import T8 from '../assets/T8.webp'

const lang = inject('lang')
const carouselOpen = ref(false)
const carouselIndex = ref(0)
const carouselImages = ref([])
const descriptionPopupOpen = ref(false)
const descriptionPopupProject = ref(null)

const tirtarimbaCarouselImages = [T1, T2, T3, T4, T5, T6, T7, T8]
const simasetCarouselImages = [S1, S2, S3, S4, S5, S6, S7, S8, S9, SH1, SH2]
const diamondCarouselImages = [D1, D2, D3, D4, D5, D6, D7, D8]
const oasisCarouselImages = [O1, O2, O3, O4, O5, O6, O7, O8, O9, O10]
const aspalCarouselImages = [A1, A2, A3, A4, A5, A6, A7, A8]

const techIconMap = {
  react: { key: 'siReact', color: '#61DAFB', displayName: 'React.js' },
  tailwindcss: { key: 'siTailwindcss', color: '#06B6D4' },
  express: { key: 'siExpress', color: '#000000', displayName: 'Express.js' },
  nodedotjs: { key: 'siNodedotjs', color: '#339933', displayName: 'Node.js' },
  mysql: { key: 'siMysql', color: '#4479A1' },
  vuedotjs: { key: 'siVuedotjs', color: '#4FC08D', displayName: 'Vue.js' },
  laravel: { key: 'siLaravel', color: '#FF2D20' },
  flutter: { key: 'siFlutter', color: '#02569B' },
  php: { key: 'siPhp', color: '#777BB4' },
  html5: { key: 'siHtml5', color: '#E34F26', displayName: 'HTML5' },
  css: { key: 'siCss', color: '#1572B6', displayName: 'CSS' },
  javascript: { key: 'siJavascript', color: '#F7DF1E', displayName: 'JavaScript' }
}

const projectDescriptions = {
  tirtarimba: {
    en: 'TIRTARIMBA Network Center is a modern web application designed for water distribution control centers at utility companies. Through a single, consistent, and responsive interface, the application provides a comprehensive overview of network conditions, including distribution pipeline performance, field devices and assets, customer profiles, billing status, as well as system activity and user roles.',
    id: 'TIRTARIMBA Network Center adalah aplikasi web modern yang dirancang untuk pusat kendali distribusi air di perusahaan utilitas. Melalui satu antarmuka yang konsisten dan responsif, aplikasi ini memberikan gambaran menyeluruh mengenai kondisi jaringan, termasuk performa pipa distribusi, perangkat dan aset lapangan, profil pelanggan, status penagihan, serta aktivitas sistem dan peran pengguna.'
  },
  simaset: {
    en: 'SIMASET is an Integrated Asset Management System for efficient management of company assets. Built with React.js for the frontend and Express.js for the backend, this system provides comprehensive employee input, asset vehicle, reimbursement and maintenance scheduling, and reporting features.',
    id: 'SIMASET adalah Sistem Manajemen Aset Terintegrasi untuk pengelolaan aset perusahaan secara efisien. Dibangun dengan React.js untuk frontend dan Express.js untuk backend, sistem ini menyediakan fitur input karyawan, aset kendaraan, reimburse dan penjadwalan perawatan, serta laporan yang komprehensif.'
  },
  diamond: {
    en: 'Diamond is a modern web application designed to digitize and streamline the business cooperation lifecycle. The system facilitates the entire workflow from drafting, submission, to approval of MoU (Memorandum of Understanding) and PKS (Cooperation Agreement) documents in a centralized and transparent manner.',
    id: 'Diamond adalah aplikasi web modern yang dirancang untuk mendigitalisasi dan menyederhanakan siklus kerja sama bisnis. Sistem memfasilitasi seluruh alur kerja dari penyusunan, pengajuan, hingga persetujuan dokumen MoU (Memorandum of Understanding) dan PKS (Perjanjian Kerja Sama) secara terpusat dan transparan.'
  },
  oasis: {
    en: 'Oasis Destinations is a full-stack web-based tourism platform designed to help users explore and book natural tourism destinations such as beaches, mountains, and waterfalls. The application also features a comprehensive admin panel for content and user management.',
    id: 'Oasis Destinations adalah platform pariwisata berbasis web full-stack yang dirancang untuk membantu pengguna menjelajahi dan memesan destinasi wisata alam seperti pantai, gunung, dan air terjun. Aplikasi ini juga dilengkapi panel admin komprehensif untuk manajemen konten dan pengguna.'
  },
  aspal: {
    en: 'AspalKita is a web-based platform designed to facilitate community participation in reporting road infrastructure damage in real-time. The application bridges communication between citizens and local government to accelerate repair processes and improve regional development transparency.',
    id: 'AspalKita adalah platform berbasis web yang dirancang untuk memfasilitasi partisipasi masyarakat dalam melaporkan kerusakan infrastruktur jalan secara real-time. Aplikasi ini menjembatani komunikasi antara warga dan pemerintah daerah untuk mempercepat proses perbaikan dan meningkatkan transparansi pembangunan daerah.'
  }
}

const projects = [
  { title: 'TIRTARIMBA Network Center', descriptionKey: 'tirtarimba', image: T1, techStack: ['vuedotjs', 'tailwindcss', 'express', 'nodedotjs', 'mysql'], carouselImages: tirtarimbaCarouselImages },
  { title: 'SIMASET', descriptionKey: 'simaset', image: S1, techStack: ['react', 'tailwindcss', 'express', 'nodedotjs', 'mysql', 'flutter'], carouselImages: simasetCarouselImages },
  { title: 'DIAMOND', descriptionKey: 'diamond', image: D1, techStack: ['vuedotjs', 'tailwindcss'], carouselImages: diamondCarouselImages },
  { title: 'OASIS DESTINATION', descriptionKey: 'oasis', image: O1, techStack: ['react', 'tailwindcss', 'express'], carouselImages: oasisCarouselImages },
  { title: 'AspalKita', descriptionKey: 'aspal', image: A1, techStack: ['html5', 'css', 'javascript'], carouselImages: aspalCarouselImages }
]

const getIconSVG = (iconKey, brandColor) => {
  return getIconSvgByKey(iconKey, { color: brandColor, className: 'project-tech-svg' })
}

const getTechIcons = (techStack) => {
  if (!techStack?.length) return []
  return techStack.map(id => {
    const cfg = techIconMap[id]
    if (!cfg) return null
    const icon = getSimpleIcon(cfg.key)
    const name = cfg.displayName || icon?.title || id
    return { name, icon: getIconSVG(cfg.key, cfg.color), color: cfg.color }
  }).filter(Boolean)
}

const openDescriptionPopup = (index) => {
  descriptionPopupProject.value = filteredProjects.value[index]
  descriptionPopupOpen.value = true
}
const closeDescriptionPopup = () => {
  descriptionPopupOpen.value = false
  descriptionPopupProject.value = null
}

const filteredProjects = computed(() => projects)

const getProjectDescription = (item) => {
  if (item.descriptionKey && projectDescriptions[item.descriptionKey]) {
    return projectDescriptions[item.descriptionKey][lang.value] || projectDescriptions[item.descriptionKey].en
  }
  return item.description || ''
}

const openCarousel = (index) => {
  const project = filteredProjects.value[index]
  if (project?.carouselImages?.length) {
    carouselImages.value = project.carouselImages
    carouselIndex.value = 0
    carouselOpen.value = true
  }
}
const closeCarousel = () => { carouselOpen.value = false }
const carouselPrev = () => {
  carouselIndex.value = carouselIndex.value === 0 ? carouselImages.value.length - 1 : carouselIndex.value - 1
}
const carouselNext = () => {
  carouselIndex.value = carouselIndex.value === carouselImages.value.length - 1 ? 0 : carouselIndex.value + 1
}

const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    if (descriptionPopupOpen.value) closeDescriptionPopup()
    else if (carouselOpen.value) closeCarousel()
  }
  if (carouselOpen.value) {
    if (e.key === 'ArrowLeft') carouselPrev()
    if (e.key === 'ArrowRight') carouselNext()
  }
}
onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

const translations = {
  id: {
    pageTitle: 'Proyek Saya',
    navHome: 'Beranda',
    navAbout: 'Tentang Saya',
    navAchievements: 'Prestasi',
    navProjects: 'Proyek Saya',
    navContact: 'Kontak',
    total: 'Total',
    noImage: 'Gambar tidak tersedia',
    close: 'Tutup'
  },
  en: {
    pageTitle: 'My Projects',
    navHome: 'Home',
    navAbout: 'Aboutme',
    navAchievements: 'Achievements',
    navProjects: 'My Projects',
    navContact: 'Contact',
    total: 'Total',
    noImage: 'No image',
    close: 'Close'
  }
}

const t = computed(() => translations[lang.value] || translations.en)
</script>

<style scoped>
.project-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06);
}
:global(.dark) .project-card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-tech-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.project-tech-icon :deep(.project-tech-svg),
.project-tech-icon :deep(svg) {
  width: 22px;
  height: 22px;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.project-tech-item:hover .project-tech-icon :deep(svg) {
  transform: scale(1.15);
}
.project-tech-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(20, 83, 45, 0.15);
  background-color: rgb(240 253 244);
}
:global(.dark) .project-tech-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
  background-color: rgb(31 41 55);
}
.project-tech-item::after {
  content: attr(data-tooltip);
  position: absolute;
  top: -2rem;
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  padding: 0.25rem 0.5rem;
  background: #374151;
  color: white;
  font-size: 0.7rem;
  font-weight: 500;
  white-space: nowrap;
  border-radius: 0.25rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 50;
}
:global(.dark) .project-tech-item::after {
  background: #1f2937;
  color: #f3f4f6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}
.project-tech-item::before {
  content: '';
  position: absolute;
  top: -0.35rem;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: #374151;
  border-bottom: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 50;
}
:global(.dark) .project-tech-item::before {
  border-top-color: #1f2937;
}
.project-tech-item:hover::after {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
.project-tech-item:hover::before {
  opacity: 1;
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
