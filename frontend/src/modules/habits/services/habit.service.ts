import { http } from '@/shared/utils/http'
import type { CreateHabitDto, HabitListResponse, HabitResponse, UpdateHabitDto } from '../types/habit.types'

export const habitService = {
  getAll(categoryId?: number): Promise<HabitListResponse> {
    const query = categoryId ? `?category_id=${categoryId}` : ''
    return http.get<HabitListResponse>(`/habits${query}`)
  },

  create(data: CreateHabitDto): Promise<HabitResponse> {
    return http.post<HabitResponse>('/habits', data)
  },

  update(id: number, data: UpdateHabitDto): Promise<HabitResponse> {
    return http.patch<HabitResponse>(`/habits/${id}`, data)
  },

  remove(id: number): Promise<void> {
    return http.delete<void>(`/habits/${id}`)
  },

  log(id: number): Promise<void> {
    return http.post<void>(`/habits/${id}/logs`, {})
  },

  unlog(id: number, date: string): Promise<void> {
    return http.delete<void>(`/habits/${id}/logs/${date}`)
  },

  getLogs(id: number, year: number): Promise<{ data: string[] }> {
    return http.get<{ data: string[] }>(`/habits/${id}/logs?year=${year}`)
  },
}
