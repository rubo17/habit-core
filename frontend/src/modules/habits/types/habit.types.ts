export interface HabitCategory {
  id: number
  name: string
}

export interface Habit {
  id: number
  user_id: number
  category_id: number | null
  category?: HabitCategory | null
  name: string
  frequency: 'daily'
  reminder_time: string | null
  color: string | null
  icon: string | null
  deleted_at: string | null
  created_at: string
  updated_at: string
}

export interface CreateHabitDto {
  category_id?: number | null
  name: string
  frequency: 'daily'
  reminder_time?: string | null
  color?: string | null
  icon?: string | null
}
