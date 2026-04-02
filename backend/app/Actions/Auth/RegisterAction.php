<?php

namespace App\Actions\Auth;

use App\Models\User;

class RegisterAction
{
    public function execute(array $data): array
    {
        $user = User::create($data);

        $token = $user->createToken('auth-token')->plainTextToken;

        return ['user' => $user, 'token' => $token];
    }
}
