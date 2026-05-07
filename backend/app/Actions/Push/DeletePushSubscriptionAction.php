<?php

namespace App\Actions\Push;

use App\Models\User;

class DeletePushSubscriptionAction
{
    public function execute(User $user, string $endpoint): void
    {
        $user->pushSubscriptions()->where('endpoint', $endpoint)->delete();
    }
}
