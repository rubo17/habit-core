<?php

namespace App\Actions\Habit;

use App\Models\Habit;
use App\Models\User;

class CreateHabitAction
{
    public function execute(User $user, array $data): Habit
    {
        $habit = Habit::create(array_merge($data, ['user_id' => $user->id]));

        $todayDayOfWeek = (int) today()->format('w');
        $habit->scheduled_for_today = $habit->target_days === null
            || in_array($todayDayOfWeek, $habit->target_days);

        return $habit;
    }
}
