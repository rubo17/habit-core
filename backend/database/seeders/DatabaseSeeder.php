<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'rubencabrerizo@gmail.com'],
            [
                'name'              => 'Ruben Cabrerizo',
                'password'          => Hash::make('ruben2005'),
                'email_verified_at' => now(),
            ]
        );

        $seeder = new StatsSeeder();
        $seeder->userId = $user->id;
        $seeder->run();
    }
}
