<template>
  <div id="app" class="flex flex-col min-h-screen bg-[#e8e8e8] dark:bg-black md:flex-row transition-colors duration-500 ease-in-out" :class="{ dark: theme === 'dark', 'theme-transition': themeTransition }">
    <Sidebar />
    <RouterView />
  </div>
</template>

<script setup>
import { ref, provide, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'

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

const lang = ref('en')
const setLang = (value) => {
  if (value !== 'id' && value !== 'en') return
  lang.value = value
  localStorage.setItem('portfolio-lang', value)
  document.documentElement.lang = value
}
provide('lang', lang)
provide('setLang', setLang)

onMounted(() => {
  const savedTheme = localStorage.getItem('portfolio-theme')
  if (savedTheme === 'dark' || savedTheme === 'light') {
    theme.value = savedTheme
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }

  const savedLang = localStorage.getItem('portfolio-lang')
  if (savedLang === 'id' || savedLang === 'en') {
    lang.value = savedLang
    document.documentElement.lang = savedLang
  }
})
</script>

<style>
#app {
  min-height: 100vh;
}
</style>
