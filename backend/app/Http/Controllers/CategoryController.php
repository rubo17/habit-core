<?php

namespace App\Http\Controllers;

use App\Actions\Category\CreateCategoryAction;
use App\Actions\Category\DeleteCategoryAction;
use App\Actions\Category\UpdateCategoryAction;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $categories = $request->user()->categories()->get();

        return response()->json(['data' => $categories]);
    }

    public function store(StoreCategoryRequest $request, CreateCategoryAction $action): JsonResponse
    {
        $category = $action->execute($request->user(), $request->validated());

        return response()->json(['data' => $category], 201);
    }

    public function update(UpdateCategoryRequest $request, Category $category, UpdateCategoryAction $action): JsonResponse
    {
        abort_if($request->user()->id !== $category->user_id, 403);

        $category = $action->execute($category, $request->validated());

        return response()->json(['data' => $category]);
    }

    public function destroy(Request $request, Category $category, DeleteCategoryAction $action): JsonResponse
    {
        abort_if($request->user()->id !== $category->user_id, 403);

        $action->execute($category);

        return response()->json(null, 204);
    }
}
