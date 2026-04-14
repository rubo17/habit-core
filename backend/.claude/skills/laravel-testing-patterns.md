# Laravel Testing Patterns Skill (Pest)

When writing tests for this Laravel project using Pest:

## Feature Test Structure
- Use beforeEach() to set up common test data
- Use descriptive test names: it('creates a habit via API', ...)
- Always authenticate with ->actingAs($user, 'sanctum')
- Always use JSON methods: ->postJson(), ->getJson(), ->patchJson()

## Assertion Behavior
- Always assert HTTP status first: ->assertStatus(201)
- Then assert JSON structure: ->assertJsonStructure(['data' => [...]])
- Then assert database state: $this->assertDatabaseHas('habits', [...])

## Authorization Test Pattern
- Create owner and different user
- Attempt action as different user
- Assert 403 status

```php
it('prevents unauthorized access', function () {
    $owner = User::factory()->create();
    $other = User::factory()->create();
    $resource = Resource::factory()->for($owner)->create();

    $response = $this->actingAs($other, 'sanctum')
        ->deleteJson("/api/v1/resources/{$resource->id}");

    $response->assertStatus(403);
});
```

## Test Coverage Checklist
For every resource endpoint, write tests for:
- Successful operation (200/201)
- Unauthenticated request (401)
- Unauthorized access (403)
- Validation failures (422)
- Not found scenarios (404)

## Unit Test Behavior for Actions
- Instantiate action class directly: $action = new CreateHabitAction()
- Call execute() with test data
- Assert returned model has correct attributes
- Use expect() syntax: expect($result)->toBeInstanceOf(Habit::class)
