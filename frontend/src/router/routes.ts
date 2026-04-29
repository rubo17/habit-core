import AuthLayout from '@/layouts/AuthLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import LoginView from '@/modules/auth/views/LoginView.vue'
import SettingsView from '@/modules/settings/views/SettingsView.vue'

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
        path: 'stats',
        name: 'stats',
        component: () => import('@/modules/stats/views/StatsView.vue')
      },
      {
        path: 'settings',
        name: 'settings',
        component:SettingsView
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
        component:LoginView
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/modules/auth/views/RegisterView.vue')
      },
      {
        path: 'callback',
        name: 'auth-callback',
        component: () => import('@/modules/auth/views/AuthCallbackView.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue')
  }
]