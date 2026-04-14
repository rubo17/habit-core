<?php

namespace App\Actions\Habit;

use App\Models\Habit;
use App\Models\User;

class CreateHabitAction
{
    public function execute(User $user, array $data): Habit
    {
        return Habit::create(array_merge($data, ['user_id' => $user->id]));
    }
}
