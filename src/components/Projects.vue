<template>
  <section id="projects" class="projects">
    <div class="container">
      <h2 class="section-title">My Projects</h2>
      <div class="projects-grid">
        <div v-for="project in projects" :key="project.id" class="project-card">
          <div class="project-image" @click="project.images ? openModal(project) : null" :class="{ 'clickable': project.images }">
            <img v-if="project.thumbnail" :src="project.thumbnail" :alt="project.title" class="project-thumbnail" />
            <div v-else class="image-placeholder">
              <span>{{ project.emoji }}</span>
            </div>
            <div v-if="project.images" class="view-gallery-hint">
              <span>Click to view gallery</span>
            </div>
          </div>
          <div class="project-content">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <div class="project-tech">
              <span v-for="tech in project.tech" :key="tech" class="tech-tag">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Gallery Modal -->
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">&times;</button>
        <div class="carousel-container">
          <button class="carousel-btn carousel-prev" @click="prevImage" :disabled="currentImageIndex === 0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div 
            class="carousel-image-wrapper"
            @touchstart="handleTouchStart"
            @touchend="handleTouchEnd"
          >
            <img 
              :src="currentImage" 
              :alt="`${currentProject?.title} - Image ${currentImageIndex + 1}`"
              class="carousel-image"
            />
            <div class="carousel-counter">
              {{ currentImageIndex + 1 }} / {{ currentProject?.images?.length || 0 }}
            </div>
          </div>
          <button 
            class="carousel-btn carousel-next" 
            @click="nextImage" 
            :disabled="currentImageIndex === (currentProject?.images?.length - 1 || 0)"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Import images untuk SIMASET
import S1 from '@/assets/S1.png'
import S2 from '@/assets/S2.png'
import S3 from '@/assets/S3.png'
import S4 from '@/assets/S4.png'
import S5 from '@/assets/S5.png'
import S6 from '@/assets/S6.png'
import S7 from '@/assets/S7.png'
import S8 from '@/assets/S8.png'
import S9 from '@/assets/S9.png'
import SH1 from '@/assets/SH1.png'
import SH2 from '@/assets/SH2.png'

// Import images untuk DIAMOND
import D1 from '@/assets/D1.png'
import D2 from '@/assets/D2.png'
import D3 from '@/assets/D3.png'
import D4 from '@/assets/D4.png'
import D5 from '@/assets/D5.png'
import D6 from '@/assets/D6.png'
import D7 from '@/assets/D7.png'
import D8 from '@/assets/D8.png'
import D9 from '@/assets/D9.png'

// Import images untuk OASIS DESTINATION
import O1 from '@/assets/O1.png'
import O2 from '@/assets/O2.png'
import O3 from '@/assets/O3.png'
import O4 from '@/assets/O4.png'
import O5 from '@/assets/O5.png'
import O6 from '@/assets/O6.png'
import O7 from '@/assets/O7.png'

// Import images untuk AspalKita
import A1 from '@/assets/A1.png'
import A2 from '@/assets/A2.png'
import A3 from '@/assets/A3.png'
import A4 from '@/assets/A4.png'
import A5 from '@/assets/A5.png'

const simasetImages = [S1, S2, S3, S4, S5, S6, S7, S8, S9, SH1, SH2]
const diamondImages = [D1, D2, D3, D4, D5, D6, D7, D8, D9]
const oasisImages = [O1, O2, O3, O4, O5, O6, O7]
const aspalkitaImages = [A1, A2, A3, A4, A5]

