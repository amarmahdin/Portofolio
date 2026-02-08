<template>
  <aside class="sidebar w-full min-h-screen flex flex-col items-center px-4 py-6 shadow-[2px_0_12px_rgba(0,0,0,0.08)] sm:px-6 sm:py-8 md:w-[280px] md:py-8 md:px-6 transition-colors duration-500 ease-in-out bg-white dark:bg-black">
    <h1 class="sidebar-title text-2xl font-bold tracking-tight mb-2 md:text-[1.75rem] md:mb-2 text-black dark:text-white transition-colors duration-500 ease-in-out">
      Amar Mahdin
    </h1>
    <div class="mb-4 mt-9">
      <div class="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.12)] sm:w-28 sm:h-28 md:w-32 md:h-32 border-2 border-gray-300 dark:border-gray-600 transition-colors duration-500 ease-in-out">
        <img :src="fotoProfil" alt="Amar Mahdin" class="w-full h-full object-cover mb-4 block" />
      </div>
      <!-- Dark/Light Mode Toggle -->
      <div class="flex justify-center mt-6">
        <div class="theme-toggle inline-flex rounded-md p-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-sm transition-colors duration-500 ease-in-out" role="group" aria-label="Theme">
          <button
            type="button"
            class="theme-btn cursor-pointer"
            :class="{ 'theme-btn-active': theme === 'light' }"
            @click="setTheme('light')"
            title="Light mode"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </button>
          <button
            type="button"
            class="theme-btn cursor-pointer"
            :class="{ 'theme-btn-active': theme === 'dark' }"
            @click="setTheme('dark')"
            title="Dark mode"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          </button>
        </div>
      </div>
    </div>
    <p class="sidebar-role text-sm mb-6 md:text-base md:mb-6 text-gray-600 dark:text-gray-400 transition-colors duration-500 ease-in-out">
      Web || Mobile Developer
    </p>
    <div class="w-full max-w-[200px] h-px bg-gray-200 dark:bg-gray-700 mb-4 transition-colors duration-500 ease-in-out"></div>
    <div class="flex justify-center gap-4 mb-6">
      <a href="https://www.instagram.com/amrmhdn_" target="_blank" rel="noopener noreferrer" class="social-link cursor-pointer text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors" aria-label="Instagram">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
      </a>
      <a href="https://www.tiktok.com/@blackswuit" target="_blank" rel="noopener noreferrer" class="social-link cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="TikTok">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
      </a>
      <a href="https://www.linkedin.com/in/muhammad-amar-mahdin-st-mos-mcf-962b9a2a0" target="_blank" rel="noopener noreferrer" class="social-link cursor-pointer text-gray-500 dark:text-gray-400 hover:text-[#0A66C2] dark:hover:text-[#0A66C2] transition-colors" aria-label="LinkedIn">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <a href="https://github.com/amarmahdin" target="_blank" rel="noopener noreferrer" class="social-link cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="GitHub">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      </a>
    </div>
    <div class="mt-auto w-full max-w-[200px] text-center">
      <p class="text-xs text-gray-500 dark:text-gray-400 leading-snug transition-colors duration-500 ease-in-out">COPYRIGHT © {{ currentYear }}</p>
      <p class="text-xs text-gray-500 dark:text-gray-400 leading-snug transition-colors duration-500 ease-in-out">Amar Mahdin. All rights reserved.</p>
    </div>
  </aside>
</template>

<script setup>
import { computed, inject } from 'vue'
import fotoProfil from '@/assets/fotoku.png'

const theme = inject('theme')
const setTheme = inject('setTheme')
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.sidebar-title,
.sidebar-name {
  font-family: Georgia, 'Times New Roman', serif;
}
.theme-toggle {
  transition: box-shadow 0.2s ease, background-color 0.5s ease, border-color 0.5s ease;
}
.theme-toggle:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
}
.dark .theme-toggle:hover {
  box-shadow: 0 2px 12px rgba(255, 255, 255, 0.08);
}
.theme-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: #6b7280;
  background: transparent;
}
.theme-btn:hover {
  color: #374151;
}
.dark .theme-btn {
  color: #9ca3af;
}
.dark .theme-btn:hover {
  color: #e5e7eb;
}
.theme-btn-active {
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  color: white !important;
  box-shadow: 0 2px 8px rgba(22, 163, 74, 0.4);
}
.theme-btn-active:hover {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  box-shadow: 0 4px 12px rgba(22, 163, 74, 0.5);
  color: white !important;
}
</style>
