# Habit Core

Aplicación web para crear y seguir hábitos diarios. Permite definir hábitos personalizados, registrar su cumplimiento cada día, organízalos por categorías y consultar estadísticas de progreso. Soporta recordatorios mediante notificaciones push y funciona como PWA (instalable en móvil y escritorio).

## Stack

- **Frontend:** Vue 3 + TypeScript + Tailwind CSS + Vite (PWA)
- **Backend:** Laravel 13 + Sanctum + MySQL
- **Auth:** Email/contraseña y Google OAuth

---

## Requisitos

- PHP >= 8.4
- Composer
- Node.js >= 20
- MySQL

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/habit-core.git
cd habit-core
```

### 2. Backend

```bash
cd backend
```

Instalar dependencias:

```bash
composer install
```

Copiar el archivo de entorno:

```bash
cp .env.example .env
```

Generar la clave de aplicación:

```bash
php artisan key:generate
```

Configurar el `.env` con tus datos de base de datos y credenciales de Google OAuth:

```env
APP_URL=http://localhost:8000

DB_DATABASE=habit_core
DB_USERNAME=root
DB_PASSWORD=

GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback

FRONTEND_URL=http://localhost:5173
```

Ejecutar las migraciones:

```bash
php artisan migrate
```

Arrancar el servidor:

```bash
php artisan serve
```

---

### 3. Frontend

```bash
cd ../frontend
```

Instalar dependencias:

```bash
npm install
```

Crear el archivo de entorno:

```bash
cp .env.example .env
```

Configurar la URL del backend en `.env`:

```env
VITE_API_URL=http://localhost:8000
```

Arrancar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## Credenciales de Google OAuth

Para habilitar el login con Google necesitas crear un proyecto en [Google Cloud Console](https://console.cloud.google.com):

1. Crear un proyecto nuevo
2. Ir a **APIs y servicios → Credenciales**
3. Crear credenciales de tipo **ID de cliente OAuth 2.0** (aplicación web)
4. Añadir `http://localhost:8000/auth/google/callback` como URI de redirección autorizada
5. Copiar el Client ID y Client Secret al `.env` del backend

---

## Notificaciones push (opcional)

Para habilitar las notificaciones push genera un par de claves VAPID:

```bash
php artisan web-push:vapid
```

Copia las claves generadas al `.env`:

```env
VAPID_SUBJECT=mailto:tu@email.com
VAPID_PUBLIC_KEY=...
VAPID_PRIVATE_KEY=...
```

Y activa el scheduler de Laravel para que los recordatorios se envíen:

```bash
php artisan schedule:work
```