const projects = [
  {
    id: 1,
    title: 'SIMASET',
    description: 'SIMASET is an integrated platform (Web & Mobile) designed to digitize company operational processes, specifically in fleet vehicle management, driver assignment, as well as operational fund management (e-wallet) and employee reimbursement in real-time.',
    tech: ['Node.js', 'Express.js', 'MySQL', 'React.js', 'Vite', 'Tailwind CSS', 'Flutter'],
    thumbnail: S1,
    images: simasetImages,
    demo: '#',
    github: '#'
  },
  {
    id: 2,
    title: 'DIAMOND',
    description: 'Diamond is a modern web application designed to digitize and streamline the business cooperation lifecycle. The system facilitates the entire workflow from drafting, submission, to approval of MoU (Memorandum of Understanding) and PKS (Cooperation Agreement) documents in a centralized and transparent manner.',
    tech: ['Vue.js 3', 'Vite', 'Tailwind CSS', 'JavaScript'],
    thumbnail: D1,
    images: diamondImages,
    demo: '#',
    github: '#'
  },
  {
    id: 3,
    title: 'OASIS DESTINATION',
    description: 'Oasis Destinations is a full-stack web-based tourism platform designed to help users explore and book natural tourism destinations such as beaches, mountains, and waterfalls. The application also features a comprehensive admin panel for content and user management.',
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MySQL'],
    thumbnail: O1,
    images: oasisImages,
    demo: '#',
    github: '#'
  },
  {
    id: 4,
    title: 'AspalKita',
    description: 'AspalKita is a web-based platform designed to facilitate community participation in reporting road infrastructure damage in real-time. The application bridges communication between citizens and local government to accelerate repair processes and improve regional development transparency.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    thumbnail: A1,
    images: aspalkitaImages,
    demo: '#',
    github: '#'
  }
]

const isModalOpen = ref(false)
const currentProject = ref(null)
const currentImageIndex = ref(0)

const currentImage = computed(() => {
  if (currentProject.value && currentProject.value.images) {
    return currentProject.value.images[currentImageIndex.value]
  }
  return null
})

const openModal = (project) => {
  currentProject.value = project
  currentImageIndex.value = 0
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  currentProject.value = null
  currentImageIndex.value = 0
  document.body.style.overflow = ''
}

const nextImage = () => {
  if (currentProject.value && currentImageIndex.value < currentProject.value.images.length - 1) {
    currentImageIndex.value++
  }
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

// Keyboard navigation
const handleKeyPress = (e) => {
  if (!isModalOpen.value) return
  
  if (e.key === 'ArrowRight') {
    nextImage()
  } else if (e.key === 'ArrowLeft') {
    prevImage()
  } else if (e.key === 'Escape') {
    closeModal()
  }
}

// Touch/swipe support
let touchStartX = 0
let touchEndX = 0

const handleTouchStart = (e) => {
  touchStartX = e.changedTouches[0].screenX
}

const handleTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
}

