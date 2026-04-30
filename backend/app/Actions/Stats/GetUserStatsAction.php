<?php

namespace App\Actions\Stats;

use App\Models\Habit;
use App\Models\HabitLog;
use Illuminate\Support\Collection;

class GetUserStatsAction
{
    public function execute(int $userId, int $period): array
    {
        $today = now()->toDateString();
        $periodStart = now()->subDays($period - 1)->toDateString();
        $yearAgo = now()->subYear()->toDateString();

        $habits = Habit::where('user_id', $userId)
            ->whereNull('deleted_at')
            ->with('category')
            ->get();

        if ($habits->isEmpty()) {
            return [
                'today_progress' => ['completed' => 0, 'total' => 0],
                'consistency_rate' => 0.0,
                'habits' => [],
                'daily_trend' => [],
                'categories' => [],
            ];
        }

        $allLogs = HabitLog::whereIn('habit_id', $habits->pluck('id'))
            ->where('logged_date', '>=', $yearAgo)
            ->get()
            ->groupBy('habit_id')
            ->map(fn($logs) => $logs->pluck('logged_date')->map(fn($d) => $d->toDateString())->toArray());

        $todayDayOfWeek = (int) now()->format('w');
        $todayHabits = $habits->filter(fn($h) =>
            $h->target_days === null || in_array($todayDayOfWeek, $h->target_days)
        );

        $todayCompleted = $todayHabits->filter(function ($habit) use ($allLogs, $today) {
            return in_array($today, $allLogs->get($habit->id, []));
        })->count();

        $habitStats = $habits->map(function ($habit) use ($allLogs, $today, $periodStart) {
            $loggedSet = array_flip($allLogs->get($habit->id, []));

            $streak = $this->calculateStreak($habit, $loggedSet, $today);
            $eligibleDays = $this->getEligibleDays($habit, $periodStart, $today);
            $completedDays = count(array_filter($eligibleDays, fn($d) => isset($loggedSet[$d])));
            $total = count($eligibleDays);

            return [
                'id'             => $habit->id,
                'name'           => $habit->name,
                'color'          => $habit->color,
                'icon'           => $habit->icon,
                'rate'           => $total > 0 ? round($completedDays / $total * 100, 1) : 0.0,
                'current_streak' => $streak,
                'completed_days' => $completedDays,
                'eligible_days'  => $total,
            ];
        })->sortByDesc('rate')->values();

        $dailyTrend = $this->buildDailyTrend($habits, $allLogs, $periodStart, $today);
        $consistencyRate = count($dailyTrend) > 0
            ? round(array_sum(array_column($dailyTrend, 'rate')) / count($dailyTrend), 1)
            : 0.0;

        return [
            'today_progress'   => ['completed' => $todayCompleted, 'total' => $todayHabits->count()],
            'consistency_rate' => $consistencyRate,
            'habits'           => $habitStats->toArray(),
            'daily_trend'      => $dailyTrend,
            'categories'       => $this->buildCategoryStats($habits, $habitStats),
        ];
    }

    private function calculateStreak(Habit $habit, array $loggedSet, string $today): int
    {
        $streak = 0;
        $current = new \DateTime($today);
        $limit = (new \DateTime($today))->modify('-2 years');

        while ($current >= $limit) {
            $dateStr = $current->format('Y-m-d');
            $dayOfWeek = (int) $current->format('w');
            $isEligible = $habit->target_days === null || in_array($dayOfWeek, $habit->target_days);

            if ($isEligible) {
                if (isset($loggedSet[$dateStr])) {
                    $streak++;
                } elseif ($dateStr === $today) {
                    // Today not completed yet — don't break
                } else {
                    break;
                }
            }

            $current->modify('-1 day');
        }

        return $streak;
    }

    private function getEligibleDays(Habit $habit, string $from, string $to): array
    {
        $days = [];
        $habitCreated = $habit->created_at->toDateString();
        $start = $from < $habitCreated ? $habitCreated : $from;
        $current = new \DateTime($start);
        $end = new \DateTime($to);

        while ($current <= $end) {
            $dayOfWeek = (int) $current->format('w');
            if ($habit->target_days === null || in_array($dayOfWeek, $habit->target_days)) {
                $days[] = $current->format('Y-m-d');
            }
            $current->modify('+1 day');
        }

        return $days;
    }

    private function buildDailyTrend(Collection $habits, Collection $allLogs, string $from, string $to): array
    {
        $trend = [];
        $current = new \DateTime($from);
        $end = new \DateTime($to);

        while ($current <= $end) {
            $dateStr = $current->format('Y-m-d');
            $dayOfWeek = (int) $current->format('w');

            $activeHabits = $habits->filter(function ($habit) use ($dayOfWeek, $dateStr) {
                if ($habit->created_at->toDateString() > $dateStr) return false;
                return $habit->target_days === null || in_array($dayOfWeek, $habit->target_days);
            });

            if ($activeHabits->isEmpty()) {
                $trend[] = ['date' => $dateStr, 'rate' => 0.0];
            } else {
                $completed = $activeHabits->filter(function ($habit) use ($allLogs, $dateStr) {
                    return in_array($dateStr, $allLogs->get($habit->id, []));
                })->count();

                $trend[] = [
                    'date' => $dateStr,
                    'rate' => round($completed / $activeHabits->count() * 100, 1),
                ];
            }

            $current->modify('+1 day');
        }

        return $trend;
    }

    private function buildCategoryStats(Collection $habits, Collection $habitStats): array
    {
        $grouped = [];

        foreach ($habits as $habit) {
            if ($habit->category_id === null || $habit->category === null) continue;
            $stat = $habitStats->firstWhere('id', $habit->id);
            if (!$stat) continue;

            $catId = $habit->category_id;
            if (!isset($grouped[$catId])) {
                $grouped[$catId] = ['id' => $catId, 'name' => $habit->category->name, 'rates' => []];
            }
            $grouped[$catId]['rates'][] = $stat['rate'];
        }

        return array_values(array_map(function ($cat) {
            return [
                'id'   => $cat['id'],
                'name' => $cat['name'],
                'rate' => round(array_sum($cat['rates']) / count($cat['rates']), 1),
            ];
        }, $grouped));
    }
}
