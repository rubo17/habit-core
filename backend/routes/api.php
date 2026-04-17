<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\HabitController;
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
        Route::delete('habits/{habit}', [HabitController::class, 'destroy']);
        Route::post('habits/{habit}/logs', [HabitController::class, 'log']);
        Route::delete('habits/{habit}/logs/{date}', [HabitController::class, 'unlog']);
    });
});
