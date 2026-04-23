<?php

namespace App\Actions\Habit;

use App\Models\Habit;

class UpdateHabitAction
{
    public function execute(Habit $habit, array $data): Habit
    {
        $habit->update($data);

        return $habit;
    }
}
