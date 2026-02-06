<template>
  <section id="home" class="hero">
    <!-- Animated Background Particles -->
    <div class="particles">
      <div v-for="i in 50" :key="i" class="particle" :style="getParticleStyle(i)"></div>
    </div>
    
    <!-- Grid Background -->
    <div class="grid-background"></div>
    
    <!-- Code Rain Effect -->
    <div class="code-rain">
      <div v-for="i in 20" :key="i" class="code-line" :style="getCodeLineStyle(i)"></div>
    </div>
    
    <div class="hero-content">
      <div class="hero-text">
        <h1 class="hero-title">
          <span class="greeting">
            <span class="code-bracket">&lt;</span>Hallo, I am<span class="code-bracket">/&gt;</span>
          </span>
          <span class="name">{{ name }}</span>
          <span class="role">
            <span class="typing-text">{{ typedRole }}</span><span class="cursor">|</span>
          </span>
        </h1>
        <p class="hero-description">{{ description }}</p>
        <div class="hero-buttons">
          <a href="#projects" class="btn btn-primary" @click="scrollTo('projects')">
            <span>View Projects</span>
            <span class="btn-glow"></span>
          </a>
          <a href="#contact" class="btn btn-secondary" @click="scrollTo('contact')">
            <span>Contact Me</span>
            <span class="btn-glow"></span>
          </a>
        </div>
        <div class="social-links">
          <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" :aria-label="social.name" class="social-link">
            <span>{{ social.icon }}</span>
            <span class="social-glow"></span>
          </a>
        </div>
      </div>
      <div class="hero-image">
        <div class="image-placeholder">
          <div class="image-glow"></div>
          <img :src="fotoProfil" alt="Profile Photo" />
          <div class="scan-line"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import fotoProfil from '@/assets/fotoku.png'

const name = 'Amar Mahdin'
const role = 'Full Stack & Mobile Developer'
const description = 'I am a passionate Full Stack & Mobile developer dedicated to creating attractive and functional websites and mobile applications using modern technologies.'

