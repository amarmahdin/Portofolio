<template>
  <main class="aboutme flex-1 min-h-0 w-full md:min-h-screen md:h-screen bg-white dark:bg-black md:border-l border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden transition-colors duration-500 ease-in-out">
    <header class="shrink-0 px-4 py-6 sm:px-6 md:px-8">
      <div class="flex justify-end mb-4">
        <LangToggle />
      </div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:text-4xl transition-colors duration-500 ease-in-out">{{ t.pageTitle }}</h1>
      <PageNav />
    </header>

    <div class="flex-1 min-h-0 overflow-y-auto px-4 pb-8 sm:px-6 md:px-8">
      <div class="prose prose-gray dark:prose-invert max-w-5xl text-gray-700 dark:text-gray-300 text-sm leading-relaxed sm:text-base text-justify transition-colors duration-500 ease-in-out">
        <p class="mb-4">{{ t.intro1 }}</p>
        <p class="mb-4">{{ t.intro2 }}</p>
        <p class="mb-8">{{ t.intro3 }}</p>
      </div>

      <p class="text-sm font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-500 ease-in-out flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500 dark:text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        {{ t.careerTitle }}
      </p>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 transition-colors duration-500 ease-in-out">{{ t.careerSubtitle }}</p>

      <div class="max-w-5xl">
        <div
          v-for="(job, index) in localizedCareers"
          :key="index"
          class="career-card flex gap-4 p-4 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-500 transition-colors duration-500 ease-in-out"
          :class="{ 'mt-4': index > 0 }"
        >
          <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gray-200 dark:bg-gray-700 shrink-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
            <img v-if="job.image" :src="job.image" alt="" class="w-full h-full object-cover" />
            <span v-else class="text-xs font-bold text-blue-700 dark:text-blue-300">{{ job.initials }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-base font-bold text-gray-900 dark:text-white sm:text-lg mb-1 transition-colors duration-500 ease-in-out">{{ job.role }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-500 ease-in-out">{{ job.company }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-500 mb-2 transition-colors duration-500 ease-in-out">{{ job.period }} · {{ job.meta }}</p>
            <button
              type="button"
              class="flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors cursor-pointer"
              @click="toggleResponsibilities(index)"
            >
              <span class="inline-flex transition-transform duration-200" :class="{ 'rotate-90': expanded[index] }">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
              {{ expanded[index] ? t.hideResponsibilities : t.showResponsibilities }}
            </button>
            <ul v-if="expanded[index]" class="mt-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-500 ease-in-out list-disc list-inside space-y-1 pl-1" v-html="job.responsibilities"></ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import PageNav from './PageNav.vue'
import LangToggle from './LangToggle.vue'

const itplnImg = new URL('../assets/itpln.webp', import.meta.url).href
const simasetImg = new URL('../assets/simaset.webp', import.meta.url).href
const enjineringImg = new URL('../assets/enjinering.webp', import.meta.url).href
const iconplusImg = new URL('../assets/iconplus.webp', import.meta.url).href
const infiniteImg = new URL('../assets/infinite.webp', import.meta.url).href

const lang = inject('lang')
const expanded = ref({})

const toggleResponsibilities = (index) => {
  expanded.value[index] = !expanded.value[index]
}

const careers = [
  {
    image: itplnImg,
    id: {
      role: 'IT Infrastructure & Web Developer',
      company: 'BPTI — Institut Teknologi PLN, Jakarta Barat',
      period: 'Jul 2026 - Sekarang',
      meta: 'Kontrak · Onsite',
      responsibilities: '<li>Mengelola infrastruktur jaringan kampus dan server Linux (Nginx, PM2)</li><li>Deployment dan maintenance aplikasi web institusi</li><li>Backup sistem dan pengamanan infrastruktur IT</li>',
    },
    en: {
      role: 'IT Infrastructure & Web Developer',
      company: 'BPTI — Institut Teknologi PLN, Jakarta Barat',
      period: 'Jul 2026 - Present',
      meta: 'Contract · Onsite',
      responsibilities: '<li>Managed campus network infrastructure and Linux servers (Nginx, PM2)</li><li>Deployed and maintained institutional web applications</li><li>Implemented system backups and IT infrastructure security</li>',
    },
  },
  {
    image: null,
    initials: 'TR',
    id: {
      role: 'Full Stack Developer — Tirtarimba Network Center',
      company: 'PDAM Tirta Rimba, Baubau',
      period: 'Jan - Apr 2026',
      meta: 'Kontrak · Onsite',
      responsibilities: '<li>Membangun aplikasi web dengan Vue.js, Tailwind CSS, Node.js, dan MySQL</li><li>Merancang RESTful API dan arsitektur backend</li><li>Mengoptimasi skema database untuk performa dan integritas data</li>',
    },
    en: {
      role: 'Full Stack Developer — Tirtarimba Network Center',
      company: 'PDAM Tirta Rimba, Baubau',
      period: 'Jan - Apr 2026',
      meta: 'Contract · Onsite',
      responsibilities: '<li>Built web applications with Vue.js, Tailwind CSS, Node.js, and MySQL</li><li>Designed RESTful APIs and backend architecture</li><li>Optimized database schemas for performance and data integrity</li>',
    },
  },
  {
    image: simasetImg,
    id: {
      role: 'Web & Mobile Developer — SIMASET',
      company: 'PT Malaka Utama, Bandung',
      period: 'Sept 2025 - Jan 2026',
      meta: 'Paruh Waktu · Remote',
      responsibilities: '<li>Mengembangkan aplikasi web dan mobile SIMASET end-to-end</li><li>Frontend React/Tailwind dan backend Node.js/Express</li><li>Aplikasi mobile Flutter untuk Android & iOS, deploy ke VPS</li>',
    },
    en: {
      role: 'Web & Mobile Developer — SIMASET',
      company: 'PT Malaka Utama, Bandung',
      period: 'Sept 2025 - Jan 2026',
      meta: 'Part-time · Remote',
      responsibilities: '<li>Delivered end-to-end SIMASET web and mobile applications</li><li>React/Tailwind frontend and Node.js/Express backend</li><li>Flutter mobile apps for Android & iOS, deployed to VPS</li>',
    },
  },
  {
    image: itplnImg,
    id: {
      role: 'Student Worker',
      company: 'Divisi Sistem Data & Informasi — ITPLN, Jakarta Barat',
      period: 'Jan - Aug 2025',
      meta: 'Kontrak · Onsite',
      responsibilities: '<li>Mengembangkan antarmuka web internal dengan WordPress</li><li>Monitoring keamanan jaringan dan backup sistem informasi</li><li>Membantu pembuatan materi informasi internal tim</li>',
    },
    en: {
      role: 'Student Worker',
      company: 'Data & Information Systems Division — ITPLN, Jakarta Barat',
      period: 'Jan - Aug 2025',
      meta: 'Contract · Onsite',
      responsibilities: '<li>Developed internal web interfaces using WordPress</li><li>Monitored network security and managed system backups</li><li>Assisted in creating internal team informational materials</li>',
    },
  },
  {
    image: enjineringImg,
    id: {
      role: 'Frontend Developer — Aplikasi Newvc',
      company: 'PLN Enjiniring, Jakarta Barat',
      period: 'Nov - Dec 2024',
      meta: 'Internship · Onsite',
      responsibilities: '<li>Mengembangkan fitur aplikasi enterprise dengan Vue.js dan Tailwind CSS</li><li>Menerjemahkan wireframe menjadi komponen UI responsif dan reusable</li><li>Integrasi API dan testing cross-device</li>',
    },
    en: {
      role: 'Frontend Developer — Newvc Application',
      company: 'PLN Enjiniring, Jakarta Barat',
      period: 'Nov - Dec 2024',
      meta: 'Internship · Onsite',
      responsibilities: '<li>Built enterprise application features with Vue.js and Tailwind CSS</li><li>Translated wireframes into responsive, reusable UI components</li><li>API integration and cross-device testing</li>',
    },
  },
  {
    image: iconplusImg,
    id: {
      role: 'Frontend Developer — Aplikasi DIAMOND',
      company: 'PLN Icon Plus — Divisi Korporat 1, Jakarta Selatan',
      period: 'Aug - Nov 2024',
      meta: 'Internship · Onsite',
      responsibilities: '<li>Membangun UI interaktif Vue.js/Tailwind dari desain UI/UX</li><li>Komponen modular dengan kompatibilitas cross-browser</li><li>Integrasi RESTful API dan kolaborasi dengan tim backend</li>',
    },
    en: {
      role: 'Frontend Developer — DIAMOND Application',
      company: 'PLN Icon Plus — Corporate Division 1, Jakarta Selatan',
      period: 'Aug - Nov 2024',
      meta: 'Internship · Onsite',
      responsibilities: '<li>Built interactive Vue.js/Tailwind UI from UI/UX designs</li><li>Modular components with cross-browser compatibility</li><li>RESTful API integration and backend team collaboration</li>',
    },
  },
  {
    image: infiniteImg,
    id: {
      role: 'Web Developer — Studi Independen Batch 6',
      company: 'Infinite Learning, Batam',
      period: 'Feb - Jun 2024',
      meta: 'Program Studi · Online',
      responsibilities: '<li>Proyek tim web dengan React.js dan Tailwind CSS</li><li>Mengimplementasikan wireframe menjadi UI interaktif</li><li>Bootcamp intensif pengembangan web modern</li>',
    },
    en: {
      role: 'Web Developer — Study Independent Batch 6',
      company: 'Infinite Learning, Batam',
      period: 'Feb - Jun 2024',
      meta: 'Study Program · Online',
      responsibilities: '<li>Team web projects with React.js and Tailwind CSS</li><li>Implemented wireframes into interactive UI components</li><li>Intensive modern web development bootcamp</li>',
    },
  },
]

const localizedCareers = computed(() =>
  careers.map((item) => {
    const copy = item[lang.value] || item.en
    return {
      image: item.image,
      initials: item.initials,
      ...copy,
    }
  })
)

const translations = {
  id: {
    pageTitle: 'Tentang Saya',
    intro1: 'Halo! Terima kasih telah mengunjungi situs pribadi saya. Saya Amar Mahdin, Fullstack Developer yang senang membangun produk software yang berdampak. Stack saya meliputi Vue.js, React.js, Tailwind CSS, Node.js, Express.js, dan Flutter.',
    intro2: 'Saya senang membuat solusi yang ramah pengguna dan berperforma baik — dari antarmuka intuitif hingga layanan backend yang scalable. Saya pembelajar cepat yang nyaman bekerja di lingkungan dinamis.',
    intro3: 'Saya percaya komunikasi yang baik dan sinergi tim adalah kunci kesuksesan dalam pengembangan software.',
    careerTitle: 'Karier',
    careerSubtitle: 'Perjalanan profesional saya',
    showResponsibilities: 'Tampilkan Tanggung Jawab',
    hideResponsibilities: 'Sembunyikan Tanggung Jawab',
  },
  en: {
    pageTitle: 'Aboutme',
    intro1: "Hello there! Thank you for visiting my personal website. I'm Amar Mahdin, a Fullstack Developer passionate about building impactful software products. My stack includes Vue.js, React.js, Tailwind CSS, Node.js, Express.js, and Flutter.",
    intro2: 'I enjoy creating user-friendly, performant solutions — from intuitive interfaces to scalable backend services. I am a fast learner who thrives in dynamic environments.',
    intro3: 'I believe great communication and team synergy are key to success in software development.',
    careerTitle: 'Career',
    careerSubtitle: 'My professional journey',
    showResponsibilities: 'Show Responsibilities',
    hideResponsibilities: 'Hide Responsibilities',
  },
}

const t = computed(() => translations[lang.value] || translations.en)
</script>

<style scoped>
.career-card {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
}
:global(.dark) .career-card {
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.8), 0 4px 6px -2px rgba(0, 0, 0, 0.5);
}
</style>
