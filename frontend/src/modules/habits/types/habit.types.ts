export interface HabitCategory {
  id: number
  name: string
  icon?: string | null
}

export interface Habit {
  id: number
  user_id: number
  category_id: number | null
  category?: HabitCategory | null
  name: string
  frequency: 'daily'
  reminder_times: Record<string, string> | null
  target_days: number[] | null
  color: string | null
  icon: string | null
  today_logged: boolean
  deleted_at: string | null
  created_at: string
  updated_at: string
}

export interface CreateHabitDto {
  category_id: number | null
  name: string
  frequency: 'daily'
  reminder_times?: Record<string, string> | null
  target_days?: number[] | null
  color?: string | null
  icon?: string | null
}

export interface UpdateHabitDto {
  category_id?: number | null
  name?: string
  reminder_times?: Record<string, string> | null
  target_days?: number[] | null
  color?: string | null
  icon?: string | null
}

export interface HabitResponse {
  data: Habit
}

export interface HabitListResponse {
  data: {
    data: Habit[]
  }
}

export interface CreateCategoryDto {
  name: string
  icon?: string | null
}

export interface CategoryResponse {
  data: HabitCategory
}

export interface CategoryListResponse {
  data: HabitCategory[]
}

export type SyncOperation =
  | { type: 'create'; payload: CreateHabitDto; tempId: number }
  | { type: 'delete'; id: number }
  | { type: 'log'; id: number }
  | { type: 'unlog'; id: number; date: string }
  | { type: 'create-category'; payload: CreateCategoryDto; tempId: number }
  | { type: 'delete-category'; id: number }
