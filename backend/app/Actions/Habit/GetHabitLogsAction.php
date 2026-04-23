<?php

namespace App\Actions\Habit;

use App\Models\Habit;
use Illuminate\Support\Collection;

class GetHabitLogsAction
{
    public function execute(Habit $habit, int $year): Collection
    {
        return $habit->logs()
            ->whereYear('logged_date', $year)
            ->pluck('logged_date')
            ->map(fn ($date) => $date->toDateString())
            ->values();
    }
}
