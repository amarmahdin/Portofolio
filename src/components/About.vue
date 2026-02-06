<template>
  <section id="about" class="about">
    <div class="container">
      <h2 class="section-title">About Me</h2>
      <div class="about-content">
        <div class="about-text">
          <p>{{ aboutText }}</p>
          <div class="skills">
            <h3>Skills</h3>
            <div class="skills-grid">
              <div v-for="skill in skills" :key="skill.name" class="skill-item">
                <div class="skill-icon-wrapper">
                  <div class="skill-icon-glow" :style="{ color: skill.color }"></div>
                  <div class="skill-icon-bg"></div>
                  <div class="skill-icon" v-if="skill.icon" v-html="skill.icon" :style="{ color: skill.color }"></div>
                  <div class="skill-icon-fallback" v-else>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <!-- Hexagon badge -->
                      <path d="M12 2L18 5.5L18 12.5L12 16L6 12.5L6 5.5L12 2Z" fill="currentColor" opacity="0.15"/>
                      <path d="M12 2L18 5.5L18 12.5L12 16L6 12.5L6 5.5L12 2Z" stroke="currentColor" fill="none"/>
                      <!-- Star/Achievement -->
                      <path d="M12 6L13.5 10L18 10.5L14.5 13.5L15.5 18L12 15.5L8.5 18L9.5 13.5L6 10.5L10.5 10L12 6Z" fill="currentColor" opacity="0.8"/>
                      <!-- Terminal lines -->
                      <path d="M8 11L10 13L8 15" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
                      <path d="M14 11H16" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
                    </svg>
                  </div>
                  <div class="skill-code-lines">
                    <span class="code-line"></span>
                    <span class="code-line"></span>
                    <span class="code-line"></span>
                  </div>
                </div>
                <span class="skill-name">{{ skill.name }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="about-image">
          <div class="image-placeholder">
            <span>🎯</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as simpleIcons from 'simple-icons'

const aboutText = 'A dedicated Full Stack & Mobile Developer committed to creating seamless digital experiences. Combining intuitive UI/UX design with robust backend architecture to build innovative and scalable web and mobile solutions.'

const skillsData = [
  { name: 'Vue JS', iconKey: 'vuedotjs', color: '#4FC08D' },
  { name: 'React JS', iconKey: 'react', color: '#61DAFB' },
  { name: 'Tailwind CSS', iconKey: 'tailwindcss', color: '#06B6D4' },
  { name: 'Javascript', iconKey: 'javascript', color: '#F7DF1E' },
  { name: 'Flutter', iconKey: 'flutter', color: '#02569B' },
  { name: 'Node JS', iconKey: 'nodedotjs', color: '#339933' },
  { name: 'Express JS', iconKey: 'express', color: '#000000' },
  { name: 'My SQL', iconKey: 'mysql', color: '#4479A1' },
  { name: 'VPS', iconKey: 'digitalocean', color: '#0080FF' },
  { name: 'Nginx', iconKey: 'nginx', color: '#009639' },
  { name: 'PM2', iconKey: 'pm2', color: '#2B037A' },
  { name: 'Git', iconKey: 'git', color: '#F05032' }
]

const skills = ref([])

const getIconSVG = (iconKey, brandColor) => {
  try {
    // Mapping iconKey ke format yang benar di simple-icons
    const iconMap = {
      'vuedotjs': 'vuedotjs',
      'react': 'react',
      'tailwindcss': 'tailwindcss',
      'javascript': 'javascript',
      'flutter': 'flutter',
      'nodedotjs': 'nodedotjs',
      'express': 'express',
      'mysql': 'mysql',
      'digitalocean': 'digitalocean',
      'nginx': 'nginx',
      'pm2': 'pm2',
      'git': 'git'
    }
    
    const mappedKey = iconMap[iconKey] || iconKey
    
    // Coba beberapa cara untuk mendapatkan icon
    let icon = null
    
    // Method 1: Akses langsung
    if (simpleIcons[mappedKey]) {
      icon = simpleIcons[mappedKey]
    }
    // Method 2: Menggunakan Get function jika ada
    else if (simpleIcons.default && simpleIcons.default.Get) {
      icon = simpleIcons.default.Get(mappedKey)
    }
    // Method 3: Cari di semua keys
    else {
      const allKeys = Object.keys(simpleIcons)
      const found = allKeys.find(k => {
        const keyLower = k.toLowerCase()
        return keyLower === mappedKey.toLowerCase() || 
               keyLower.includes(mappedKey.toLowerCase())
      })
      if (found) {
        icon = simpleIcons[found]
      }
    }
    
    if (icon && icon.path) {
      // Gunakan warna brand jika tersedia, atau warna dari icon
      const color = brandColor || (icon.hex ? `#${icon.hex}` : 'currentColor')
      return `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="skill-svg-icon">
        <title>${icon.title || iconKey}</title>
        <defs>
          <filter id="glow-${iconKey}">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path d="${icon.path}" fill="${color}" filter="url(#glow-${iconKey})" class="skill-icon-path"/>
      </svg>`
    }
  } catch (error) {
    console.warn(`Icon not found for: ${iconKey}`, error)
  }
  return ''
}

onMounted(() => {
  skills.value = skillsData.map(skill => ({
    name: skill.name,
    icon: getIconSVG(skill.iconKey, skill.color),
    iconKey: skill.iconKey,
    color: skill.color
  }))
  
  // Debug: log untuk melihat apakah icon ditemukan
  console.log('Skills loaded:', skills.value)
})
</script>

<style scoped>
.about {
  padding: 8rem 2rem;
  background: linear-gradient(180deg, #000000 0%, #1a0033 50%, #000000 100%);
  position: relative;
  overflow: hidden;
}

.about::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(157, 78, 221, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(199, 125, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.about::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #666666, transparent);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  text-align: center;
  margin-bottom: 5rem;
  color: #c77dff;
  font-weight: 800;
  position: relative;
  letter-spacing: -0.02em;
  text-shadow: 0 0 30px rgba(199, 125, 255, 0.5);
  z-index: 1;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #9d4edd, #c77dff, #9d4edd, transparent);
  border-radius: 2px;
  box-shadow: 0 0 20px rgba(199, 125, 255, 0.6);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.about-text p {
  font-size: clamp(1rem, 1.2vw, 1.15rem);
  line-height: 1.85;
  color: #e0c4ff;
  margin-bottom: 3rem;
  font-weight: 300;
  text-shadow: 0 0 10px rgba(224, 196, 255, 0.2);
}

.skills h3 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: #c77dff;
  font-weight: 700;
  text-align: center;
  position: relative;
  text-shadow: 0 0 20px rgba(199, 125, 255, 0.5);
}

.skills h3::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #c77dff, transparent);
  border-radius: 2px;
  box-shadow: 0 0 15px rgba(199, 125, 255, 0.6);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.skill-item {
  padding: 0.875rem 1rem;
  background: rgba(157, 78, 221, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.875rem;
  color: #e0c4ff;
  box-shadow: 0 2px 12px rgba(157, 78, 221, 0.2), 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1.5px solid rgba(199, 125, 255, 0.3);
  position: relative;
  overflow: visible;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-width: 0;
  text-align: center;
}

.skill-icon-wrapper {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.skill-icon-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(157, 78, 221, 0.2) 0%, rgba(199, 125, 255, 0.15) 100%);
  border: 2px solid rgba(199, 125, 255, 0.4);
  box-shadow: 
    0 3px 15px rgba(157, 78, 221, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.15),
    0 0 25px rgba(199, 125, 255, 0.3),
    inset 0 0 15px rgba(199, 125, 255, 0.1);
  backdrop-filter: blur(12px);
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
}

.skill-icon-bg::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    rgba(199, 125, 255, 0.1) 90deg,
    transparent 180deg,
    rgba(157, 78, 221, 0.1) 270deg,
    transparent 360deg
  );
  animation: rotate 8s linear infinite;
  opacity: 0.5;
}

.skill-icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  z-index: 3;
  padding: 10px;
  border-radius: 12px;
}

