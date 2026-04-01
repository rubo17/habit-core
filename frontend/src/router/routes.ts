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
      }
    ]
  }
]