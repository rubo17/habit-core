# Laravel Naming Conventions Skill

When creating classes and files in this Laravel project, follow these naming rules:

## Class Naming
- Controllers: {Resource}Controller (HabitController)
- Actions: {Verb}{Resource}Action (CreateHabitAction, UpdateHabitAction)
- Services: {Resource}{Purpose}Service (HabitCompletionService)
- FormRequests: {Verb}{Resource}Request (StoreHabitRequest, UpdateHabitRequest)
- Policies: {Resource}Policy (HabitPolicy)
- Models: Singular noun (Habit, User)

## File Organization
- Actions go in app/Actions/{Resource}/ directory
- Services go in app/Services/ directory
- FormRequests go in app/Http/Requests/{Resource}/ directory
- Feature tests go in tests/Feature/{Resource}/
- Unit tests go in tests/Unit/{ClassName}Test.php

## Method Naming in Actions
- Actions have a single public method named execute()
- execute() takes validated data and returns the result
- execute() parameters: (array $data, User $user) or (Model $model, array $data)

## Method Naming in Services
- Services have descriptive public methods for each operation
- Service methods should be verbs: complete(), process(), handle()

## Route Naming
- All API routes go under /api/v1/ prefix
- Use Route::apiResource() for standard CRUD routes
- Custom routes should be RESTful: POST /habits/{id}/complete
