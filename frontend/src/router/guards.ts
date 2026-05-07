import type { Router } from 'vue-router'

const PUBLIC_ROUTES = ['login', 'register', 'auth-callback']

export function setupGuards(router: Router) {
  router.beforeEach((to) => {
    const isAuthenticated = !!localStorage.getItem('token')
    const isPublic = PUBLIC_ROUTES.includes(to.name as string)
    if (to.path === '/') {
      return { name: 'habits' }
    }

    if (!isAuthenticated && !isPublic) {
      return { name: 'login' }
    }

    if (isAuthenticated && isPublic) {
      return { name: 'habits' }
    }
  })
}
