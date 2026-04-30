<?php

namespace App\Actions\User;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UpdatePasswordAction
{
    public function execute(User $user, string $newPassword, ?string $currentPassword = null): void
    {
        if ($this->userHasPassword($user)) {
            if (empty($currentPassword)) {
                throw ValidationException::withMessages([
                    'current_password' => ['Debes proporcionar tu contraseña actual.']
                ]);
            }

            if (!Hash::check($currentPassword, $user->password)) {
                throw ValidationException::withMessages([
                    'current_password' => ['La contraseña actual es incorrecta.']
                ]);
            }
        } else {
            if (!empty($currentPassword)) {
                throw ValidationException::withMessages([
                    'current_password' => ['No tienes una contraseña actual (deja el campo vacío).']
                ]);
            }
        }

        $user->update([
            'password' => Hash::make($newPassword)
        ]);
    }

        private function userHasPassword(User $user): bool
    {
        return !empty($user->password);
    }
}
