<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HabitController;
use App\Http\Controllers\PushSubscriptionController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('login', [AuthController::class, 'login']);
        Route::post('register', [AuthController::class, 'register']);
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('user', [UserController::class, 'show']);
        Route::patch('user', [UserController::class, 'update']);
        Route::patch('user/password', [UserController::class, 'updatePassword']);

        Route::get('habits', [HabitController::class, 'index']);
        Route::post('habits', [HabitController::class, 'store']);
        Route::patch('habits/{habit}', [HabitController::class, 'update']);
        Route::delete('habits/{habit}', [HabitController::class, 'destroy']);
        Route::get('habits/{habit}/logs', [HabitController::class, 'getLogs']);
        Route::post('habits/{habit}/logs', [HabitController::class, 'log']);
        Route::delete('habits/{habit}/logs/{date}', [HabitController::class, 'unlog']);

        Route::get('stats', [StatsController::class, 'index']);

        Route::get('categories', [CategoryController::class, 'index']);
        Route::post('categories', [CategoryController::class, 'store']);
        Route::put('categories/{category}', [CategoryController::class, 'update']);
        Route::delete('categories/{category}', [CategoryController::class, 'destroy']);

        Route::post('push-subscriptions', [PushSubscriptionController::class, 'store']);
        Route::delete('push-subscriptions', [PushSubscriptionController::class, 'destroy']);
    });
});
