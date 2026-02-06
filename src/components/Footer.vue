<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; {{ currentYear }} {{ name }}</p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const name = 'Amarmahdin Portofolio'
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #000000 0%, #1a0033 50%, #000000 100%);
  color: white;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.footer::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(199, 125, 255, 0.5), transparent);
  box-shadow: 0 0 20px rgba(199, 125, 255, 0.3);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.container p {
  color: rgba(224, 196, 255, 0.8);
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  text-shadow: 0 0 10px rgba(199, 125, 255, 0.3);
}

@media (max-width: 768px) {
  .footer {
    padding: 1.5rem 1rem;
  }

  .container p {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 1rem 0.75rem;
  }

  .container p {
    font-size: 0.8rem;
  }
}
</style>
