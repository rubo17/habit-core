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
            'reminder_times'   => 'nullable|array',
            'reminder_times.*' => 'string|date_format:H:i',
            'target_days'   => 'nullable|array',
            'target_days.*' => 'integer|between:0,6',
            'color'         => 'nullable|string|max:50',
            'icon'          => 'nullable|string|max:50',
        ];
    }
}
