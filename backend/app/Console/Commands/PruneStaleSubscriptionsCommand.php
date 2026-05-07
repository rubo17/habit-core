<?php

namespace App\Console\Commands;

use App\Models\PushSubscription;
use Illuminate\Console\Command;

class PruneStaleSubscriptionsCommand extends Command
{
    protected $signature = 'push:prune-stale';
    protected $description = 'Delete push subscriptions inactive for more than 60 days';

    public function handle(): void
    {
        PushSubscription::where('last_used_at', '<', now()->subDays(60))->delete();
    }
}
