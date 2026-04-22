<?php

namespace App\Actions\Category;

use App\Models\Category;
use App\Models\User;

class CreateCategoryAction
{
    public function execute(User $user, array $data): Category
    {
        return Category::create(array_merge($data, ['user_id' => $user->id]));
    }
}
