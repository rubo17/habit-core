<?php

namespace App\Actions\Auth;

use App\Models\User;
use Laravel\Socialite\Contracts\User as SocialiteUser;

class GoogleAuthAction
{
    public function execute(SocialiteUser $googleUser): array
    {
        $user = User::updateOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name'              => $googleUser->getName(),
                'google_id'         => $googleUser->getId(),
                'email_verified_at' => now(),
            ]
        );

        return ['user' => $user, 'token' => $user->createToken('auth-token')->plainTextToken];
    }
}
