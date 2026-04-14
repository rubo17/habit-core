<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\HabitController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('login', [AuthController::class, 'login']);
        Route::post('register', [AuthController::class, 'register']);
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('habits', [HabitController::class, 'index']);
        Route::post('habits', [HabitController::class, 'store']);
        Route::delete('habits/{habit}', [HabitController::class, 'destroy']);
    });
});
