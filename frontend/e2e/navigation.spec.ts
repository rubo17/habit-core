import { test, expect } from '@playwright/test'
import { authenticate, mockApiRoutes } from './helpers'

test.describe('Navegación', () => {
  test.beforeEach(async ({ page }) => {
    await mockApiRoutes(page)
    await authenticate(page)
  })

  test('/ redirige a /habits cuando hay sesión', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL('/habits')
  })

  test('ruta desconocida muestra página 404', async ({ page }) => {
    await page.goto('/ruta-que-no-existe')
    await expect(page.getByText('404')).toBeVisible()
    await expect(page.getByText('Página no encontrada')).toBeVisible()
  })

  test('el botón Volver al inicio del 404 navega a /habits', async ({ page }) => {
    await page.goto('/ruta-que-no-existe')
    await page.getByRole('link', { name: 'Volver al inicio' }).click()
    await expect(page).toHaveURL('/habits')
  })

  test('navbar navega a /stats', async ({ page }) => {
    await page.goto('/habits')
    await page.getByRole('link', { name: 'Stats' }).click()
    await expect(page).toHaveURL('/stats')
    await expect(page.getByText('Estadísticas')).toBeVisible()
  })

  test('navbar navega a /settings', async ({ page }) => {
    await page.goto('/habits')
    await page.getByRole('link', { name: 'Settings' }).click()
    await expect(page).toHaveURL('/settings')
    await expect(page.getByRole('heading', { name: 'Ajustes' })).toBeVisible()
  })

  test('navbar navega de vuelta a /habits', async ({ page }) => {
    await page.goto('/stats')
    await page.getByRole('link', { name: 'Home' }).click()
    await expect(page).toHaveURL('/habits')
  })

  test('navegar entre páginas no pierde la sesión', async ({ page }) => {
    await page.goto('/habits')
    await page.getByRole('link', { name: 'Settings' }).click()
    await page.getByRole('link', { name: 'Stats' }).click()
    await page.getByRole('link', { name: 'Home' }).click()
    await expect(page).toHaveURL('/habits')
    await expect(page.getByText('Correr')).toBeVisible()
  })
})
