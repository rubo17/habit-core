import { test, expect } from '@playwright/test'
import { authenticate, mockApiRoutes, MOCK_STATS } from './helpers'

test.describe('Habits', () => {
  test.beforeEach(async ({ page }) => {
    await mockApiRoutes(page)
    await authenticate(page)
  })

  test('carga la página con las tarjetas de hábitos', async ({ page }) => {
    await page.goto('/habits')
    await expect(page.getByText('Correr')).toBeVisible()
    await expect(page.getByText('Meditar')).toBeVisible()
  })

  test('muestra la pestaña Todos por defecto', async ({ page }) => {
    await page.goto('/habits')
    await expect(page.getByText('Todos')).toBeVisible()
  })

  test('muestra las categorías del API', async ({ page }) => {
    await page.goto('/habits')
    await expect(page.getByText('Fitness').first()).toBeVisible()
  })

  test('el botón FAB abre el modal de crear hábito', async ({ page }) => {
    await page.goto('/habits')
    await expect(page.getByText('Correr')).toBeVisible()
    await page.locator('button[class*="w-14 h-14"]').click()
    await expect(page.getByRole('heading', { name: 'Nuevo hábito' })).toBeVisible()
    await expect(page.getByPlaceholder('Nombre del hábito')).toBeVisible()
  })

  test('el botón Crear hábito está deshabilitado sin nombre', async ({ page }) => {
    await page.goto('/habits')
    await page.locator('button[class*="w-14 h-14"]').click()
    await expect(page.getByRole('heading', { name: 'Nuevo hábito' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Crear hábito' })).toBeDisabled()
  })

  test('el botón Crear hábito se habilita al escribir un nombre', async ({ page }) => {
    await page.goto('/habits')
    await page.locator('button[class*="w-14 h-14"]').click()
    await page.getByPlaceholder('Nombre del hábito').fill('Leer')
    await expect(page.getByRole('button', { name: 'Crear hábito' })).toBeEnabled()
  })

  test('cerrar el modal de crear limpia el formulario', async ({ page }) => {
    await page.goto('/habits')
    await page.locator('button[class*="w-14 h-14"]').click()
    await page.getByPlaceholder('Nombre del hábito').fill('Leer')
    await page.keyboard.press('Escape')
    await expect(page.getByRole('heading', { name: 'Nuevo hábito' })).not.toBeVisible()
    await page.locator('button[class*="w-14 h-14"]').click()
    await expect(page.getByPlaceholder('Nombre del hábito')).toHaveValue('')
  })

  test('crear un hábito lo añade a la lista', async ({ page }) => {
    await page.goto('/habits')
    await page.locator('button[class*="w-14 h-14"]').click()
    await page.getByPlaceholder('Nombre del hábito').fill('Leer')
    await page.getByRole('button', { name: 'Crear hábito' }).click()
    await expect(page.getByRole('heading', { name: 'Nuevo hábito' })).not.toBeVisible()
    await expect(page.getByText('Leer')).toBeVisible()
  })

  test('marcar toggle completa el hábito visualmente', async ({ page }) => {
    await page.goto('/habits')
    await expect(page.getByText('Correr')).toBeVisible()

    const habitCard = page.locator('.rounded-2xl').filter({ hasText: 'Correr' }).first()
    const toggleBtn = habitCard.locator('button[class*="rounded-full"]')

    await expect(toggleBtn.locator('svg')).toHaveCount(0)
    await toggleBtn.click()
    await expect(toggleBtn.locator('svg')).toBeVisible()
  })

  test('el hábito Meditar aparece ya completado', async ({ page }) => {
    await page.goto('/habits')
    await expect(page.getByText('Meditar')).toBeVisible()

    const habitCard = page.locator('.rounded-2xl').filter({ hasText: 'Meditar' }).first()
    const toggleBtn = habitCard.locator('button[class*="rounded-full"]')
    await expect(toggleBtn.locator('svg')).toBeVisible()
  })

  test('el botón eliminar abre el modal de confirmación', async ({ page }) => {
    await page.goto('/habits')
    await expect(page.getByText('Correr')).toBeVisible()

    const habitCard = page.locator('.rounded-2xl').filter({ hasText: 'Correr' }).first()
    await habitCard.locator('button[class*="w-8 h-8"]').click()

    await expect(page.getByRole('heading', { name: 'Eliminar hábito' })).toBeVisible()
    await expect(page.getByText(/¿Eliminar 'Correr'/)).toBeVisible()
  })

  test('confirmar eliminación quita el hábito de la lista', async ({ page }) => {
    await page.goto('/habits')
    await expect(page.getByText('Correr')).toBeVisible()

    const habitCard = page.locator('.rounded-2xl').filter({ hasText: 'Correr' }).first()
    await habitCard.locator('button[class*="w-8 h-8"]').click()
    await page.getByRole('button', { name: 'Eliminar', exact: true }).click()

    await expect(page.getByText('Correr')).not.toBeVisible()
  })

  test('cancelar eliminación mantiene el hábito', async ({ page }) => {
    await page.goto('/habits')
    await expect(page.getByText('Correr')).toBeVisible()

    const habitCard = page.locator('.rounded-2xl').filter({ hasText: 'Correr' }).first()
    await habitCard.locator('button[class*="w-8 h-8"]').click()
    await page.getByRole('button', { name: 'Cancelar' }).click()

    await expect(page.getByRole('heading', { name: 'Eliminar hábito' })).not.toBeVisible()
    await expect(page.getByText('Correr')).toBeVisible()
  })

  test('filtrar por categoría muestra solo los hábitos de esa categoría', async ({ page }) => {
    await page.goto('/habits')
    await expect(page.getByText('Correr')).toBeVisible()
    await expect(page.getByText('Meditar')).toBeVisible()

    await page.getByText('Fitness').first().click()

    await expect(page.getByText('Meditar')).toBeVisible()
    await expect(page.getByText('Correr')).not.toBeVisible()
  })

  test('volver a Todos restaura todos los hábitos', async ({ page }) => {
    await page.goto('/habits')
    await page.getByText('Fitness').first().click()
    await expect(page.getByText('Correr')).not.toBeVisible()

    await page.getByText('Todos').click()
    await expect(page.getByText('Correr')).toBeVisible()
    await expect(page.getByText('Meditar')).toBeVisible()
  })

  test('expandir tarjeta muestra el heatmap y botón de editar', async ({ page }) => {
    await page.goto('/habits')
    await expect(page.getByText('Correr')).toBeVisible()

    const habitCard = page.locator('.rounded-2xl').filter({ hasText: 'Correr' }).first()
    await habitCard.locator('[class*="cursor-pointer"]').click()

    await expect(page.getByText('Registro del año').first()).toBeVisible()
  })
})
