<template>
  <nav class="flex flex-wrap gap-4 sm:gap-6 border-b border-gray-200 dark:border-gray-700 pb-3 transition-colors duration-500 ease-in-out">
    <RouterLink to="/" class="nav-link text-sm font-medium" active-class="nav-link-active">{{ t.navHome }}</RouterLink>
    <RouterLink to="/about" class="nav-link text-sm font-medium" active-class="nav-link-active">{{ t.navAbout }}</RouterLink>
    <RouterLink to="/achievements" class="nav-link text-sm font-medium" active-class="nav-link-active">{{ t.navAchievements }}</RouterLink>
    <RouterLink to="/projects" class="nav-link text-sm font-medium" active-class="nav-link-active">{{ t.navProjects }}</RouterLink>
    <RouterLink to="/contact" class="nav-link text-sm font-medium" active-class="nav-link-active">{{ t.navContact }}</RouterLink>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  lang: {
    type: String,
    default: 'en',
  },
})

const translations = {
  id: {
    navHome: 'Beranda',
    navAbout: 'Tentang Saya',
    navAchievements: 'Prestasi',
    navProjects: 'Proyek Saya',
    navContact: 'Kontak',
  },
  en: {
    navHome: 'Home',
    navAbout: 'Aboutme',
    navAchievements: 'Achievements',
    navProjects: 'My Projects',
    navContact: 'Contact',
  },
}

const t = computed(() => translations[props.lang] || translations.en)
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
</style>
