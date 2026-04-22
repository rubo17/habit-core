<?php

namespace App\Actions\User;

use App\Models\User;

class UpdatePasswordAction
{
    public function execute(User $user, string $password): void
    {
        $user->update(['password' => $password]);
    }
}
