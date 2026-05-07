<?php

namespace App\Actions\Push;

use App\Models\PushSubscription;

class DeleteExpiredSubscriptionAction
{
    public function execute(string $endpoint): void
    {
        PushSubscription::where('endpoint', $endpoint)->delete();
    }
}
