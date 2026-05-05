<?php

namespace App\Actions\Habit;

use App\Models\Habit;

class UpdateHabitAction
{
    public function execute(Habit $habit, array $data): Habit
    {
        $habit->update($data);
        $habit->load('category');

        $todayDayOfWeek = (int) today()->format('w');
        $habit->scheduled_for_today = $habit->target_days === null
            || in_array($todayDayOfWeek, $habit->target_days);

        return $habit;
    }
}
