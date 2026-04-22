<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name'  => 'required|string|max:100',
            'email' => ['required', 'email', Rule::unique('users')->ignore($this->user()->id)],
        ];
    }
}
