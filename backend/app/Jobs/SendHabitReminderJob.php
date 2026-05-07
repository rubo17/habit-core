<?php

namespace App\Jobs;

use App\Actions\Push\SendHabitReminderAction;
use App\Models\Habit;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendHabitReminderJob implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;
    public int $backoff = 60;

    public function __construct(public readonly Habit $habit) {}

    public function handle(SendHabitReminderAction $action): void
    {
        $action->execute($this->habit);
    }
}
