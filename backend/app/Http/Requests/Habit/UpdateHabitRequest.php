<?php

namespace App\Http\Requests\Habit;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHabitRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'category_id'     => 'nullable|exists:categories,id',
            'name'            => 'sometimes|string|max:255',
            'reminder_time'   => 'nullable|date_format:H:i',
            'reminder_days'   => 'nullable|array',
            'reminder_days.*' => 'integer|between:0,6',
            'color'           => 'nullable|string|max:50',
            'icon'            => 'nullable|string|max:50',
        ];
    }
}
