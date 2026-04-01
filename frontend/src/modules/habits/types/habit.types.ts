export interface Habit {
  id: string
  name: string
  description?: string
  icon: string // references HabitIconDef.name
  createdAt: string
  updatedAt: string
  isActive: boolean
}

export interface CreateHabitDto {
  name: string
  description?: string
  icon: string
}