.skill-icon > * {
  width: 24px !important;
  height: 24px !important;
  max-width: 24px !important;
  max-height: 24px !important;
  min-width: 24px !important;
  min-height: 24px !important;
}

.skill-icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  border-radius: 50%;
  background: radial-gradient(circle, currentColor 0%, transparent 70%);
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 1;
  filter: blur(15px);
}

.skill-icon svg {
  width: 24px;
  height: 24px;
  max-width: 24px;
  max-height: 24px;
  min-width: 24px;
  min-height: 24px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: drop-shadow(0 0 8px currentColor);
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

.skill-icon svg .skill-icon-path {
  transition: all 0.4s ease;
}

.skill-code-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  overflow: hidden;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.skill-code-lines .code-line {
  position: absolute;
  left: 6px;
  width: 2px;
  height: 8px;
  background: linear-gradient(to bottom, transparent, rgba(199, 125, 255, 0.8), transparent);
  border-radius: 1px;
  animation: codePulse 2s ease-in-out infinite;
  box-shadow: 0 0 4px rgba(199, 125, 255, 0.6);
}

.skill-code-lines .code-line:nth-child(1) {
  top: 8px;
  animation-delay: 0s;
}

.skill-code-lines .code-line:nth-child(2) {
  top: 20px;
  animation-delay: 0.3s;
}

.skill-code-lines .code-line:nth-child(3) {
  top: 32px;
  animation-delay: 0.6s;
}

@keyframes codePulse {
  0%, 100% {
    opacity: 0.3;
    transform: scaleY(0.5);
  }
  50% {
    opacity: 1;
    transform: scaleY(1);
  }
}

.skill-icon-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 3;
}

.skill-icon-fallback svg {
  width: 24px;
  height: 24px;
  max-width: 24px;
  max-height: 24px;
  min-width: 24px;
  min-height: 24px;
  color: #c77dff;
  filter: drop-shadow(0 0 10px rgba(199, 125, 255, 0.9));
  transition: all 0.4s ease;
  flex-shrink: 0;
}

