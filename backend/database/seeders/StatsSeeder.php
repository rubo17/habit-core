<?php

namespace Database\Seeders;

use App\Models\Habit;
use App\Models\HabitLog;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatsSeeder extends Seeder
{
    public function run(): void
    {
        $userId = 3;

        DB::table('categories')->insert([
            ['user_id' => $userId, 'name' => 'Salud', 'icon' => 'heart', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => $userId, 'name' => 'Mente', 'icon' => 'brain', 'created_at' => now(), 'updated_at' => now()],
        ]);

        $healthCategoryId = DB::table('categories')->where('user_id', $userId)->where('name', 'Salud')->value('id');
        $mindCategoryId   = DB::table('categories')->where('user_id', $userId)->where('name', 'Mente')->value('id');

        $habits = [
            [
                'name'        => 'Ejercicio',
                'color'       => '#10b981',
                'icon'        => 'running',
                'category_id' => $healthCategoryId,
                'target_days' => json_encode([1, 3, 5]),
                'rate'        => 0.85,
            ],
            [
                'name'        => 'Meditación',
                'color'       => '#8b5cf6',
                'icon'        => 'sparkles',
                'category_id' => $mindCategoryId,
                'target_days' => null,
                'rate'        => 0.65,
            ],
            [
                'name'        => 'Lectura',
                'color'       => '#f59e0b',
                'icon'        => 'book',
                'category_id' => $mindCategoryId,
                'target_days' => null,
                'rate'        => 0.50,
            ],
            [
                'name'        => 'Agua',
                'color'       => '#3b82f6',
                'icon'        => 'drop',
                'category_id' => $healthCategoryId,
                'target_days' => null,
                'rate'        => 0.90,
            ],
            [
                'name'        => 'Sin azúcar',
                'color'       => '#ef4444',
                'icon'        => 'fire',
                'category_id' => $healthCategoryId,
                'target_days' => json_encode([1, 2, 3, 4, 5]),
                'rate'        => 0.40,
            ],
        ];

        $habitIds = [];
        foreach ($habits as $habit) {
            $id = DB::table('habits')->insertGetId([
                'user_id'     => $userId,
                'category_id' => $habit['category_id'],
                'name'        => $habit['name'],
                'frequency'   => 'daily',
                'color'       => $habit['color'],
                'icon'        => $habit['icon'],
                'target_days' => $habit['target_days'],
                'created_at'  => now()->subDays(90),
                'updated_at'  => now(),
            ]);
            $habitIds[] = ['id' => $id, 'target_days' => $habit['target_days'] ? json_decode($habit['target_days']) : null, 'rate' => $habit['rate']];
        }

        $logsToInsert = [];
        $today = now();

        for ($daysAgo = 90; $daysAgo >= 0; $daysAgo--) {
            $date = $today->copy()->subDays($daysAgo);
            $dateStr = $date->toDateString();
            $dayOfWeek = (int) $date->format('w');

            foreach ($habitIds as $habit) {
                $isEligible = $habit['target_days'] === null || in_array($dayOfWeek, $habit['target_days']);
                if (!$isEligible) continue;

                $shouldLog = (lcg_value() < $habit['rate']);
                if (!$shouldLog) continue;

                $logsToInsert[] = [
                    'habit_id'    => $habit['id'],
                    'logged_date' => $dateStr,
                    'created_at'  => $date,
                    'updated_at'  => $date,
                ];
            }
        }

        foreach (array_chunk($logsToInsert, 100) as $chunk) {
            DB::table('habit_logs')->insertOrIgnore($chunk);
        }
    }
}
