# Laravel Sanctum Authentication Patterns Skill

When implementing authentication in this Laravel project:

## Token Generation Behavior
- Always generate tokens using $user->createToken('token-name')->plainTextToken
- Never store plain text tokens in database (Sanctum handles hashing)
- Return token in login response as: ['data' => ['token' => $token, 'user' => $user]]

## Route Protection Behavior
- Wrap protected routes in Route::middleware('auth:sanctum')->group()
- Never manually check for tokens in controllers
- Access authenticated user via $request->user() or auth()->user()

## Logout Behavior
- Delete current token using $request->user()->currentAccessToken()->delete()
- For logout-all-devices, use $request->user()->tokens()->delete()

## Login Validation Behavior
- Always verify password using Hash::check($request->password, $user->password)
- Return 401 with message 'Invalid credentials' on failure
- Never expose which part failed (email vs password)
