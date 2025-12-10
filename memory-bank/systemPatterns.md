# System Patterns: Astralyte

## Architecture Overview

### Application Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Next.js App Router                 │
├─────────────────────────────────────────────────────┤
│  Pages (Server Components)  │  API Routes           │
├─────────────────────────────┼───────────────────────┤
│  Components                 │  Services/Hooks       │
│  - UI (Shadcn)             │  - Agent Orchestration│
│  - Feature Components       │  - API Clients        │
├─────────────────────────────┴───────────────────────┤
│                   Shared Utilities                   │
└─────────────────────────────────────────────────────┘
```

## Coding Patterns

### Component Structure

```typescript
// Feature component pattern
export default function ComponentName() {
  // 1. Hooks
  // 2. State
  // 3. Effects
  // 4. Handlers (prefixed with 'handle')
  // 5. Early returns
  // 6. Render

  const handleClick = () => {
    // handler logic
  };

  if (loading) return <Loading />;

  return <div>{/* Component JSX */}</div>;
}
```

### Naming Conventions

- **Components**: kebab-case (`research-panel.tsx`)
- **Hooks**: camelCase (`useResearch.ts`)
- **Utilities**: kebab-case (`format-date.ts`)
- **Constants**: SCREAMING_SNAKE_CASE (`MAX_RESULTS`)
- **Event Handlers**: `handle` prefix (`handleSubmit`, `handleClick`)
- **Boolean Variables**: `is`/`has`/`should` prefix (`isLoading`, `hasError`)

### File Organization

```
src/
├── app/                    # Routes and pages
│   ├── (routes)/          # Route groups
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/
│   │   └── shadcn/        # Shadcn UI components
│   └── features/          # Feature-specific components
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and helpers
├── services/              # API clients and services
├── types/                 # TypeScript type definitions
└── constants/             # App-wide constants
```

## Design Patterns

### Component Composition

- Use Shadcn UI as base components
- Compose complex UI from smaller, reusable pieces
- Keep components focused and single-responsibility

### State Management

- React Server Components for data fetching where possible
- Client-side state with React hooks
- Consider Zustand or similar for complex global state (if needed)

### Styling Patterns

```typescript
// Use cn utility for conditional classes
import { cn } from "@/lib/utils";

export default function Button({ variant, className }) {
  return (
    <button
      className={cn(
        "base-classes",
        variant === "primary" && "primary-classes",
        className
      )}
    />
  );
}
```

### Accessibility Patterns

```typescript
// All interactive elements must have:
// - tabindex for keyboard navigation
// - aria-label for screen readers
// - onClick AND onKeyDown handlers

<button
  tabIndex={0}
  aria-label="Submit research query"
  onClick={handleClick}
  onKeyDown={handleKeyDown}
>
  Submit
</button>
```

## API Patterns

### Server Actions (Preferred)

```typescript
// app/actions/research.ts
"use server";

export async function submitResearch(query: string) {
  // Server-side logic
}
```

### API Routes (When Needed)

```typescript
// app/api/research/route.ts
export async function POST(request: Request) {
  // API logic
}
```

## Error Handling

- Use error boundaries for component-level errors
- Graceful degradation with fallback UI
- User-friendly error messages
- Log errors for debugging

## Performance Patterns

- Lazy load heavy components
- Use React Suspense for loading states
- Optimize images with Next.js Image component
- Minimize client-side JavaScript

## Testing Strategy (Future)

- Unit tests for utilities and hooks
- Component tests with React Testing Library
- E2E tests with Playwright
- Visual regression tests
