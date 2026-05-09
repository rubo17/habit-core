import { test, expect } from '@playwright/test'
import { authenticate, mockApiRoutes } from './helpers'

test.describe('Settings', () => {
  test.beforeEach(async ({ page }) => {
    await mockApiRoutes(page)
    await authenticate(page)
  })

  test('carga la página de ajustes', async ({ page }) => {
    await page.goto('/settings')
    await expect(page.getByRole('heading', { name: 'Ajustes' })).toBeVisible()
  })

  test('muestra la sección de perfil con nombre y email del usuario', async ({ page }) => {
    await page.goto('/settings')
    await expect(page.getByText('Perfil')).toBeVisible()
    await expect(page.getByText('Test User')).toBeVisible()
    await expect(page.getByText('test@example.com')).toBeVisible()
  })

  test('el botón Editar habilita los campos de perfil', async ({ page }) => {
    await page.goto('/settings')
    await page.getByRole('button', { name: 'Editar' }).click()
    await expect(page.getByRole('button', { name: 'Guardar' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Cancelar' })).toBeVisible()
  })

  test('cancelar edición de perfil restaura la vista', async ({ page }) => {
    await page.goto('/settings')
    await page.getByRole('button', { name: 'Editar' }).click()
    await page.getByRole('button', { name: 'Cancelar' }).click()
    await expect(page.getByRole('button', { name: 'Editar' })).toBeVisible()
    await expect(page.getByText('Test User')).toBeVisible()
  })

  test('guardar perfil llama al API y muestra confirmación', async ({ page }) => {
    await page.goto('/settings')
    await page.getByRole('button', { name: 'Editar' }).click()
    await page.getByRole('button', { name: 'Guardar' }).click()
    await expect(page.getByText('Perfil actualizado correctamente')).toBeVisible()
  })

  test('muestra la sección de contraseña', async ({ page }) => {
    await page.goto('/settings')
    await expect(page.getByText('Contraseña')).toBeVisible()
  })

  test('el botón Cambiar habilita el formulario de contraseña', async ({ page }) => {
    await page.goto('/settings')
    await page.getByRole('button', { name: 'Cambiar' }).click()
    await expect(page.getByPlaceholder('Mínimo 8 caracteres')).toBeVisible()
    await expect(page.getByPlaceholder('Repite la contraseña')).toBeVisible()
  })

  test('muestra error si las contraseñas no coinciden', async ({ page }) => {
    await page.goto('/settings')
    await page.getByRole('button', { name: 'Cambiar' }).click()
    await page.getByPlaceholder('••••••••').fill('currentpass')
    await page.getByPlaceholder('Mínimo 8 caracteres').fill('newpass123')
    await page.getByPlaceholder('Repite la contraseña').fill('differentpass')
    await page.getByRole('button', { name: 'Guardar' }).click()
    await expect(page.getByText('Las contraseñas no coinciden')).toBeVisible()
  })

  test('guardar contraseña válida muestra confirmación', async ({ page }) => {
    await page.goto('/settings')
    await page.getByRole('button', { name: 'Cambiar' }).click()
    await page.getByPlaceholder('••••••••').fill('currentpass')
    await page.getByPlaceholder('Mínimo 8 caracteres').fill('newpass123')
    await page.getByPlaceholder('Repite la contraseña').fill('newpass123')
    await page.getByRole('button', { name: 'Guardar' }).click()
    await expect(page.getByText('Contraseña actualizada correctamente')).toBeVisible()
  })

  test('muestra el botón de cerrar sesión', async ({ page }) => {
    await page.goto('/settings')
    await expect(page.getByRole('button', { name: 'Cerrar sesión' })).toBeVisible()
  })

  test('cerrar sesión redirige a /auth/login', async ({ page }) => {
    await page.goto('/settings')
    await page.getByRole('button', { name: 'Cerrar sesión' }).click()
    await expect(page).toHaveURL('/auth/login')
  })

  test('muestra la sección de notificaciones', async ({ page }) => {
    await page.goto('/settings')
    await expect(page.getByText('Notificaciones')).toBeVisible()
  })
})
