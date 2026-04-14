<?php

namespace App\Http\Requests\Habit;

use Illuminate\Foundation\Http\FormRequest;

class StoreHabitRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'category_id'   => 'nullable|exists:categories,id',
            'name'          => 'required|string|max:255',
            'frequency'     => 'required|in:daily',
            'reminder_time' => 'nullable|date_format:H:i',
            'color'         => 'nullable|string|max:50',
            'icon'          => 'nullable|string|max:50',
        ];
    }
}
