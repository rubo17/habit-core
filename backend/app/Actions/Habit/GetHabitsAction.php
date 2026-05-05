<?php

namespace App\Actions\Habit;

use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

class GetHabitsAction
{
    public function execute(User $user, ?int $categoryId = null, int $perPage = 15): LengthAwarePaginator
    {
        $today = today()->toDateString();
        $todayDayOfWeek = (int) today()->format('w');

        $habits = $user->habits()
            ->with(['category', 'logs' => fn ($q) => $q->whereDate('logged_date', $today)])
            ->when($categoryId, fn ($q) => $q->where('category_id', $categoryId))
            ->paginate($perPage);

        $habits->through(function ($habit) use ($todayDayOfWeek) {
            $habit->today_logged = $habit->logs->isNotEmpty();
            $habit->scheduled_for_today = $habit->target_days === null
                || in_array($todayDayOfWeek, $habit->target_days);

            return $habit;
        });

        return $habits;
    }
}