.skill-item:hover .skill-icon-fallback svg {
  filter: drop-shadow(0 0 15px rgba(199, 125, 255, 1)) brightness(1.3);
  transform: scale(1.1);
  color: #ffffff;
}

.skill-item:hover .skill-icon-fallback svg {
  filter: drop-shadow(0 0 15px rgba(199, 125, 255, 1)) brightness(1.3);
  transform: scale(1.1);
}

.skill-item:hover .skill-icon {
  transform: scale(1.15) rotate(5deg);
}

.skill-item:hover .skill-icon-bg {
  transform: scale(1.08);
  background: linear-gradient(135deg, rgba(157, 78, 221, 0.35) 0%, rgba(199, 125, 255, 0.25) 100%);
  border-color: rgba(199, 125, 255, 0.8);
  box-shadow: 
    0 6px 25px rgba(157, 78, 221, 0.6),
    inset 0 2px 0 rgba(255, 255, 255, 0.25),
    0 0 40px rgba(199, 125, 255, 0.6),
    inset 0 0 25px rgba(199, 125, 255, 0.2);
}

.skill-item:hover .skill-code-lines {
  opacity: 1;
}

.skill-item:hover .skill-icon-glow {
  width: 80px;
  height: 80px;
  opacity: 0.6;
}

.skill-item:hover .skill-icon svg {
  filter: drop-shadow(0 0 20px currentColor) brightness(1.3) saturate(1.5);
  transform: scale(1.15);
}


.skill-name {
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
  text-align: center;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.skill-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.08), transparent);
  transition: left 0.6s ease;
}

.skill-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 16px;
  padding: 2px;
  background: linear-gradient(135deg, #000000, #333333);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.skill-item:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 30px rgba(157, 78, 221, 0.5), 0 0 25px rgba(199, 125, 255, 0.3);
  border-color: rgba(199, 125, 255, 0.8);
  background: rgba(157, 78, 221, 0.2);
  color: #ffffff;
}

.skill-item:hover .skill-name {
  color: #ffffff;
}

.skill-item:hover::before {
  left: 100%;
}

.skill-item:hover::after {
  opacity: 1;
}

.about-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-placeholder {
  width: 280px;
  height: 280px;
  border-radius: 30px;
  background: linear-gradient(135deg, #000000 0%, #2d2d2d 50%, #1a1a1a 100%);
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 6rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.image-placeholder::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: rotate 15s linear infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 1024px) {
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 0.875rem;
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .about {
    padding: 4rem 1.5rem;
  }

  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .section-title {
    margin-bottom: 3rem;
    font-size: 2rem;
  }

  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    gap: 0.875rem;
    max-width: 100%;
    padding: 0;
  }

  .skill-item {
    padding: 0.75rem 0.875rem;
    font-size: 0.8rem;
    gap: 0.625rem;
  }

  .skill-icon-wrapper {
    width: 44px;
    height: 44px;
  }

  .skill-icon {
    padding: 8px;
    border-radius: 10px;
  }

  .skill-icon-bg {
    border-radius: 10px;
  }

  .skill-icon > * {
    width: 20px !important;
    height: 20px !important;
    max-width: 20px !important;
    max-height: 20px !important;
    min-width: 20px !important;
    min-height: 20px !important;
  }

  .skill-icon svg {
    width: 20px;
    height: 20px;
    max-width: 20px;
    max-height: 20px;
    min-width: 20px;
    min-height: 20px;
  }

  .skill-icon-fallback svg {
    width: 20px;
    height: 20px;
    max-width: 20px;
    max-height: 20px;
    min-width: 20px;
    min-height: 20px;
  }

  .skill-name {
    font-size: 0.75rem;
  }

  .image-placeholder {
    width: 200px;
    height: 200px;
    font-size: 4rem;
  }
}

@media (max-width: 480px) {
  .about {
    padding: 3rem 1rem;
  }

  .section-title {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }

  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    max-width: 100%;
    padding: 0;
  }

  .skill-item {
    padding: 0.75rem 0.5rem;
    font-size: 0.75rem;
    gap: 0.5rem;
    min-width: 0;
  }

  .skill-icon-wrapper {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
  }

  .skill-icon {
    padding: 6px;
  }

  .skill-icon-bg {
    border-radius: 8px;
  }

  .skill-icon > * {
    width: 18px !important;
    height: 18px !important;
    max-width: 18px !important;
    max-height: 18px !important;
    min-width: 18px !important;
    min-height: 18px !important;
  }

  .skill-icon svg {
    width: 18px;
    height: 18px;
    max-width: 18px;
    max-height: 18px;
    min-width: 18px;
    min-height: 18px;
  }

  .skill-icon-fallback svg {
    width: 18px;
    height: 18px;
    max-width: 18px;
    max-height: 18px;
    min-width: 18px;
    min-height: 18px;
  }

  .skill-name {
    font-size: 0.7rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

@media (max-width: 360px) {
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 0.625rem;
  }

  .skill-item {
    padding: 0.625rem 0.75rem;
    flex-direction: row;
    justify-content: flex-start;
  }

  .skill-name {
    text-align: left;
  }
}
</style>
