import { ref } from 'vue'
import { pushNotificationService } from '../services/pushNotification.service'
import type { PushPermissionState } from '../types/push.types'

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY as string

function urlBase64ToUint8Array(base64: string): Uint8Array {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const raw = atob((base64 + padding).replace(/-/g, '+').replace(/_/g, '/'))
  const output = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i++) output[i] = raw.charCodeAt(i)
  return output
}

function isSupported(): boolean {
  return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window
}

export function usePushNotifications() {
  const permission = ref<PushPermissionState>(
    isSupported() ? (Notification.permission as PushPermissionState) : 'unsupported'
  )
  const subscribed = ref(false)

  if (isSupported() && Notification.permission === 'granted') {
    navigator.serviceWorker.ready
      .then(reg => reg.pushManager.getSubscription())
      .then(sub => { subscribed.value = !!sub })
  }

  async function enable(): Promise<void> {
    if (!isSupported()) return

    const result = await Notification.requestPermission()
    permission.value = result as PushPermissionState
    if (result !== 'granted') return

    const registration = await navigator.serviceWorker.ready
    console.log('[push] SW ready', registration)
    console.log('[push] VAPID key:', VAPID_PUBLIC_KEY, '| length:', VAPID_PUBLIC_KEY?.length)

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY.trim()) as BufferSource,
    })
    console.log('[push] subscription created', subscription.endpoint)

    const subscriptionJson = subscription.toJSON()

    await pushNotificationService.subscribe({
      endpoint: subscription.endpoint,
      public_key: subscriptionJson.keys?.p256dh ?? '',
      auth_token: subscriptionJson.keys?.auth ?? '',
    })
    console.log('[push] subscribed to backend')

    subscribed.value = true
  }

  async function disable(): Promise<void> {
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.getSubscription()
    console.log('[push] current subscription', subscription?.endpoint ?? 'none')

    if (subscription) {
      await pushNotificationService.unsubscribe(subscription.endpoint)
      await subscription.unsubscribe()
    }

    subscribed.value = false
  }

  return { permission, subscribed, isSupported, enable, disable }
}
