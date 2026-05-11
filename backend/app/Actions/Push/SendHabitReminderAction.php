<?php

namespace App\Actions\Push;

use App\Models\Habit;
use Minishlink\WebPush\Subscription;
use Minishlink\WebPush\WebPush;

class SendHabitReminderAction
{
    public function execute(Habit $habit): void
    {
        $subscriptions = $habit->user->pushSubscriptions;

        if ($subscriptions->isEmpty()) {
            return;
        }

        $webPush = new WebPush([
            'VAPID' => [
                'subject'    => config('webpush.vapid.subject'),
                'publicKey'  => config('webpush.vapid.public_key'),
                'privateKey' => config('webpush.vapid.private_key'),
            ],
        ]);

        $payload = json_encode([
            'title' => 'Habit Core',
            'body'  => "Completa tu hábito ({$habit->name})",
            'icon'  => '/icon-192x192.png',
            'badge' => '/icon-192x192.png',
            'tag'   => "habit-{$habit->id}",
            'data'  => ['url' => '/habits', 'habit_id' => $habit->id],
        ]);

        foreach ($subscriptions as $sub) {
            $webPush->queueNotification(
                Subscription::create([
                    'endpoint'        => $sub->endpoint,
                    'keys'            => [
                        'p256dh' => $sub->public_key,
                        'auth'   => $sub->auth_token,
                    ],
                ]),
                $payload
            );
        }

        $deleteExpired = new DeleteExpiredSubscriptionAction();

        foreach ($webPush->flush() as $report) {
            $endpoint = $report->getRequest()->getUri()->__toString();

            if ($report->isSubscriptionExpired()) {
                $deleteExpired->execute($endpoint);
            } elseif ($report->isSuccess()) {
                $subscriptions->firstWhere('endpoint', $endpoint)?->update(['last_used_at' => now()]);
            }
        }
    }
}
