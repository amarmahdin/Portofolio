import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/Home.vue'),
      meta: { title: 'Home' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../components/Aboutme.vue'),
      meta: { title: 'About' },
    },
    {
      path: '/achievements',
      name: 'achievements',
      component: () => import('../components/Achievements.vue'),
      meta: { title: 'Achievements' },
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../components/Projects.vue'),
      meta: { title: 'Projects' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../components/Contact.vue'),
      meta: { title: 'Contact' },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const pageTitle = to.meta.title ? `${to.meta.title} | ` : ''
  document.title = `${pageTitle}Portofolio - amarmahdin`
})

export default router
