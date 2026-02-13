<template>
  <main class="home flex-1 min-h-screen h-screen bg-white dark:bg-black border-l border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden transition-colors duration-500 ease-in-out">
    <!-- Header -->
    <header class="shrink-0 px-4 py-6 sm:px-6 md:px-8">
      <div class="flex justify-end mb-4">
        <div class="lang-toggle inline-flex rounded-full p-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-sm transition-colors duration-500 ease-in-out" role="group" aria-label="Choose language">
          <button
            type="button"
            class="lang-btn cursor-pointer"
            :class="{ 'lang-btn-active': lang === 'id' }"
            @click="lang = 'id'"
            title="Indonesia"
          >
            Id
          </button>
          <button
            type="button"
            class="lang-btn cursor-pointer"
            :class="{ 'lang-btn-active': lang === 'en' }"
            @click="lang = 'en'"
            title="English"
          >
            Eng
          </button>
        </div>
      </div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:text-4xl transition-colors duration-500 ease-in-out">{{ t.pageTitle }}</h1>
      <nav class="flex flex-wrap gap-6 border-b border-gray-200 dark:border-gray-700 pb-3 transition-colors duration-500 ease-in-out">
        <a href="#" class="nav-link nav-link-active text-sm font-medium" @click.prevent="setPage('home')">{{ t.navHome }}</a>
        <a href="#" class="nav-link text-sm font-medium" @click.prevent="setPage('aboutme')">{{ t.navAbout }}</a>
        <a href="#" class="nav-link text-sm font-medium" @click.prevent="setPage('achievements')">{{ t.navAchievements }}</a>
        <a href="#" class="nav-link text-sm font-medium" @click.prevent="setPage('projects')">{{ t.navProjects }}</a>
        <a href="#" class="nav-link text-sm font-medium" @click.prevent="setPage('contact')">{{ t.navContact }}</a>
      </nav>
    </header>

    <!-- Main content -->
    <div class="flex-1 min-h-0 overflow-y-auto px-4 pb-8 sm:px-6 md:px-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:text-3xl transition-colors duration-500 ease-in-out">
        {{ t.greeting }}
      </h2>
      <ul class="flex flex-wrap gap-x-6 gap-y-1 text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-6">
        <li class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" aria-hidden="true"></span>
          {{ t.location }}
        </li>
        <li class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" aria-hidden="true"></span>
          {{ t.onsite }}
        </li>
      </ul>
      <div class="prose prose-gray dark:prose-invert max-w-5xl text-gray-700 dark:text-gray-300 text-sm leading-relaxed sm:text-base text-justify transition-colors duration-500 ease-in-out">
        <template v-if="lang === 'id'">
          <p class="mb-8">
            Saya Fullstack Developer dengan pengalaman membangun solusi digital yang scalable dan efisien. Di frontend, saya mahir Vue.js, React.js, dan Tailwind CSS untuk antarmuka yang responsif.
            Di backend, saya menggunakan Node.js dan Express.js. Saya juga mengembangkan aplikasi mobile dengan Flutter. Saya senang berkolaborasi dalam tim dan berkomitmen pada kode yang terstruktur.
          </p>
        </template>
        <template v-else>
          <p class="mb-8">
            I'm a Fullstack Developer with experience in building scalable and efficient digital solutions. On the frontend, I'm proficient in Vue.js, React.js, and Tailwind CSS to create responsive interfaces.
            On the backend, I use Node.js and Express.js. I also develop mobile apps with Flutter. I enjoy collaborating in teams and am committed to clean, structured code.
          </p>
        </template>
      </div>
      <div class="mt-6">
        <p class="text-sm font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-500 ease-in-out">
          &lt;/&gt; {{ t.skills }}
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 transition-colors duration-500 ease-in-out">{{ t.skillsSubtitle }}</p>
        <div class="flex flex-wrap gap-5">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="skill-item group relative flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 p-4 transition-all duration-500 ease-out cursor-default"
            :data-tooltip="skill.name"
          >
            <span class="skill-icon shrink-0" v-html="skill.icon" :style="{ color: skill.color }"></span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import * as simpleIcons from 'simple-icons'

const lang = ref('en')
const setPage = inject('setPage')

