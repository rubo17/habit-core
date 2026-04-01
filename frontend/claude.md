
# PROJECT STRUCTURE

src/
 ├── modules/
 │   ├── auth/
 │   ├── habits/
 │   └── stats/
 │
 ├── shared/ (optional)
 │   ├── components/
 │   ├── composables/
 │   └── utils/
 │
 ├── router/
 │
 ├──constanst/
 ├──plugins/
 └── main.ts

Each module is self-contained and follows this structure:
- components/
- composables/
- services/
- types/
- views/

---

# CORE PRINCIPLES

- Keep code simple and maintainable
- Do NOT overengineer
- Follow existing patterns strictly
- Do NOT create new architecture unless explicitly requested

---

# MODULE RULES

- Each feature must live inside its module
- No cross-module dependencies unless necessary
- Shared logic goes into /shared

---

# COMPONENT RULES

- Use <script setup lang="ts">
- Keep components small and focused
- No business logic inside components
- Use composables for logic

---

# COMPOSABLE RULES

- Encapsulate reusable logic
- Must be clean and testable
- No UI inside composables

---

# SERVICES RULES

- Handle API calls and external logic
- No UI logic
- Keep them simple and focused

---

# TYPES RULES

- Define all interfaces and types in /types
- Use TypeScript strictly
- Avoid using `any`

---

# STYLING

- first mobile always
- Use Tailwind CSS only
- No inline styles
- Use CSS variables for theming (light/dark)

---

# ROUTER

- Use layout + nested routes
- Do NOT define layout logic inside views
- Each module can define its own routes

---

# FORBIDDEN

- No large components
- No duplicated logic
- No unnecessary dependencies
- No mixing of concerns

---

# BEFORE CODING

- Analyze existing structure
- Follow the same patterns
- If unsure, ASK instead of guessing

---

# OUTPUT STYLE

- Provide ready-to-use code
- Be concise
- Avoid unnecessary explanations