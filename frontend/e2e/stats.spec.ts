import { test, expect } from '@playwright/test'
import { authenticate, mockApiRoutes, MOCK_STATS } from './helpers'

test.describe('Stats', () => {
  test.beforeEach(async ({ page }) => {
    await mockApiRoutes(page)
    await authenticate(page)
  })

  test('carga la página de estadísticas', async ({ page }) => {
    await page.goto('/stats')
    await expect(page.getByText('Estadísticas')).toBeVisible()
  })

  test('muestra el selector de período con las 3 opciones', async ({ page }) => {
    await page.goto('/stats')
    await expect(page.getByRole('button', { name: '7d' })).toBeVisible()
    await expect(page.getByRole('button', { name: '30d' })).toBeVisible()
    await expect(page.getByRole('button', { name: '90d' })).toBeVisible()
  })

  test('muestra los datos de hábitos al cargar', async ({ page }) => {
    await page.goto('/stats')
    await expect(page.getByText('Correr', { exact: true })).toBeVisible()
    await expect(page.getByText('Meditar', { exact: true })).toBeVisible()
  })

  test('cambiar a período 7d ejecuta nueva petición', async ({ page }) => {
    const statsRequest = page.waitForRequest((req) =>
      req.url().includes('/stats') && req.url().includes('period=7')
    )
    await page.goto('/stats')
    await expect(page.getByText('Estadísticas')).toBeVisible()
    await page.getByRole('button', { name: '7d' }).click()
    await statsRequest
  })

  test('cambiar a período 90d ejecuta nueva petición', async ({ page }) => {
    const statsRequest = page.waitForRequest((req) =>
      req.url().includes('/stats') && req.url().includes('period=90')
    )
    await page.goto('/stats')
    await expect(page.getByText('Estadísticas')).toBeVisible()
    await page.getByRole('button', { name: '90d' }).click()
    await statsRequest
  })

  test('muestra estado vacío cuando no hay datos de hábitos', async ({ page }) => {
    await page.route('**/api/v1/stats**', (route) =>
      route.fulfill({ json: { data: { ...MOCK_STATS, habits: [] } } })
    )
    await page.goto('/stats')
    await expect(page.getByText('Sin datos suficientes')).toBeVisible()
    await expect(page.getByText('Completa algunos hábitos para ver tus estadísticas.')).toBeVisible()
  })

  test('muestra la sección de categorías cuando hay datos', async ({ page }) => {
    await page.goto('/stats')
    await expect(page.getByText('Fitness')).toBeVisible()
  })
})
