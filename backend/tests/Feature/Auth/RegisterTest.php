<?php

use App\Models\User;

it('registers a user and returns token', function () {
    $response = $this->postJson('/api/v1/auth/register', [
        'name'                  => 'Jane Doe',
        'email'                 => 'jane@example.com',
        'password'              => 'password123',
        'password_confirmation' => 'password123',
    ]);

    $response->assertStatus(201)
        ->assertJsonStructure(['data' => ['user', 'token']]);

    $this->assertDatabaseHas('users', ['email' => 'jane@example.com']);
});

it('fails with duplicate email', function () {
    User::factory()->create(['email' => 'jane@example.com']);

    $response = $this->postJson('/api/v1/auth/register', [
        'name'                  => 'Jane Doe',
        'email'                 => 'jane@example.com',
        'password'              => 'password123',
        'password_confirmation' => 'password123',
    ]);

    $response->assertStatus(422);
});

it('fails when password confirmation does not match', function () {
    $response = $this->postJson('/api/v1/auth/register', [
        'name'                  => 'Jane Doe',
        'email'                 => 'jane@example.com',
        'password'              => 'password123',
        'password_confirmation' => 'different',
    ]);

    $response->assertStatus(422);
});

it('fails when required fields are missing', function () {
    $response = $this->postJson('/api/v1/auth/register', []);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['name', 'email', 'password']);
});
