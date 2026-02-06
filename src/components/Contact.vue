<template>
  <section id="contact" class="contact">
    <div class="container">
      <h2 class="section-title">Contact Me</h2>
      <div class="contact-content">
        <div class="contact-info">
          <p>{{ contactText }}</p>
          <div class="contact-items">
            <div v-for="item in contactItems" :key="item.type" class="contact-item">
              <span class="contact-icon">{{ item.icon }}</span>
              <div>
                <h4>{{ item.label }}</h4>
                <a :href="item.link" target="_blank">{{ item.value }}</a>
              </div>
            </div>
          </div>
        </div>
        <form class="contact-form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="form.name" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" required />
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" v-model="form.message" rows="5" required></textarea>
          </div>
          <button type="submit" class="btn-submit" :disabled="isLoading">
            <span v-if="!isLoading">Send Message</span>
            <span v-else>Sending...</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

const contactText = 'I am always open to discussing new projects, collaboration opportunities, or just chatting about technology. Feel free to reach out to me!'

const contactItems = [
  { type: 'email', icon: '✉️', label: 'Email', value: 'amarmahdin01@gmail.com', link: 'mailto:amarmahdin01@gmail.com' },
  { type: 'github', icon: '📱', label: 'GitHub', value: 'github.com/amarmahdin', link: 'https://github.com/amarmahdin' },
  { type: 'linkedin', icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/muhammadamarmahdin', link: 'https://www.linkedin.com/in/muhammad-amar-mahdin-st-mos-mcf-962b9a2a0/' }
]

const form = ref({
  name: '',
  email: '',
  message: ''
})

const isLoading = ref(false)

// EmailJS Configuration
// Ganti dengan Public Key, Service ID, dan Template ID dari EmailJS Anda
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY' // Dapatkan dari EmailJS Dashboard
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID' // Dapatkan dari EmailJS Dashboard
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID' // Dapatkan dari EmailJS Dashboard

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY)

const handleSubmit = async () => {
  if (!form.value.name || !form.value.email || !form.value.message) {
    alert('Please fill in all fields.')
    return
  }

  isLoading.value = true

  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: form.value.name,
        from_email: form.value.email,
        message: form.value.message,
        to_email: 'amarmahdin01@gmail.com' // Email tujuan Anda
      }
    )

    alert('Thank you! Your message has been sent successfully.')
    form.value = { name: '', email: '', message: '' }
  } catch (error) {
    console.error('EmailJS Error:', error)
    alert('Sorry, there was an error sending your message. Please try again later or contact me directly via email.')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.contact {
  padding: 8rem 2rem;
  background: linear-gradient(180deg, #000000 0%, #1a0033 50%, #000000 100%);
  position: relative;
  overflow: hidden;
}

.contact::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 50% 50%, rgba(157, 78, 221, 0.1) 0%, transparent 70%);
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

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  position: relative;
  z-index: 1;
}

.contact-info p {
  font-size: clamp(1rem, 1.2vw, 1.15rem);
  line-height: 1.85;
  color: #e0c4ff;
  margin-bottom: 2.5rem;
  font-weight: 300;
  text-shadow: 0 0 10px rgba(224, 196, 255, 0.2);
}

.contact-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact-icon {
  font-size: 2rem;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(157, 78, 221, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  box-shadow: 0 4px 20px rgba(157, 78, 221, 0.3), 0 1px 3px rgba(0, 0, 0, 0.3);
  border: 1.5px solid rgba(199, 125, 255, 0.4);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.contact-item:hover .contact-icon {
  transform: scale(1.12) rotate(5deg);
  box-shadow: 0 8px 40px rgba(157, 78, 221, 0.6), 0 0 30px rgba(199, 125, 255, 0.4);
  background: rgba(157, 78, 221, 0.3);
  border-color: rgba(199, 125, 255, 0.8);
}

.contact-item h4 {
  margin: 0 0 0.25rem 0;
  color: #c77dff;
  text-shadow: 0 0 10px rgba(199, 125, 255, 0.4);
}

.contact-item a {
  color: #e0c4ff;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
}

.contact-item a:hover {
  color: #ffffff;
  transform: translateX(5px);
  text-shadow: 0 0 15px rgba(199, 125, 255, 0.6);
}

.contact-form {
  background: rgba(157, 78, 221, 0.1);
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(157, 78, 221, 0.3), 0 1px 4px rgba(0, 0, 0, 0.3);
  border: 1.5px solid rgba(199, 125, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.contact-form::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #9d4edd, #c77dff, #9d4edd);
  box-shadow: 0 0 20px rgba(199, 125, 255, 0.6);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #c77dff;
  font-weight: 500;
  text-shadow: 0 0 10px rgba(199, 125, 255, 0.4);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem 1.25rem;
  border: 1.5px solid rgba(199, 125, 255, 0.3);
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  background: rgba(157, 78, 221, 0.1);
  color: #e0c4ff;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(224, 196, 255, 0.5);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: rgba(199, 125, 255, 0.8);
  background: rgba(157, 78, 221, 0.15);
  box-shadow: 0 0 0 4px rgba(157, 78, 221, 0.2), 0 0 20px rgba(199, 125, 255, 0.3);
  transform: translateY(-2px);
}

.btn-submit {
  width: 100%;
  padding: 1.125rem;
  background: linear-gradient(135deg, #9d4edd 0%, #7b2cbf 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 20px rgba(157, 78, 221, 0.4), 0 0 30px rgba(157, 78, 221, 0.2);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
  border: 1px solid rgba(199, 125, 255, 0.3);
}

.btn-submit::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn-submit:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 40px rgba(157, 78, 221, 0.6), 0 0 50px rgba(199, 125, 255, 0.3);
  background: linear-gradient(135deg, #c77dff 0%, #9d4edd 100%);
}

.btn-submit:hover::before {
  left: 100%;
}

.btn-submit:active {
  transform: translateY(0);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 768px) {
  .contact {
    padding: 4rem 1.5rem;
  }

  .section-title {
    margin-bottom: 3rem;
    font-size: 2rem;
  }

  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact-form {
    padding: 2rem;
  }

  .contact-icon {
    width: 56px;
    height: 56px;
    font-size: 1.75rem;
  }

  .contact-item h4 {
    font-size: 0.95rem;
  }

  .contact-item a {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .contact {
    padding: 3rem 1rem;
  }

  .section-title {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }

  .contact-form {
    padding: 1.5rem;
  }

  .contact-icon {
    width: 48px;
    height: 48px;
    font-size: 1.5rem;
  }

  .form-group input,
  .form-group textarea {
    padding: 0.875rem 1rem;
    font-size: 0.9rem;
  }

  .btn-submit {
    padding: 1rem;
    font-size: 0.9rem;
  }
}
</style>
