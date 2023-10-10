import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '@/views/LoginForm.vue'
import SignupForm from '@/views/SignupForm.vue'
import ChatsView from '@/views/ChatsView.vue'
import { useAuthStore } from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/chats',
      name: 'chats',
      component: ChatsView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginForm
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupForm
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to) => {
  const store = useAuthStore()
  if (!store.isAuth && to.meta.requiresAuth) {
    return { name: 'login' }
  }
})

export default router
