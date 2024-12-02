import Auth from '@/pages/Auth.vue'
import AuthLogin from '@/pages/AuthLogin.vue'
import AuthRegister from '@/pages/AuthRegister.vue'
import Cards from '@/pages/Cards.vue'
import DeckDetails from '@/pages/DeckDetails.vue'
import DecksOverview from '@/pages/DecksOverview.vue'
import Home from '@/pages/Home.vue'
import Main from '@/pages/Main.vue'
import { useUsersStore } from '@/stores/users/user.store'
import { createRouter, createWebHistory } from 'vue-router/auto'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Main,
      redirect(to) {
        return { name: 'home' }
      },
      children: [
        { path: 'home', name: 'home', component: Home },
        { path: 'decks', name: 'decks', component: DecksOverview },
        { path: 'decks/:id', component: DeckDetails },
        { path: 'imports', component: DeckDetails },
        { path: 'imports/:id', component: DeckDetails },
        { path: 'cards', name: 'cards', component: Cards }
      ],
    },
    {
      path: '/auth', component: Auth, children: [
        { path: 'login', name: 'login', component: AuthLogin },
        { path: 'register', name: 'register', component: AuthRegister }
      ]
    }

  ]
})

router.beforeEach(async (to, from) => {
  const userStore = useUsersStore()
  const publicPaths = ['/auth/login', '/auth/register']

  if (!userStore.isAuthenticated() && !publicPaths.some(path => path === to.path)) {
    return { path: '/auth/login' }
  }
});

router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
