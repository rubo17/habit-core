import { http } from '@/shared/utils/http'
import type { CreateHabitDto, HabitListResponse, HabitResponse } from '../types/habit.types'

export const habitService = {
  getAll(categoryId?: number): Promise<HabitListResponse> {
    const query = categoryId ? `?category_id=${categoryId}` : ''
    return http.get<HabitListResponse>(`/habits${query}`)
  },

  create(data: CreateHabitDto): Promise<HabitResponse> {
    return http.post<HabitResponse>('/habits', data)
  },

  remove(id: number): Promise<void> {
    return http.delete<void>(`/habits/${id}`)
  },
}
