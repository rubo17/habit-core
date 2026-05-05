<?php

namespace App\Http\Controllers;

use App\Actions\Stats\GetUserStatsAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StatsController extends Controller
{
    public function __construct(private GetUserStatsAction $action) {}

    public function index(Request $request): JsonResponse
    {
        $period = (int) $request->query('period', 30);
        if (!in_array($period, [7, 30, 90])) {
            $period = 30;
        }

        $stats = $this->action->execute($request->user()->id, $period);

        return response()->json(['data' => $stats]);
    }
}