const socials = [
  { name: 'GitHub', url: 'https://github.com/amarmahdin', icon: '🔗' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/muhammad-amar-mahdin-st-mos-mcf-962b9a2a0/', icon: '💼' },
  { name: 'Email', url: 'mailto:amarmahdin01@gmail.com', icon: '✉️' }
]

const typedRole = ref('')
let typingInterval = null

const scrollTo = (section) => {
  const element = document.getElementById(section)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Typing animation
const typeText = () => {
  let index = 0
  typedRole.value = ''
  
  typingInterval = setInterval(() => {
    if (index < role.length) {
      typedRole.value += role[index]
      index++
    } else {
      clearInterval(typingInterval)
      // Restart after 3 seconds
      setTimeout(() => {
        typedRole.value = ''
        index = 0
        typeText()
      }, 3000)
    }
  }, 100)
}

// Particle styles
const getParticleStyle = (index) => {
  const size = Math.random() * 3 + 1
  const left = Math.random() * 100
  const animationDelay = Math.random() * 20
  const animationDuration = Math.random() * 10 + 10
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDelay: `${animationDelay}s`,
    animationDuration: `${animationDuration}s`
  }
}

// Code line styles
const getCodeLineStyle = (index) => {
  const left = Math.random() * 100
  const animationDelay = Math.random() * 5
  const animationDuration = Math.random() * 3 + 2
  
  return {
    left: `${left}%`,
    animationDelay: `${animationDelay}s`,
    animationDuration: `${animationDuration}s`
  }
}

onMounted(() => {
  typeText()
})

onUnmounted(() => {
  if (typingInterval) {
    clearInterval(typingInterval)
  }
})
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 8rem 2rem 4rem;
  background: linear-gradient(135deg, #000000 0%, #1a0033 30%, #2d1b4e 60%, #000000 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  color: white;
  position: relative;
  overflow: hidden;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Grid Background */
.grid-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(138, 43, 226, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(138, 43, 226, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.3;
  z-index: 0;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

/* Particles */
.particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
}

.particle {
  position: absolute;
  background: rgba(138, 43, 226, 0.6);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(138, 43, 226, 0.8), 0 0 20px rgba(138, 43, 226, 0.4);
  animation: floatParticle linear infinite;
}

@keyframes floatParticle {
  0% {
    transform: translateY(100vh) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) translateX(50px);
    opacity: 0;
  }
}

/* Code Rain */
.code-rain {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.code-line {
  position: absolute;
  width: 2px;
  height: 30px;
  background: linear-gradient(to bottom, transparent, rgba(138, 43, 226, 0.5), transparent);
  animation: codeFall linear infinite;
  box-shadow: 0 0 10px rgba(138, 43, 226, 0.6);
}

@keyframes codeFall {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}


@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
}

.hero-text {
  animation: fadeInUp 0.8s ease;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.1;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  letter-spacing: -0.02em;
}

.greeting {
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 400;
  opacity: 0.9;
  color: #9d4edd;
  text-shadow: 0 0 20px rgba(157, 78, 221, 0.5);
}

.code-bracket {
  color: #c77dff;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(199, 125, 255, 0.8);
}

.name {
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #c77dff 50%, #9d4edd 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s linear infinite;
  letter-spacing: -0.03em;
  margin: 0.5rem 0;
  filter: drop-shadow(0 0 30px rgba(157, 78, 221, 0.5));
}

@keyframes shimmer {
  to { background-position: 200% center; }
}

.role {
  font-size: clamp(1.25rem, 2.5vw, 2rem);
  color: #c77dff;
  margin-top: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-shadow: 0 0 20px rgba(199, 125, 255, 0.6);
}

.typing-text {
  font-family: 'Courier New', monospace;
}

.cursor {
  display: inline-block;
  width: 3px;
  height: 1.2em;
  background: #c77dff;
  margin-left: 4px;
  animation: blink 1s infinite;
  box-shadow: 0 0 10px rgba(199, 125, 255, 0.8);
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.hero-description {
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  line-height: 1.75;
  margin-bottom: 2.5rem;
  color: #e0c4ff;
  max-width: 600px;
  font-weight: 300;
  text-shadow: 0 0 10px rgba(224, 196, 255, 0.3);
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.btn {
  padding: 1rem 2.5rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: inline-block;
  cursor: pointer;
  position: relative;
  z-index: 10;
  letter-spacing: 0.5px;
  overflow: hidden;
}

.btn-primary {
  background: linear-gradient(135deg, #9d4edd 0%, #7b2cbf 100%);
  color: #ffffff;
  box-shadow: 0 4px 20px rgba(157, 78, 221, 0.4), 0 0 30px rgba(157, 78, 221, 0.2);
  border: 1px solid rgba(199, 125, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 40px rgba(157, 78, 221, 0.6), 0 0 50px rgba(157, 78, 221, 0.3);
  background: linear-gradient(135deg, #c77dff 0%, #9d4edd 100%);
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(199, 125, 255, 0.4);
  transition: width 0.6s ease, height 0.6s ease;
}

.btn-primary:hover .btn-glow {
  width: 300px;
  height: 300px;
}

.btn-secondary {
  background: rgba(157, 78, 221, 0.1);
  backdrop-filter: blur(10px);
  color: #c77dff;
  border: 2px solid rgba(199, 125, 255, 0.4);
  box-shadow: 0 4px 20px rgba(157, 78, 221, 0.3), inset 0 0 20px rgba(199, 125, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.btn-secondary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(199, 125, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.btn-secondary:hover {
  background: rgba(157, 78, 221, 0.2);
  border-color: rgba(199, 125, 255, 0.7);
  transform: translateY(-3px);
  box-shadow: 0 8px 40px rgba(157, 78, 221, 0.5), 0 0 50px rgba(199, 125, 255, 0.2);
  color: #ffffff;
}

.btn-secondary:hover::before {
  left: 100%;
}

.btn-secondary:hover .btn-glow {
  width: 300px;
  height: 300px;
}

.social-links {
  display: flex;
  gap: 1.5rem;
}

.social-links a {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(157, 78, 221, 0.1);
  backdrop-filter: blur(12px);
  border: 1.5px solid rgba(199, 125, 255, 0.3);
  border-radius: 50%;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-decoration: none;
  font-size: 1.5rem;
  box-shadow: 0 4px 20px rgba(157, 78, 221, 0.3), inset 0 1px 0 rgba(199, 125, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.social-links a:hover {
  background: rgba(157, 78, 221, 0.2);
  transform: translateY(-6px) scale(1.12);
  box-shadow: 0 10px 40px rgba(157, 78, 221, 0.6), 0 0 30px rgba(199, 125, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  border-color: rgba(199, 125, 255, 0.7);
}

.social-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(199, 125, 255, 0.3);
  transition: width 0.6s ease, height 0.6s ease;
}

.social-links a:hover .social-glow {
  width: 100px;
  height: 100px;
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 1s ease;
}

.image-placeholder {
  width: 380px;
  height: 380px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(157, 78, 221, 0.15) 0%, rgba(199, 125, 255, 0.1) 100%);
  backdrop-filter: blur(20px);
  border: 4px solid transparent;
  background-clip: padding-box;
  box-shadow: 
    0 0 0 4px rgba(157, 78, 221, 0.3),
    0 0 0 8px rgba(199, 125, 255, 0.2),
    0 20px 60px rgba(157, 78, 221, 0.5),
    inset 0 0 80px rgba(199, 125, 255, 0.15),
    0 0 100px rgba(157, 78, 221, 0.4);
  position: relative;
  animation: float 6s ease-in-out infinite, pulseGlow 3s ease-in-out infinite;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 
      0 0 0 4px rgba(157, 78, 221, 0.3),
      0 0 0 8px rgba(199, 125, 255, 0.2),
      0 20px 60px rgba(157, 78, 221, 0.5),
      inset 0 0 80px rgba(199, 125, 255, 0.15),
      0 0 100px rgba(157, 78, 221, 0.4);
  }
  50% {
    box-shadow: 
      0 0 0 6px rgba(157, 78, 221, 0.5),
      0 0 0 12px rgba(199, 125, 255, 0.3),
      0 25px 80px rgba(157, 78, 221, 0.7),
      inset 0 0 100px rgba(199, 125, 255, 0.25),
      0 0 150px rgba(157, 78, 221, 0.6);
  }
}

.image-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(199, 125, 255, 0.3) 0%, transparent 70%);
  animation: rotate 15s linear infinite;
  z-index: -1;
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(199, 125, 255, 0.8), transparent);
  animation: scan 3s linear infinite;
  box-shadow: 0 0 20px rgba(199, 125, 255, 0.6);
}

@keyframes scan {
  0% { top: 0; opacity: 1; }
  50% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

.image-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  border-radius: 50%;
  padding: 15px;
  position: relative;
  z-index: 1;
  transition: all 0.4s ease;
  display: block;
}

.image-placeholder:hover img {
  transform: scale(1.02);
  padding: 12px;
}

.image-placeholder::before {
  content: '';
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    rgba(157, 78, 221, 0.8) 0deg,
    rgba(199, 125, 255, 0.6) 90deg,
    rgba(157, 78, 221, 0.8) 180deg,
    rgba(199, 125, 255, 0.6) 270deg,
    rgba(157, 78, 221, 0.8) 360deg
  );
  z-index: -1;
  animation: rotate 8s linear infinite;
  opacity: 0.6;
}

.image-placeholder::after {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(199, 125, 255, 0.4) 0%,
    transparent 50%
  );
  z-index: 0;
  animation: rotate 12s linear infinite reverse;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .name {
    font-size: 3rem;
  }

  .role {
    font-size: 1.5rem;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .image-placeholder {
    width: 280px;
    height: 280px;
  }

  .image-placeholder img {
    width: 100%;
    height: 100%;
    padding: 12px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 6rem 1rem 3rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .name {
    font-size: 2.5rem;
  }

  .role {
    font-size: 1.25rem;
  }

  .hero-description {
    font-size: 0.9rem;
  }

  .btn {
    padding: 0.875rem 2rem;
    font-size: 0.9rem;
  }

  .image-placeholder {
    width: 240px;
    height: 240px;
  }

  .particles {
    display: none;
  }

  .code-rain {
    display: none;
  }
}
</style>
