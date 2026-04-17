<?php

namespace App\Actions\Habit;

use App\Models\Habit;
use App\Models\HabitLog;

class LogHabitAction
{
    public function execute(Habit $habit): HabitLog
    {
        return $habit->logs()->firstOrCreate([
            'logged_date' => today()->toDateString(),
        ]);
    }
}
