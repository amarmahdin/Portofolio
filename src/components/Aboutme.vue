<template>
  <main class="aboutme flex-1 min-h-screen h-screen bg-white dark:bg-black border-l border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden transition-colors duration-500 ease-in-out">
    <header class="shrink-0 px-4 py-6 sm:px-6 md:px-8">
      <div class="flex justify-end mb-4">
        <div class="lang-toggle inline-flex rounded-full p-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-sm transition-colors duration-500 ease-in-out" role="group" aria-label="Choose language">
          <button type="button" class="lang-btn cursor-pointer" :class="{ 'lang-btn-active': lang === 'id' }" @click="lang = 'id'" title="Indonesia">Id</button>
          <button type="button" class="lang-btn cursor-pointer" :class="{ 'lang-btn-active': lang === 'en' }" @click="lang = 'en'" title="English">Eng</button>
        </div>
      </div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:text-4xl transition-colors duration-500 ease-in-out">{{ t.pageTitle }}</h1>
      <nav class="flex flex-wrap gap-6 border-b border-gray-200 dark:border-gray-700 pb-3 transition-colors duration-500 ease-in-out">
        <a href="#" class="nav-link text-sm font-medium" @click.prevent="setPage('home')">{{ t.navHome }}</a>
        <a href="#" class="nav-link nav-link-active text-sm font-medium">{{ t.navAbout }}</a>
        <a href="#" class="nav-link text-sm font-medium" @click.prevent="setPage('achievements')">{{ t.navAchievements }}</a>
        <a href="#" class="nav-link text-sm font-medium" @click.prevent="setPage('projects')">{{ t.navProjects }}</a>
        <a href="#" class="nav-link text-sm font-medium" @click.prevent="setPage('contact')">{{ t.navContact }}</a>
      </nav>
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
        <div class="career-card flex gap-4 p-4 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-500 transition-colors duration-500 ease-in-out">
          <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gray-200 dark:bg-gray-700 shrink-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
            <img :src="simasetImg" alt="" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-base font-bold text-gray-900 dark:text-white sm:text-lg mb-1 transition-colors duration-500 ease-in-out">{{ t.role }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-500 ease-in-out">{{ t.company }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-500 mb-2 transition-colors duration-500 ease-in-out">{{ t.period }} · {{ t.duration }} · {{ t.type }} · {{ t.workMode }}</p>
            <button
              type="button"
              class="flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors cursor-pointer"
              @click="showResponsibilities = !showResponsibilities"
            >
              <span class="inline-flex transition-transform duration-200" :class="{ 'rotate-90': showResponsibilities }">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
              {{ showResponsibilities ? t.hideResponsibilities : t.showResponsibilities }}
            </button>
            <ul v-if="showResponsibilities" class="mt-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-500 ease-in-out list-disc list-inside space-y-1 pl-1" v-html="t.responsibilities"></ul>
          </div>
        </div>

        <div class="career-card flex gap-4 p-4 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-500 transition-colors duration-500 ease-in-out mt-4">
          <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gray-200 dark:bg-gray-700 shrink-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
            <img :src="itplnImg" alt="" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-base font-bold text-gray-900 dark:text-white sm:text-lg mb-1 transition-colors duration-500 ease-in-out">{{ t.role2 }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-500 ease-in-out">{{ t.company2 }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-500 mb-2 transition-colors duration-500 ease-in-out">{{ t.period2 }} · {{ t.duration2 }} · {{ t.type2 }} · {{ t.workMode2 }}</p>
            <button
              type="button"
              class="flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors cursor-pointer"
              @click="showResponsibilities2 = !showResponsibilities2"
            >
              <span class="inline-flex transition-transform duration-200" :class="{ 'rotate-90': showResponsibilities2 }">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
              {{ showResponsibilities2 ? t.hideResponsibilities : t.showResponsibilities }}
            </button>
            <ul v-if="showResponsibilities2" class="mt-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-500 ease-in-out list-disc list-inside space-y-1 pl-1" v-html="t.responsibilities2"></ul>
          </div>
        </div>

        <div class="career-card flex gap-4 p-4 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-500 transition-colors duration-500 ease-in-out mt-4">
          <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gray-200 dark:bg-gray-700 shrink-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
            <img :src="iconplusImg" alt="" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-base font-bold text-gray-900 dark:text-white sm:text-lg mb-1 transition-colors duration-500 ease-in-out">{{ t.role3 }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-500 ease-in-out">{{ t.company3 }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-500 mb-2 transition-colors duration-500 ease-in-out">{{ t.period3 }} · {{ t.duration3 }} · {{ t.type3 }} · {{ t.workMode3 }}</p>
            <button
              type="button"
              class="flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors cursor-pointer"
              @click="showResponsibilities3 = !showResponsibilities3"
            >
              <span class="inline-flex transition-transform duration-200" :class="{ 'rotate-90': showResponsibilities3 }">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
              {{ showResponsibilities3 ? t.hideResponsibilities : t.showResponsibilities }}
            </button>
            <ul v-if="showResponsibilities3" class="mt-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-500 ease-in-out list-disc list-inside space-y-1 pl-1" v-html="t.responsibilities3"></ul>
          </div>
        </div>

        <div class="career-card flex gap-4 p-4 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-500 transition-colors duration-500 ease-in-out mt-4">
          <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gray-200 dark:bg-gray-700 shrink-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
            <img :src="infiniteImg" alt="" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-base font-bold text-gray-900 dark:text-white sm:text-lg mb-1 transition-colors duration-500 ease-in-out">{{ t.role4 }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-500 ease-in-out">{{ t.company4 }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-500 mb-2 transition-colors duration-500 ease-in-out">{{ t.period4 }} · {{ t.duration4 }} · {{ t.type4 }} · {{ t.workMode4 }}</p>
            <button
              type="button"
              class="flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors cursor-pointer"
              @click="showResponsibilities4 = !showResponsibilities4"
            >
              <span class="inline-flex transition-transform duration-200" :class="{ 'rotate-90': showResponsibilities4 }">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
              {{ showResponsibilities4 ? t.hideResponsibilities : t.showResponsibilities }}
            </button>
            <ul v-if="showResponsibilities4" class="mt-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-500 ease-in-out list-disc list-inside space-y-1 pl-1" v-html="t.responsibilities4"></ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
const simasetImg = new URL('../assets/simaset.png', import.meta.url).href
const itplnImg = new URL('../assets/itpln.png', import.meta.url).href
const iconplusImg = new URL('../assets/iconplus.png', import.meta.url).href
const infiniteImg = new URL('../assets/infinite.png', import.meta.url).href

const lang = ref('en')
const setPage = inject('setPage')
const showResponsibilities = ref(false)
const showResponsibilities2 = ref(false)
const showResponsibilities3 = ref(false)
const showResponsibilities4 = ref(false)

const translations = {
  id: {
    pageTitle: 'Tentang Saya',
    navHome: 'Beranda',
    navAchievements: 'Prestasi',
    navProjects: 'Proyek Saya',
    navAbout: 'Tentang Saya',
    navContact: 'Kontak',
    intro1: 'Halo! Terima kasih telah mengunjungi situs pribadi saya. Saya Amar Mahdin, Fullstack Developer yang senang membangun produk software yang berdampak. Stack saya meliputi teknologi frontend modern seperti Vue.js, React.js, dan Tailwind CSS, serta pengembangan backend dengan Node.js dan Express.js. Saya juga mengembangkan aplikasi mobile berperforma tinggi dengan Flutter.',
    intro2: 'Saya senang membuat solusi yang ramah pengguna dan berperforma baik. Baik membangun antarmuka yang intuitif maupun merancang layanan backend, saya berusaha membawa efisiensi dan kejelasan di setiap lapisan aplikasi. Saya pembelajar cepat yang berkembang di lingkungan dinamis dan senang menyelesaikan masalah kompleks secara kolaboratif.',
    intro3: 'Saya percaya komunikasi yang baik dan sinergi tim adalah kunci kesuksesan dalam pengembangan software. Pengalaman saya membentuk tidak hanya keterampilan teknis dan analitis tetapi juga kualitas kepemimpinan.',
    careerTitle: 'Karier',
    careerSubtitle: 'Perjalanan profesional saya',
    role: 'Web & Mobile Developer',
    company: 'PT Malaka Utama - Bandung, Indonesia',
    period: 'Sept 2025 - Jan 2026',
    duration: '3 Bulan',
    type: 'Paruh waktu',
    workMode: 'Remote',
    showResponsibilities: 'Tampilkan Tanggung Jawab',
    hideResponsibilities: 'Sembunyikan Tanggung Jawab',
    responsibilities: '<li>Membangun website dan aplikasi mobile untuk sistem manajemen aset</li><li>Mengembangkan modul pengguna, manajemen mobil, dan reimburse</li><li>Mendesain antarmuka responsif dan user-friendly</li><li>Mengintegrasikan fitur antar modul secara optimal</li>',
    role2: 'Student Worker',
    company2: 'Institut Teknologi PLN - Jakarta Barat, Indonesia',
    period2: 'Jan - Aug 2025',
    duration2: '6 Bulan',
    type2: 'Kontrak',
    workMode2: 'Di tempat',
    responsibilities2: '<li>Mendesain antarmuka WEB</li><li>Memantau malware yang terdeteksi di jaringan LAN</li><li>Backup sistem informasi</li><li>Membantu dan membuat poster informasi</li><li>Mendeteksi paket data yang tidak normal</li>',
    role3: 'Frontend Developer',
    company3: 'PLN Icon Plus - Jakarta Selatan, Indonesia',
    period3: 'Aug - Nov 2024',
    duration3: '3 Bulan',
    type3: 'Internship',
    workMode3: 'Di tempat',
    responsibilities3: '<li>Mengembangkan antarmuka frontend</li><li>Berkolaborasi dengan tim development</li>',
    role4: 'Web Development',
    company4: 'Infinite Learning - Batam, Indonesia',
    period4: 'Feb - Jun 2024',
    duration4: '5 Bulan',
    type4: 'Program Studi',
    workMode4: 'Online',
    responsibilities4: '<li>Memahami dasar-dasar pengembangan web</li><li>Mengerjakan proyek web berbasis studi kasus</li>'
  },
  en: {
    pageTitle: 'Aboutme',
    navHome: 'Home',
    navAchievements: 'Achievements',
    navProjects: 'My Projects',
    navAbout: 'Aboutme',
    navContact: 'Contact',
    intro1: "Hello there! Thank you for visiting my personal website. I'm Amar Mahdin, a Fullstack Developer with a passion for building impactful software products. My stack includes modern frontend technologies like Vue.js, React.js, and Tailwind CSS, as well as robust backend development using Node.js and Express.js. Additionally, I develop high-performance mobile applications using Flutter.",
    intro2: "I enjoy creating solutions that are both user-friendly and performant. Whether it's building intuitive interfaces or architecting backend services, I aim to bring efficiency and clarity to every layer of the application. I am a fast learner who thrives in dynamic environments and I enjoy solving complex problems collaboratively.",
    intro3: "I believe that great communication and team synergy are key to success in software development. My experience has shaped not only my technical and analytical skills but also my leadership qualities.",
    careerTitle: 'Career',
    careerSubtitle: 'My professional journey',
    role: 'Web & Mobile Developer',
    company: 'PT Malaka Utama - Bandung, Indonesia',
    period: 'Sept 2025 - Jan 2026',
    duration: '3 Months',
    type: 'Part-time',
    workMode: 'Remote',
    showResponsibilities: 'Show Responsibilities',
    hideResponsibilities: 'Hide Responsibilities',
    responsibilities: '<li>Built web and mobile applications for asset management system</li><li>Developed modules for user management, vehicle management, and reimbursement</li><li>Designed responsive and user-friendly interfaces</li><li>Integrated features across modules seamlessly</li>',
    role2: 'Student Worker',
    company2: 'Institut Teknologi PLN - Jakarta Barat, Indonesia',
    period2: 'Jan - Aug 2025',
    duration2: '6 Months',
    type2: 'Contract',
    workMode2: 'Onsite',
    responsibilities2: '<li>Designing WEB interfaces</li><li>Monitoring malware detected on the LAN network</li><li>Backing up information systems</li><li>Assisting with and creating informational posters</li><li>Detecting abnormal data packets</li>',
    role3: 'Frontend Developer',
    company3: 'PLN Icon Plus - Jakarta Selatan, Indonesia',
    period3: 'Aug - Nov 2024',
    duration3: '3 Months',
    type3: 'Internship',
    workMode3: 'Onsite',
    responsibilities3: '<li>Developing frontend interfaces</li><li>Collaborating with development team</li>',
    role4: 'Web Development',
    company4: 'Infinite Learning - Batam, Indonesia',
    period4: 'Feb - Jun 2024',
    duration4: '5 Months',
    type4: 'Study Program',
    workMode4: 'Online',
    responsibilities4: '<li>Understanding web development fundamentals</li><li>Completing case-study based web projects</li>'
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

.career-card {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
}
:global(.dark) .career-card {
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.8), 0 4px 6px -2px rgba(0, 0, 0, 0.5);
}
</style>