const translations = {
  id: {
    pageTitle: 'Beranda',
    navHome: 'Beranda',
    navAbout: 'Tentang Saya',
    navAchievements: 'Prestasi',
    navProjects: 'Proyek Saya',
    navContact: 'Kontak',
    greeting: 'Halo, saya Muhammad Amar Mahdin',
    location: 'Berbasis di Baubau, Indonesia',
    onsite: 'Di tempat',
    skills: 'Keterampilan',
    skillsSubtitle: 'Keterampilan profesional saya'
  },
  en: {
    pageTitle: 'Home',
    navHome: 'Home',
    navAbout: 'Aboutme',
    navAchievements: 'Achievements',
    navProjects: 'My Projects',
    navContact: 'Contact',
    greeting: "Hi, I'm Muhammad Amar Mahdin",
    location: 'Based in Baubau, Indonesia',
    onsite: 'Onsite',
    skills: 'Skills',
    skillsSubtitle: 'My professional skills'
  }
}

const t = computed(() => translations[lang.value] || translations.en)

const skillsData = [
  { name: 'HTML', iconKey: 'html5', color: '#E34F26' },
  { name: 'CSS', iconKey: 'css', color: '#1572B6' },
  { name: 'Bootstrap', iconKey: 'bootstrap', color: '#7952B3' },
  { name: 'Tailwind CSS', iconKey: 'tailwindcss', color: '#06B6D4' },
  { name: 'React.js', iconKey: 'react', color: '#61DAFB' },
  { name: 'Vue.js', iconKey: 'vuedotjs', color: '#4FC08D' },
  { name: 'Javascript', iconKey: 'javascript', color: '#F7DF1E' },
  { name: 'Express.js', iconKey: 'express', color: '#000000' },
  { name: 'Node.js', iconKey: 'nodedotjs', color: '#339933' },
  { name: 'SQL', iconKey: 'mysql', color: '#4479A1' },
  { name: 'Postman', iconKey: 'postman', color: '#FF6C37' },
  { name: 'Firebase', iconKey: 'firebase', color: '#FFCA28' },
  { name: 'Flutter', iconKey: 'flutter', color: '#02569B' },
  { name: 'Git', iconKey: 'git', color: '#F05032' }
]

const skills = ref([])

const getIconSVG = (iconKey, brandColor) => {
  try {
    const iconMap = {
      html5: 'siHtml5', css: 'siCss', bootstrap: 'siBootstrap', tailwindcss: 'siTailwindcss',
      react: 'siReact', vuedotjs: 'siVuedotjs', javascript: 'siJavascript', express: 'siExpress',
      nodedotjs: 'siNodedotjs', mysql: 'siMysql', postman: 'siPostman', firebase: 'siFirebase',
      flutter: 'siFlutter', git: 'siGit'
    }
    const key = iconMap[iconKey] || `si${iconKey.charAt(0).toUpperCase()}${iconKey.slice(1)}`
    const icon = simpleIcons[key]
    if (!icon) return ''
    const color = brandColor || (icon.hex ? `#${icon.hex}` : 'currentColor')
    if (icon.svg) {
      const svg = icon.svg.replace('<path d="', `<path fill="${color}" d="`)
      return svg.replace('<svg ', '<svg class="skill-svg" ')
    }
    if (icon.path) {
      return `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="skill-svg"><path fill="${color}" d="${icon.path}"/></svg>`
    }
  } catch (e) { console.warn('Icon not found:', iconKey) }
  return ''
}

onMounted(() => {
  skills.value = skillsData.map(s => ({
    name: s.name,
    icon: getIconSVG(s.iconKey, s.color),
    color: s.color
  }))
})
</script>

<style scoped>
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

.skill-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.skill-icon :deep(.skill-svg),
.skill-icon :deep(svg) {
  width: 36px;
  height: 36px;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.skill-item:hover .skill-icon :deep(svg) {
  transform: scale(1.15);
}
/* Light mode hover */
.skill-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(20, 83, 45, 0.2), 0 4px 8px rgba(0, 0, 0, 0.06);
  background-color: rgb(240 253 244);
}
/* Dark mode hover */
:global(.dark) .skill-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(34, 197, 94, 0.2), 0 0 0 1px rgba(34, 197, 94, 0.15);
  background-color: rgb(31 41 55);
}
/* Tooltip - light */
.skill-item::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: -2.25rem;
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  padding: 0.35rem 0.75rem;
  background: #374151;
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  border-radius: 0.375rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 10;
}
:global(.dark) .skill-item::after {
  background: #1f2937;
  color: #f3f4f6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}
.skill-item::before {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #374151;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 10;
}
:global(.dark) .skill-item::before {
  border-top-color: #1f2937;
}
.skill-item:hover::after,
.skill-item:hover::before {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
.skill-item:hover::before {
  transform: translateX(-50%) translateY(0);
}
</style>
