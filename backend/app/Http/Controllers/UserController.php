<?php

namespace App\Http\Controllers;

use App\Actions\User\UpdatePasswordAction;
use App\Actions\User\UpdateUserAction;
use App\Http\Requests\User\UpdatePasswordRequest;
use App\Http\Requests\User\UpdateUserRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        return response()->json(['data' => $request->user()]);
    }

    public function update(UpdateUserRequest $request, UpdateUserAction $action): JsonResponse
    {
        $user = $action->execute($request->user(), $request->validated());

        return response()->json(['data' => $user]);
    }

    public function updatePassword(UpdatePasswordRequest $request, UpdatePasswordAction $action): JsonResponse
    {
        $action->execute($request->user(), $request->validated()['password'], $request->validated()['current_password']);

        return response()->json(null, 204);
    }
}
