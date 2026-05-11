<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends ResetPassword
{
    public function toMail($notifiable): MailMessage
    {
        $url    = $this->resetUrl($notifiable);
        $expiry = config('auth.passwords.'.config('auth.defaults.passwords').'.expire');

        return (new MailMessage())
            ->subject('Restablecer contraseña · Habit Core')
            ->view('emails.reset-password', [
                'url'    => $url,
                'expiry' => $expiry,
            ]);
    }
}
