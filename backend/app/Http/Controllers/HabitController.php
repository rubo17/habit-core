<?php

namespace App\Http\Controllers;

use App\Actions\Habit\CreateHabitAction;
use App\Actions\Habit\DeleteHabitAction;
use App\Actions\Habit\GetHabitLogsAction;
use App\Actions\Habit\LogHabitAction;
use App\Actions\Habit\UnlogHabitAction;
use App\Actions\Habit\UpdateHabitAction;
use App\Http\Requests\Habit\StoreHabitRequest;
use App\Http\Requests\Habit\UpdateHabitRequest;
use App\Models\Habit;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HabitController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $today = today()->toDateString();

        $habits = $request->user()
            ->habits()
            ->with(['category', 'logs' => fn ($q) => $q->whereDate('logged_date', $today)])
            ->when($request->category_id, fn ($q) => $q->where('category_id', $request->category_id))
            ->paginate($request->integer('per_page', 15));

        $habits->through(function ($habit) {
            $habit->today_logged = $habit->logs->isNotEmpty();
            return $habit;
        });

        return response()->json(['data' => $habits]);
    }

    public function store(StoreHabitRequest $request, CreateHabitAction $action): JsonResponse
    {
        $habit = $action->execute($request->user(), $request->validated());

        return response()->json(['data' => $habit], 201);
    }

    public function update(UpdateHabitRequest $request, Habit $habit, UpdateHabitAction $action): JsonResponse
    {
        abort_if($request->user()->id !== $habit->user_id, 403);

        $habit = $action->execute($habit, $request->validated());

        return response()->json(['data' => $habit]);
    }

    public function destroy(Habit $habit, DeleteHabitAction $action): JsonResponse
    {
        $this->authorize('delete', $habit);

        $action->execute($habit);

        return response()->json(null, 204);
    }

    public function getLogs(Request $request, Habit $habit, GetHabitLogsAction $action): JsonResponse
    {
        abort_if($request->user()->id !== $habit->user_id, 403);

        $dates = $action->execute($habit, $request->integer('year', now()->year));

        return response()->json(['data' => $dates]);
    }

    public function log(Request $request, Habit $habit, LogHabitAction $action): JsonResponse
    {
        abort_if($request->user()->id !== $habit->user_id, 403);

        $action->execute($habit);

        return response()->json(null, 204);
    }

    public function unlog(Request $request, Habit $habit, UnlogHabitAction $action): JsonResponse
    {
        abort_if($request->user()->id !== $habit->user_id, 403);

        $action->execute($habit, $request->route('date'));

        return response()->json(null, 204);
    }
}
