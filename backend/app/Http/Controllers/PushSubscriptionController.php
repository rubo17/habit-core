<?php

namespace App\Http\Controllers;

use App\Actions\Push\DeletePushSubscriptionAction;
use App\Actions\Push\StorePushSubscriptionAction;
use App\Http\Requests\Push\StorePushSubscriptionRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PushSubscriptionController extends Controller
{
    public function store(StorePushSubscriptionRequest $request, StorePushSubscriptionAction $action): JsonResponse
    {
        $action->execute($request->user(), $request->validated());

        return response()->json(null, 201);
    }

    public function destroy(Request $request, DeletePushSubscriptionAction $action): JsonResponse
    {
        $action->execute($request->user(), $request->input('endpoint', ''));

        return response()->json(null, 204);
    }
}
