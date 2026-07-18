<template>
  <div class="lang-toggle inline-flex rounded-full p-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-sm transition-colors duration-500 ease-in-out" role="group" aria-label="Choose language">
    <button
      type="button"
      class="lang-btn cursor-pointer"
      :class="{ 'lang-btn-active': lang === 'id' }"
      @click="setLang('id')"
      title="Indonesia"
    >
      Id
    </button>
    <button
      type="button"
      class="lang-btn cursor-pointer"
      :class="{ 'lang-btn-active': lang === 'en' }"
      @click="setLang('en')"
      title="English"
    >
      Eng
    </button>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const lang = inject('lang')
const setLang = inject('setLang')
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
</style>
