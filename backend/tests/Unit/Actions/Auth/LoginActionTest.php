<?php

use App\Actions\Auth\LoginAction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Exceptions\HttpResponseException;
use Tests\TestCase;

uses(TestCase::class, RefreshDatabase::class);

it('returns user and token on valid credentials', function () {
    $user = User::factory()->create(['password' => bcrypt('password123')]);

    $result = (new LoginAction)->execute([
        'email'    => $user->email,
        'password' => 'password123',
    ]);

    expect($result)->toHaveKeys(['user', 'token'])
        ->and($result['user']->id)->toBe($user->id)
        ->and($result['token'])->toBeString();
});

it('throws 401 on wrong password', function () {
    $user = User::factory()->create(['password' => bcrypt('password123')]);

    (new LoginAction)->execute([
        'email'    => $user->email,
        'password' => 'wrong',
    ]);
})->throws(HttpResponseException::class);

it('throws 401 on non-existent email', function () {
    (new LoginAction)->execute([
        'email'    => 'nobody@example.com',
        'password' => 'password123',
    ]);
})->throws(HttpResponseException::class);
