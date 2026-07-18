import { createRouter, createWebHistory } from 'vue-router'

function resetPageScroll() {
  if (window.matchMedia('(max-width: 767px)').matches) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
    return
  }

  document.querySelectorAll('main .page-scroll').forEach((el) => {
    el.scrollTop = 0
  })
}

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
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        resetPageScroll()
        resolve(false)
      })
    })
  },
})

router.afterEach((to) => {
  const pageTitle = to.meta.title ? `${to.meta.title} | ` : ''
  document.title = `${pageTitle}Portofolio - amarmahdin`
})

export default router
