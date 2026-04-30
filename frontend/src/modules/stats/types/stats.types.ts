export interface HabitStat {
  id: number
  name: string
  color: string | null
  icon: string | null
  rate: number
  current_streak: number
  completed_days: number
  eligible_days: number
}

export interface DailyTrend {
  date: string
  rate: number
}

export interface CategoryStat {
  id: number
  name: string
  rate: number
}

export interface TodayProgress {
  completed: number
  total: number
}

export interface UserStats {
  today_progress: TodayProgress
  consistency_rate: number
  habits: HabitStat[]
  daily_trend: DailyTrend[]
  categories: CategoryStat[]
}

export interface StatsResponse {
  data: UserStats
}
