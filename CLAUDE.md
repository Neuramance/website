# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

**Always use `bun` for this project, never `npm`, `yarn`, or `pnpm`.**

## Development Commands

- `bun dev` - Start development server
- `bun run build` - Create production build 
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run prettier` - Format code with Prettier
- `bun run prettier:check` - Check code formatting
- `bun run seed` - Run database seeding script

## Architecture Overview

### Next.js App Router Structure
This is a Next.js 14 application using the App Router with route groups:

- `app/(auth)/` - Authentication pages (login, signup) with shared auth layout
- `app/(main)/` - Main application pages with main layout
  - Homepage, account, chat, contact pages
  - Product pages: deepstrategy, hypercognition, openpaideia, lingua
  - Waitlist signup functionality
- `app/auth/` - API routes for authentication callbacks
- `app/layout.tsx` - Root layout with global providers

### Authentication & Database
- **Supabase**: Authentication and database with SSR support
- **Middleware**: Session management via `middleware.ts` for protected routes
- **Client Pattern**: Singleton Supabase client in `lib/supabase/client.ts` prevents recreation
- **Server Actions**: Authentication actions in `lib/auth/actions.ts`

### Audio System Architecture
Central audio management system with sophisticated browser compatibility:

- **AudioContext**: Global state management in `lib/contexts/AudioContext.tsx`
- **Dual Audio Support**: Background tracks + overlay sounds (e.g., sound effects)
- **Browser Detection**: Safari-specific handling in `lib/utils/browser-detection.ts`
- **Memory Management**: Optimized buffering and cleanup to prevent memory leaks
- **Autoplay Handling**: Graceful degradation for browser autoplay policies
- **Performance Optimization**: Audio optimization utilities in `lib/utils/audio-optimization.ts`
- **Context Management**: Multiple audio context files for complex state scenarios

### Component Architecture
- **UI Components**: Radix UI + Tailwind CSS in `components/ui/`
- **Error Boundaries**: Comprehensive error handling with specialized boundaries
- **Dynamic Imports**: Performance-optimized lazy loading for large components
- **Type Safety**: Comprehensive interfaces in `lib/types/components.ts`

### Styling & Typography
- **Fonts**: Inter Variable (sans-serif) + Geist Mono (monospace)
- **Tailwind**: Custom design system with CSS variables
- **Font Features**: OpenType features via tailwindcss-opentype plugin

### Performance Optimizations
- **Bundle Splitting**: Dynamic imports for route-based and component-based splitting
- **Image Optimization**: Next.js Image with WebP/AVIF support
- **Caching**: Comprehensive headers and static asset optimization
- **Tree Shaking**: Package import optimization in next.config.js

## Environment Requirements

**Node.js**: >= 18.17.0 (see package.json engines)

## Key Dependencies

### Core Framework
- **Next.js**: 14.2.30 with App Router
- **React**: 18.2.0 with Server Components
- **TypeScript**: 5.2.2 for type safety

### Database & Authentication
- **Supabase**: Primary authentication and database (@supabase/supabase-js, @supabase/ssr)
- **Vercel Postgres**: Additional database integration (@vercel/postgres)
- **NextAuth**: Alternative/additional auth system (next-auth)

### UI & Styling
- **Radix UI**: Comprehensive component library with theming (@radix-ui/themes)
- **Tailwind CSS**: 4.1.10 with animations and OpenType features
- **Lucide React**: Icon system
- **React PowerGlitch**: Visual effects for enhanced UI

### Development Tools
- **React Hook Form**: 7.58.1 with @hookform/resolvers for form handling
- **Zod**: 3.25.67 for schema validation
- **Class Variance Authority**: Component variant management
- **Framer Motion**: Animation library for UI interactions

## Key File Patterns

### Route Organization
- Route groups `(auth)` and `(main)` provide layout isolation
- API routes in `app/auth/` for authentication flows
- Page components use dynamic imports for performance

### State Management
- Audio state via React Context (not external state library)
- Form state via react-hook-form + zod validation
- Authentication state via Supabase auth helpers

### Component Patterns
- Error boundaries wrap major application sections
- Dynamic imports for heavy components (Hero, auth forms)
- Consistent prop interfaces extending BaseComponentProps

### Security
- URL validation for redirect prevention in auth flows
- CSP headers and security policies in next.config.js
- Production console log removal while preserving errors/warnings
- Comprehensive logging system via `lib/utils/logger.ts`
- Secure authentication flow handling with multiple providers

## Audio Implementation Notes

The audio system is complex and handles:
- Safari autoplay restrictions with user gesture detection
- Memory optimization with proper cleanup and buffering
- Overlay audio that pauses/resumes background music
- Cross-browser compatibility with fallbacks

When working with audio components, always test across browsers, especially Safari.

## Development Tools & Utilities

### Logging System
- **Production Logger**: `lib/utils/logger.ts` provides structured logging
- **Audio Optimization**: `lib/utils/audio-optimization.ts` for performance monitoring
- **Browser Detection**: Enhanced Safari compatibility handling

### Development Directories
- `docs/optimizations/` - Performance and optimization documentation
- `lib/hooks/` - Custom React hooks for shared functionality
- `components/dev/` - Development-only components and utilities

### Custom Hooks
- Audio management hooks for global state
- Form validation and submission hooks
- Browser compatibility detection hooks

## Environment Setup

### Using Vercel CLI for Environment Variables

For local development, use the Vercel CLI to sync environment variables:

1. **Install Vercel CLI**: `bun add -g vercel`
2. **Link project**: `vercel link` (follow prompts to connect to Vercel project)
3. **Pull environment variables**: `vercel env pull` (creates/updates `.env.local`)

**Notes**:
- `vercel dev` automatically downloads environment variables into memory
- Restart development server after pulling new environment variables
- Use `NEXT_PUBLIC_` prefix for client-side accessible variables

## UI/UX Implementation Notes

### Focus Ring Management
The application implements professional-grade focus ring removal (similar to Stripe.com) via global CSS in `styles/global.css`. All focus rings are disabled for both mouse and keyboard interactions to match modern web application standards.

### Dropdown/Menu Components
When implementing hover dropdowns:
- Use controlled state with Radix UI components for consistency
- Device detection via `(hover: hover)` media query to enable hover only on capable devices
- Avoid conflicting custom animations with Radix UI's built-in animations
- Include timeout delays (300ms) for smooth mouse interactions
- Separate hover-triggered vs click-triggered state management

### Component State Patterns
- Use `useRef` for timeout management and cleanup
- Implement proper device capability detection for touch vs hover devices
- Separate event handling logic for different interaction types (mouse, keyboard, touch)

## Security Architecture

### Comprehensive Security Headers
- **CSP**: Strict Content Security Policy in middleware with Supabase allowlisting
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- **Cookie Security**: Enhanced httpOnly, secure, sameSite cookie handling in middleware
- **Image Security**: SVG sanitization with CSP sandbox in next.config.js

### Authentication Security
- **Session Management**: Automatic token refresh via middleware
- **Route Protection**: Middleware-based session validation for protected routes
- **Secure Cookies**: Production-optimized cookie settings with proper SameSite handling

## Testing Commands

Currently, the project does not have a dedicated test framework configured. When implementing tests:
- Check for test framework setup before running tests
- Consider adding Jest or Vitest for unit testing
- Use Playwright or Cypress for E2E testing if needed