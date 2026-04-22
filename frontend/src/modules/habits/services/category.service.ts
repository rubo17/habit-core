import { http } from '@/shared/utils/http'
import type { CategoryListResponse, CategoryResponse, CreateCategoryDto } from '../types/habit.types'

export const categoryService = {
  getAll(): Promise<CategoryListResponse> {
    return http.get<CategoryListResponse>('/categories')
  },

  create(data: CreateCategoryDto): Promise<CategoryResponse> {
    return http.post<CategoryResponse>('/categories', data)
  },

  remove(id: number): Promise<void> {
    return http.delete<void>(`/categories/${id}`)
  },
}
