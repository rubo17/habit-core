<?php

namespace App\Actions\Auth;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class ResetPasswordAction
{
    public function execute(array $data): void
    {
        $status = Password::reset(
            $data,
            function ($user, $password) {
                $user->forceFill(['password' => Hash::make($password)])->save();
            }
        );

        if ($status !== Password::PasswordReset) {
            throw new HttpResponseException(
                response()->json(['message' => __($status)], 422)
            );
        }
    }
}
