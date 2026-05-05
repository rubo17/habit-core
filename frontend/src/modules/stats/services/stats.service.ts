import { http } from '@/shared/utils/http'
import type { StatsResponse } from '../types/stats.types'

export const statsService = {
  get(period: 7 | 30 | 90): Promise<StatsResponse> {
    return http.get<StatsResponse>(`/stats?period=${period}`)
  },
}
