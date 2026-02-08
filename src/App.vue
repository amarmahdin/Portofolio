<template>
  <div id="app" class="flex flex-col min-h-screen bg-[#e8e8e8] dark:bg-black md:flex-row transition-colors duration-500 ease-in-out" :class="{ dark: theme === 'dark', 'theme-transition': themeTransition }">
    <Sidebar />
    <component :is="currentComponent" />
  </div>
</template>

<script setup>
import { ref, provide, computed, onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Home from './components/Home.vue'
import Aboutme from './components/Aboutme.vue'
import Achievements from './components/Achievements.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'

const currentPage = ref('home')
const setPage = (page) => { currentPage.value = page }
const pageComponents = { home: Home, aboutme: Aboutme, achievements: Achievements, projects: Projects, contact: Contact }
const currentComponent = computed(() => pageComponents[currentPage.value] || Home)

provide('currentPage', currentPage)
provide('setPage', setPage)

const theme = ref('light')
const themeTransition = ref(false)
const setTheme = (value) => {
  themeTransition.value = true
  theme.value = value
  localStorage.setItem('portfolio-theme', value)
  document.documentElement.classList.toggle('dark', value === 'dark')
  setTimeout(() => { themeTransition.value = false }, 500)
}
provide('theme', theme)
provide('setTheme', setTheme)

onMounted(() => {
  const saved = localStorage.getItem('portfolio-theme')
  if (saved === 'dark' || saved === 'light') {
    theme.value = saved
    document.documentElement.classList.toggle('dark', saved === 'dark')
  }
})
</script>

<style>
#app {
  min-height: 100vh;
}
</style>
