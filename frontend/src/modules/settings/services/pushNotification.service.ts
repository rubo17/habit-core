import { http } from '@/shared/utils/http'
import type { PushSubscriptionDto } from '../types/push.types'

export const pushNotificationService = {
  subscribe(dto: PushSubscriptionDto): Promise<void> {
    return http.post<void>('/push-subscriptions', dto)
  },

  unsubscribe(endpoint: string): Promise<void> {
    return http.delete<void>('/push-subscriptions', { endpoint })
  },
}
