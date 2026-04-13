<?php

namespace App\Http\Controllers;

use App\Actions\Habit\CreateHabitAction;
use App\Actions\Habit\DeleteHabitAction;
use App\Http\Requests\Habit\StoreHabitRequest;
use App\Models\Habit;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HabitController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $habits = $request->user()
            ->habits()
            ->when($request->category_id, fn($q) => $q->where('category_id', $request->category_id))
            ->paginate($request->integer('per_page', 15));

        return response()->json(['data' => $habits]);
    }

    public function store(StoreHabitRequest $request, CreateHabitAction $action): JsonResponse
    {
        $habit = $action->execute($request->user(), $request->validated());

        return response()->json(['data' => $habit], 201);
    }

    public function destroy(Habit $habit, DeleteHabitAction $action): JsonResponse
    {
        $this->authorize('delete', $habit);

        $action->execute($habit);

        return response()->json(null, 204);
    }
}
