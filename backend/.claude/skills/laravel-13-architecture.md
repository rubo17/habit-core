# Laravel 13 Architecture Skill

When writing Laravel code for this project, enforce these behavioral rules:

## Controller Behavior
- Controllers act as thin dispatchers only
- Never write business logic inside controller methods
- Never write validation logic in controllers (always delegate to FormRequest)
- Never write authorization checks in controllers (always delegate to Policy)
- Never write queries in controllers (always delegate to Action/Service)
- Controller methods should follow this pattern: receive → validate → call action → return JSON

## Business Logic Placement
- Single-responsibility operations go in Actions (e.g., CreateHabitAction)
- Orchestration of multiple operations goes in Services (e.g., HabitCompletionService)
- When deciding: if it's one focused task → Action, if it coordinates multiple actions → Service
- Always inject Actions/Services via constructor or method parameters

## Validation Behavior
- All validation rules go in FormRequest classes
- FormRequest classes live in app/Http/Requests/{Resource}/
- Never use $request->validate() or Validator::make() in controllers
- Custom validation messages go in FormRequest messages() method

## Authorization Behavior
- All authorization logic goes in Policy classes
- Always call $this->authorize() in controller before performing action
- Policy methods should return boolean or Response
- Never write if ($user->id === $resource->user_id) in controllers

## Model Behavior
- Models are data containers only
- Only define: $fillable, $casts, relationships, and query scopes
- Never write business logic methods in models
- Always use explicit $fillable array, never $guarded = []

## Response Behavior
- Always return JSON responses in this format: response()->json(['data' => $result], statusCode)
- Use 200 for success, 201 for created, 204 for deleted, 422 for validation errors
- Never return raw Eloquent models, always wrap in ['data' => ...]

## Testing Behavior
- Write feature tests for every API endpoint
- Write unit tests for every Action and Service
- Use Pest syntax, not PHPUnit
- Always use factories, never create records manually in tests
- Test matrix: success case, auth required, authorization check, validation errors
