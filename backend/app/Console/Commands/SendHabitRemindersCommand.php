<?php

namespace App\Console\Commands;

use App\Jobs\SendHabitReminderJob;
use App\Models\Habit;
use Illuminate\Console\Command;

class SendHabitRemindersCommand extends Command
{
    protected $signature = 'push:send-reminders';
    protected $description = 'Dispatch reminder jobs for habits scheduled at the current time';

    public function handle(): void
    {
        $now = now(config('app.timezone'));
        $todayDow = (string) $now->dayOfWeek;
        $currentTime = $now->format('H:i');

        Habit::whereNotNull('reminder_times')
            ->whereRaw(
                "JSON_UNQUOTE(JSON_EXTRACT(reminder_times, '$.\"$todayDow\"')) = ?",
                [$currentTime]
            )
            ->each(fn(Habit $habit) => SendHabitReminderJob::dispatch($habit));
    }
}
