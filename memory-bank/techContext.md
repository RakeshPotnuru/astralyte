# Technical Context: Astralyte

## Technology Stack

### Core Framework

- **Next.js 16.0.7** - React framework with App Router
- **React 19.2.0** - UI library (latest version with new features)
- **TypeScript 5** - Type-safe JavaScript

### Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **tw-animate-css** - Animation utilities for Tailwind

### UI Components

- **Shadcn UI** - Customizable component library
- **Radix UI** - Headless UI primitives (`@radix-ui/react-slot`)
- **Lucide React** - Icon library
- **class-variance-authority (CVA)** - Component variant management
- **clsx** - Conditional class name utility
- **tailwind-merge** - Smart Tailwind class merging

### Development Tools

- **ESLint 9** - Code linting with Next.js config
- **PostCSS** - CSS processing
- **pnpm** - Package manager

## Project Structure

```
astralyte/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Home page
│   │   ├── layout.tsx       # Root layout
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   └── ui/
│   │       └── shadcn/      # Shadcn UI components
│   │           └── button.tsx
│   └── lib/
│       └── utils.ts         # Utility functions (cn helper)
├── public/                  # Static assets
├── memory-bank/             # Project documentation
└── .clinerules/             # AI assistant guidelines
```

## Development Setup

### Prerequisites

- Node.js 20+
- pnpm package manager

### Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Lint and fix
pnpm lint:fix
```

### Local Development

- Development server runs at `http://localhost:3000`
- Hot module replacement enabled
- TypeScript strict mode

## Technical Decisions

### Why Next.js 16 + React 19

- Latest features including Server Components
- Improved performance with streaming
- Better developer experience

### Why Tailwind CSS 4

- Latest version with improved performance
- Better JIT compilation
- Modern CSS features support

### Why Shadcn UI

- Fully customizable components
- Copy-paste approach (no npm dependency)
- Built on Radix UI primitives
- Excellent accessibility

## Constraints and Considerations

- Server Components by default (App Router)
- Client components marked with `"use client"`
- Accessibility is a priority
- Mobile-first responsive design
