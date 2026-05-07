<?php

namespace App\Actions\Push;

use App\Models\PushSubscription;
use App\Models\User;

class StorePushSubscriptionAction
{
    public function execute(User $user, array $data): PushSubscription
    {
        return PushSubscription::updateOrCreate(
            ['endpoint' => $data['endpoint']],
            [
                'user_id'      => $user->id,
                'public_key'   => $data['public_key'],
                'auth_token'   => $data['auth_token'],
                'last_used_at' => now(),
            ]
        );
    }
}
