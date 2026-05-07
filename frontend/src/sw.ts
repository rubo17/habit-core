import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst } from 'workbox-strategies'

declare const self: ServiceWorkerGlobalScope & { __WB_MANIFEST: { url: string; revision: string | null }[] }

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
  ({ url }) => url.pathname.startsWith('/api/v1/'),
  new NetworkFirst({ cacheName: 'api-cache', networkTimeoutSeconds: 5 })
)

self.addEventListener('push', (event) => {
  console.log('[SW] push received', event.data?.text())
  if (!event.data) return
  const payload = event.data.json()
  console.log('[SW] payload', payload)
  const { title, body, icon, badge, tag, data } = payload
  event.waitUntil(
    self.registration.showNotification(title, { body, icon, badge, tag, data })
      .then(() => console.log('[SW] notification shown'))
      .catch((err) => console.error('[SW] showNotification error', err))
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url: string = (event.notification.data?.url as string) ?? '/habits'
  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clients) => {
        const existing = clients.find((c) => c.url.includes(url))
        return existing ? existing.focus() : self.clients.openWindow(url)
      })
  )
})
