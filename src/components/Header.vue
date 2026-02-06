<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <nav class="nav">
      <div class="logo">
        <a href="#home">{{ name }}</a>
      </div>
      <ul class="nav-links" :class="{ active: menuOpen }">
        <li><a href="#home" @click="scrollTo('home')">Home</a></li>
        <li><a href="#about" @click="scrollTo('about')">About</a></li>
        <li><a href="#projects" @click="scrollTo('projects')">Projects</a></li>
        <li><a href="#contact" @click="scrollTo('contact')">Contact</a></li>
      </ul>
      <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const name = 'Portofolio'
const isScrolled = ref(false)
const menuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollTo = (section) => {
  const element = document.getElementById(section)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    menuOpen.value = false
  }
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(24px) saturate(180%);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 0 rgba(157, 78, 221, 0.2), 0 4px 24px rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(157, 78, 221, 0.3);
}

.header.scrolled {
  box-shadow: 0 2px 0 rgba(157, 78, 221, 0.3), 0 8px 32px rgba(0, 0, 0, 0.6);
  background: rgba(26, 0, 51, 0.95);
  backdrop-filter: blur(28px) saturate(180%);
  border-bottom: 1px solid rgba(199, 125, 255, 0.4);
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  font-size: 1.5rem;
  font-weight: 800;
  color: #c77dff;
  text-decoration: none;
  transition: all 0.3s ease;
  letter-spacing: -0.02em;
  text-shadow: 0 0 20px rgba(199, 125, 255, 0.6);
}

.logo a:hover {
  transform: scale(1.05);
  color: #ffffff;
  text-shadow: 0 0 30px rgba(199, 125, 255, 0.9);
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: #e0c4ff;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  padding: 0.5rem 0;
  letter-spacing: 0.01em;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #9d4edd, #c77dff);
  box-shadow: 0 0 10px rgba(199, 125, 255, 0.8);
  transition: width 0.3s ease;
}

.nav-links a:hover {
  color: #ffffff;
  text-shadow: 0 0 10px rgba(199, 125, 255, 0.6);
}

.nav-links a:hover::after {
  width: 100%;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.menu-toggle span {
  width: 25px;
  height: 3px;
  background: #213547;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .nav {
    padding: 1rem 1.5rem;
  }

  .menu-toggle {
    display: flex;
  }

  .menu-toggle span {
    background: #c77dff;
  }

  .nav-links {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: rgba(26, 0, 51, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(157, 78, 221, 0.3);
    border-top: 1px solid rgba(199, 125, 255, 0.3);
  }

  .nav-links.active {
    transform: translateX(0);
  }

  .nav-links a {
    color: #e0c4ff;
    font-size: 1.1rem;
    padding: 0.75rem 0;
  }

  .nav-links a:hover {
    color: #ffffff;
  }
}
</style>
