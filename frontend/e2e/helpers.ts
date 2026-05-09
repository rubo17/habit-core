import type { Page } from '@playwright/test'

export const MOCK_USER = { id: 1, name: 'Test User', email: 'test@example.com' }

export const MOCK_HABITS = [
  {
    id: 1, user_id: 1, category_id: null, category: null,
    name: 'Correr', reminder_times: null, scheduled_for_today: true,
    target_days: null, color: '#6366f1', icon: 'running',
    today_logged: false, deleted_at: null,
    created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 2, user_id: 1, category_id: 1, category: { id: 1, name: 'Fitness' },
    name: 'Meditar', reminder_times: null, scheduled_for_today: true,
    target_days: [1, 2, 3, 4, 5], color: '#22c55e', icon: 'brain',
    today_logged: true, deleted_at: null,
    created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z',
  },
]

export const MOCK_CATEGORIES = [{ id: 1, name: 'Fitness', icon: 'dumbbell' }]

export const MOCK_STATS = {
  today_progress: { completed: 1, total: 2 },
  consistency_rate: 75,
  habits: [
    { id: 1, name: 'Correr', color: '#6366f1', icon: 'running', rate: 75, current_streak: 3, completed_days: 15, eligible_days: 20 },
    { id: 2, name: 'Meditar', color: '#22c55e', icon: 'brain', rate: 100, current_streak: 7, completed_days: 20, eligible_days: 20 },
  ],
  daily_trend: [
    { date: '2024-01-01', rate: 100 },
    { date: '2024-01-02', rate: 50 },
  ],
  categories: [{ id: 1, name: 'Fitness', rate: 88 }],
}

export async function authenticate(page: Page) {
  await page.addInitScript(({ token, user }: { token: string; user: string }) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', user)
  }, { token: 'test-token-123', user: JSON.stringify(MOCK_USER) })
}

export async function mockApiRoutes(page: Page) {
  await page.route('**/api/v1/**', async (route) => {
    const url = route.request().url()
    const method = route.request().method()

    if (/\/habits\/\d+\/logs/.test(url)) {
      return route.fulfill({ status: 200 })
    }
    if (/\/habits\/\d+$/.test(url)) {
      if (method === 'PATCH') return route.fulfill({ json: { data: MOCK_HABITS[0] } })
      if (method === 'DELETE') return route.fulfill({ status: 200 })
    }
    if (url.includes('/auth/login')) {
      return route.fulfill({ json: { data: { token: 'test-token-123', user: MOCK_USER } } })
    }
    if (url.includes('/auth/register')) {
      return route.fulfill({ json: { data: { token: 'test-token-123', user: MOCK_USER } } })
    }
    if (/\/user\/password/.test(url)) {
      return route.fulfill({ status: 200 })
    }
    if (/\/user$/.test(url)) {
      if (method === 'GET') return route.fulfill({ json: { data: MOCK_USER } })
      if (method === 'PATCH') return route.fulfill({ json: { data: MOCK_USER } })
    }
    if (/\/habits(\?.*)?$/.test(url)) {
      if (method === 'GET') return route.fulfill({ json: { data: { data: MOCK_HABITS } } })
      if (method === 'POST') return route.fulfill({ json: { data: { ...MOCK_HABITS[0], id: 99, name: 'Leer' } } })
    }
    if (/\/categories\/\d+$/.test(url)) {
      return route.fulfill({ status: 200 })
    }
    if (url.includes('/categories')) {
      if (method === 'GET') return route.fulfill({ json: { data: MOCK_CATEGORIES } })
      if (method === 'POST') return route.fulfill({ json: { data: { id: 99, name: 'Nueva categoría' } } })
    }
    if (url.includes('/stats')) {
      return route.fulfill({ json: { data: MOCK_STATS } })
    }
    if (url.includes('/push-subscriptions')) {
      return route.fulfill({ status: 200 })
    }

    return route.continue()
  })
}
