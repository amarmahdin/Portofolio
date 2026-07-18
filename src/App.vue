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
