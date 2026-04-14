<?php

namespace App\Actions\Habit;

use App\Models\Habit;

class DeleteHabitAction
{
    public function execute(Habit $habit): void
    {
        $habit->delete();
    }
}
