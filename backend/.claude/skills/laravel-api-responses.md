# Laravel API Response Patterns Skill

When returning responses from API controllers:

## Success Response Pattern
- Always wrap data in 'data' key: response()->json(['data' => $resource], 200)
- Use 200 for successful GET/PATCH operations
- Use 201 for successful POST (creation)
- Use 204 for successful DELETE (no content)

## Error Response Pattern
- Validation errors return 422 with 'message' and 'errors' keys
- Unauthorized returns 401 with 'message' key only
- Forbidden returns 403 with 'message' key only
- Not found returns 404 with 'message' key only
- Never expose stack traces or internal errors in responses

## Response Consistency
- Never return bare Eloquent models: Model::find() → must wrap in ['data' => ...]
- Never return collections directly: Model::all() → must wrap in ['data' => ...]
- Never mix response formats (sometimes 'data', sometimes not)

## When to Use Each Status Code
- 200: Resource retrieved/updated successfully
- 201: Resource created successfully
- 204: Resource deleted successfully (empty body)
- 401: No valid authentication token provided
- 403: Valid token but user not authorized for this resource
- 404: Resource doesn't exist
- 422: Request validation failed
