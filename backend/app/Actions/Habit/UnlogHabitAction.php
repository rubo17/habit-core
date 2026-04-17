<?php

namespace App\Actions\Habit;

use App\Models\Habit;

class UnlogHabitAction
{
    public function execute(Habit $habit, string $date): void
    {
        $habit->logs()->whereDate('logged_date', $date)->delete();
    }
}
