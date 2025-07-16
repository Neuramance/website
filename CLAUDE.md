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

## Architecture Overview

### Next.js App Router Structure
This is a Next.js 14 application using the App Router with route groups:

- `app/(auth)/` - Authentication pages (login, signup) with shared auth layout
- `app/(main)/` - Main application pages (home, account, contact, etc.) with main layout  
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

### Component Architecture
- **UI Components**: Radix UI + Tailwind CSS in `components/ui/`
- **Error Boundaries**: Comprehensive error handling with specialized boundaries
- **Dynamic Imports**: Performance-optimized lazy loading for large components
- **Type Safety**: Comprehensive interfaces in `lib/types/components.ts`

### Styling & Typography
- **Fonts**: Inter Variable (sans-serif) + Geist Mono (monospace)
- **Tailwind**: Custom design system with CSS variables
- **Font Features**: Stylistic sets configured (ss-disambiguation, etc.)

### Performance Optimizations
- **Bundle Splitting**: Dynamic imports for route-based and component-based splitting
- **Image Optimization**: Next.js Image with WebP/AVIF support
- **Caching**: Comprehensive headers and static asset optimization
- **Tree Shaking**: Package import optimization in next.config.js

## Environment Requirements

**Node.js**: >= 18.17.0 (see package.json engines)

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

## Audio Implementation Notes

The audio system is complex and handles:
- Safari autoplay restrictions with user gesture detection
- Memory optimization with proper cleanup and buffering
- Overlay audio that pauses/resumes background music
- Cross-browser compatibility with fallbacks

When working with audio components, always test across browsers, especially Safari.

## Database Seeding

Use `bun run seed` to populate the database (requires proper environment variables).