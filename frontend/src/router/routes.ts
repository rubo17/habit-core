import AuthLayout from '@/layouts/AuthLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'

export const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'habits',
        name: 'habits',
        component: () => import('@/modules/habits/views/HabitView.vue')
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/modules/settings/views/SettingsView.vue')
      }
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/modules/auth/views/LoginView.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/modules/auth/views/RegisterView.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue')
  }
]