const handleSwipe = () => {
  if (touchEndX < touchStartX - 50) {
    nextImage()
  }
  if (touchEndX > touchStartX + 50) {
    prevImage()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.projects {
  padding: 8rem 2rem;
  background: linear-gradient(180deg, #000000 0%, #1a0033 50%, #000000 100%);
  position: relative;
  overflow: hidden;
}

.projects::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 30% 20%, rgba(199, 125, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(157, 78, 221, 0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 1;
}

.project-card {
  background: rgba(157, 78, 221, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(157, 78, 221, 0.2), 0 1px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1.5px solid rgba(199, 125, 255, 0.3);
  position: relative;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.02) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 1;
}

.project-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 20px 60px rgba(157, 78, 221, 0.5), 0 8px 40px rgba(199, 125, 255, 0.3), 0 0 50px rgba(157, 78, 221, 0.2);
  border-color: rgba(199, 125, 255, 0.8);
  background: rgba(157, 78, 221, 0.15);
}

.project-card:hover::before {
  opacity: 1;
}

.project-image {
  width: 100%;
  height: 220px;
  background: linear-gradient(135deg, #000000 0%, #2d2d2d 50%, #1a1a1a 100%);
  background-size: 200% 200%;
  animation: gradientShift 10s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.project-image.clickable {
  cursor: pointer;
}

.project-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transition: transform 0.3s ease;
  background: linear-gradient(135deg, #000000 0%, #2d2d2d 50%, #1a1a1a 100%);
}

.project-image.clickable:hover .project-thumbnail {
  transform: scale(1.05);
}

.view-gallery-hint {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem;
  text-align: center;
  font-size: 0.875rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-image.clickable:hover .view-gallery-hint {
  opacity: 1;
}

.project-image::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
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

.image-placeholder {
  font-size: 4rem;
}

.project-content {
  padding: 2rem;
  position: relative;
  z-index: 2;
}

.project-content h3 {
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  margin-bottom: 1rem;
  color: #c77dff;
  font-weight: 800;
  letter-spacing: -0.01em;
  text-shadow: 0 0 20px rgba(199, 125, 255, 0.4);
}

.project-content p {
  color: #e0c4ff;
  line-height: 1.75;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  font-weight: 300;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  padding: 0.5rem 1.125rem;
  background: rgba(157, 78, 221, 0.2);
  border-radius: 20px;
  font-size: 0.85rem;
  color: #e0c4ff;
  font-weight: 600;
  border: 1.5px solid rgba(199, 125, 255, 0.4);
  transition: all 0.3s ease;
  letter-spacing: 0.01em;
  box-shadow: 0 2px 10px rgba(157, 78, 221, 0.2);
}

.tech-tag:hover {
  background: #000000;
  color: #ffffff;
  border-color: #000000;
  transform: scale(1.05);
}


/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 2rem;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  position: relative;
  max-width: 70vw;
  max-height: 80vh;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 1.75rem;
  font-weight: 300;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  line-height: 1;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.9);
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.modal-close:active {
  transform: scale(1.05);
}

.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.carousel-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: pan-y;
}

.carousel-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  user-select: none;
}

.carousel-counter {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  backdrop-filter: blur(10px);
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(12px);
  z-index: 10001;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.carousel-btn svg {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.carousel-btn:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.8);
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.carousel-btn:hover:not(:disabled) svg {
  transform: scale(1.1);
}

.carousel-btn:active:not(:disabled) {
  transform: translateY(-50%) scale(1.05);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.4);
}

.carousel-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.1);
}

.carousel-prev {
  left: 1rem;
}

.carousel-next {
  right: 1rem;
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
  .projects {
    padding: 4rem 1.5rem;
  }

  .section-title {
    margin-bottom: 3rem;
    font-size: 2rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .project-card {
    border-radius: 20px;
  }

  .project-content {
    padding: 1.5rem;
  }

  .project-content h3 {
    font-size: 1.25rem;
  }

  .project-content p {
    font-size: 0.9rem;
  }

  .modal-overlay {
    padding: 1rem;
  }

  .modal-content {
    max-width: 95vw;
    max-height: 90vh;
    border-radius: 12px;
  }

  .carousel-image {
    max-height: 75vh;
  }

  .carousel-btn {
    width: 48px;
    height: 48px;
  }

  .carousel-btn svg {
    width: 20px;
    height: 20px;
  }

  .carousel-prev {
    left: 0.5rem;
  }

  .carousel-next {
    right: 0.5rem;
  }

  .modal-close {
    top: 0.5rem;
    right: 0.5rem;
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
    border-width: 2px;
  }
}

@media (max-width: 480px) {
  .projects {
    padding: 3rem 1rem;
  }

  .section-title {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }

  .project-content {
    padding: 1.25rem;
  }

  .project-content h3 {
    font-size: 1.1rem;
  }

  .project-content p {
    font-size: 0.85rem;
  }

  .tech-tag {
    padding: 0.4rem 0.875rem;
    font-size: 0.75rem;
  }

  .modal-content {
    max-width: 98vw;
    max-height: 95vh;
  }

  .carousel-btn {
    width: 40px;
    height: 40px;
  }

  .carousel-btn svg {
    width: 18px;
    height: 18px;
  }
}
</style>
