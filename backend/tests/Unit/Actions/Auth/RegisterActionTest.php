<?php

use App\Actions\Auth\RegisterAction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

uses(TestCase::class, RefreshDatabase::class);

it('creates a user and returns token', function () {
    $result = (new RegisterAction)->execute([
        'name'     => 'Jane Doe',
        'email'    => 'jane@example.com',
        'password' => 'password123',
    ]);

    expect($result)->toHaveKeys(['user', 'token'])
        ->and($result['user'])->toBeInstanceOf(User::class)
        ->and($result['token'])->toBeString();

    $this->assertDatabaseHas('users', ['email' => 'jane@example.com']);
});

it('hashes the password', function () {
    $result = (new RegisterAction)->execute([
        'name'     => 'Jane Doe',
        'email'    => 'jane@example.com',
        'password' => 'password123',
    ]);

    expect($result['user']->password)->not->toBe('password123');
});
