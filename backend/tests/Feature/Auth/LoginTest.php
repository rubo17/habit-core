<?php

use App\Models\User;

it('logs in a user and returns token', function () {
    $user = User::factory()->create(['password' => bcrypt('password123')]);

    $response = $this->postJson('/api/v1/auth/login', [
        'email'    => $user->email,
        'password' => 'password123',
    ]);

    $response->assertStatus(200)
        ->assertJsonStructure(['data' => ['user', 'token']]);
});

it('fails with wrong password', function () {
    $user = User::factory()->create(['password' => bcrypt('password123')]);

    $response = $this->postJson('/api/v1/auth/login', [
        'email'    => $user->email,
        'password' => 'wrongpassword',
    ]);

    $response->assertStatus(401)
        ->assertJson(['message' => 'Invalid credentials']);
});

it('fails with non-existent email', function () {
    $response = $this->postJson('/api/v1/auth/login', [
        'email'    => 'nobody@example.com',
        'password' => 'password123',
    ]);

    $response->assertStatus(401)
        ->assertJson(['message' => 'Invalid credentials']);
});

it('fails when required fields are missing', function () {
    $response = $this->postJson('/api/v1/auth/login', []);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['email', 'password']);
});
