import { test, expect } from '@playwright/test'
import { authenticate, mockApiRoutes } from './helpers'

test.describe('Auth - redirects sin autenticar', () => {
  test('redirige /habits a login si no hay sesión', async ({ page }) => {
    await page.goto('/habits')
    await expect(page).toHaveURL('/auth/login')
  })

  test('redirige / a login si no hay sesión', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL('/auth/login')
  })

  test('redirige /settings a login si no hay sesión', async ({ page }) => {
    await page.goto('/settings')
    await expect(page).toHaveURL('/auth/login')
  })

  test('redirige /stats a login si no hay sesión', async ({ page }) => {
    await page.goto('/stats')
    await expect(page).toHaveURL('/auth/login')
  })
})

test.describe('Auth - login', () => {
  test('muestra el formulario de login correctamente', async ({ page }) => {
    await page.goto('/auth/login')
    await expect(page.getByText('Inicia sesión')).toBeVisible()
    await expect(page.getByPlaceholder('you@example.com')).toBeVisible()
    await expect(page.getByPlaceholder('••••••••').first()).toBeVisible()
    await expect(page.getByRole('button', { name: 'INICIAR SESIÓN', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: /registrate/i })).toBeVisible()
    await expect(page.getByText('Olvidaste la contraseña?')).toBeVisible()
  })

  test('navega a register desde login', async ({ page }) => {
    await page.goto('/auth/login')
    await page.getByRole('link', { name: /registrate/i }).click()
    await expect(page).toHaveURL('/auth/register')
  })

  test('muestra error en credenciales incorrectas', async ({ page }) => {
    await page.route('**/api/v1/auth/login', (route) =>
      route.fulfill({ status: 401, json: { message: 'Credenciales incorrectas' } })
    )
    await page.goto('/auth/login')
    await page.getByPlaceholder('you@example.com').fill('wrong@test.com')
    await page.getByPlaceholder('••••••••').fill('wrongpass')
    await page.getByRole('button', { name: 'INICIAR SESIÓN', exact: true }).click()
    await expect(page.getByText('Credenciales incorrectas')).toBeVisible()
  })

  test('redirige a /habits tras login exitoso', async ({ page }) => {
    await mockApiRoutes(page)
    await page.goto('/auth/login')
    await page.getByPlaceholder('you@example.com').fill('test@example.com')
    await page.getByPlaceholder('••••••••').fill('password123')
    await page.getByRole('button', { name: 'INICIAR SESIÓN', exact: true }).click()
    await expect(page).toHaveURL('/habits')
  })
})

test.describe('Auth - registro', () => {
  test('muestra el formulario de registro correctamente', async ({ page }) => {
    await page.goto('/auth/register')
    await expect(page.getByText('Crea tu cuenta')).toBeVisible()
    await expect(page.getByPlaceholder('Jane Doe')).toBeVisible()
    await expect(page.getByPlaceholder('you@example.com')).toBeVisible()
    await expect(page.getByRole('button', { name: 'REGISTRARSE', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: /inicia sesión/i })).toBeVisible()
  })

  test('navega a login desde registro', async ({ page }) => {
    await page.goto('/auth/register')
    await page.getByRole('link', { name: /inicia sesión/i }).click()
    await expect(page).toHaveURL('/auth/login')
  })

  test('muestra error si el email ya está en uso', async ({ page }) => {
    await page.route('**/api/v1/auth/register', (route) =>
      route.fulfill({ status: 422, json: { message: 'El email ya está en uso' } })
    )
    await page.goto('/auth/register')
    await page.getByPlaceholder('Jane Doe').fill('Test User')
    await page.getByPlaceholder('you@example.com').fill('taken@example.com')
    await page.getByPlaceholder('••••••••').first().fill('password123')
    await page.getByPlaceholder('••••••••').last().fill('password123')
    await page.getByRole('button', { name: 'REGISTRARSE', exact: true }).click()
    await expect(page.getByText('El email ya está en uso')).toBeVisible()
  })

  test('redirige a /habits tras registro exitoso', async ({ page }) => {
    await mockApiRoutes(page)
    await page.goto('/auth/register')
    await page.getByPlaceholder('Jane Doe').fill('Test User')
    await page.getByPlaceholder('you@example.com').fill('new@example.com')
    await page.getByPlaceholder('••••••••').first().fill('password123')
    await page.getByPlaceholder('••••••••').last().fill('password123')
    await page.getByRole('button', { name: 'REGISTRARSE', exact: true }).click()
    await expect(page).toHaveURL('/habits')
  })
})

test.describe('Auth - redirects autenticado', () => {
  test('redirige /auth/login a /habits si hay sesión activa', async ({ page }) => {
    await mockApiRoutes(page)
    await authenticate(page)
    await page.goto('/auth/login')
    await expect(page).toHaveURL('/habits')
  })

  test('redirige /auth/register a /habits si hay sesión activa', async ({ page }) => {
    await mockApiRoutes(page)
    await authenticate(page)
    await page.goto('/auth/register')
    await expect(page).toHaveURL('/habits')
  })
})
