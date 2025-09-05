# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Package Manager**: Uses pnpm (pnpm-lock.yaml present)

**Core Commands**:
- `pnpm dev` - Start development server (Next.js on port 3000)
- `pnpm build` - Build for production 
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Project Architecture

This is a **Next.js 15 SaaS landing page template** built with:
- **Next.js 15** with App Router architecture
- **Tailwind CSS v4** for styling
- **Shadcn/ui components** with New York style variant
- **TypeScript** with strict configuration
- **Framer Motion** for animations

### Key Architecture Patterns

**Route Structure**:
- `src/app/(marketing)/` - Public marketing pages including blog
- `src/app/(auth)/` - Authentication pages (login, signup)
- Root pages are in `src/app/` (page.tsx, layout.tsx)

**Component Organization**:
- `src/components/ui/` - Shadcn/ui base components
- `src/components/magicui/` - Custom animated components (blur-fade, hero-video, etc.)
- `src/components/sections/` - Landing page sections (hero, pricing, features, etc.)
- `src/components/` - Other reusable components

**Configuration & Data**:
- `src/lib/config.tsx` - Central site configuration including navigation, pricing plans, FAQs
- `src/lib/blog.ts` - MDX blog post processing with frontmatter parsing
- `components.json` - Shadcn/ui configuration for component generation

**Content Management**:
- Blog posts stored as MDX files in `content/` directory
- Frontmatter parsing for metadata (title, author, publishedAt, summary)
- Unified pipeline for MDX processing (remark-gfm, rehype-pretty-code)

### Key Features

**Landing Page Components**: The main page (`src/app/page.tsx`) composes sections in this order: Header → Hero → Logos → Problem → Solution → HowItWorks → TestimonialsCarousel → Features → Testimonials → Pricing → FAQ → Blog → CTA → Footer

**Theme System**: Uses next-themes with light default, no system detection. Theme toggle component available globally.

**Image Configuration**: Next.js configured for localhost and randomuser.me remote patterns.

**Aliases**: Uses `@/*` path mapping to `src/*` for clean imports.

## Important Notes

**Styling**: Uses Tailwind CSS v4 (latest version) - check documentation for any syntax differences from v3.

**Component Library**: Shadcn/ui components are configured with "new-york" style, cssVariables enabled, and lucide icons.

**Blog System**: MDX-based with server-side processing, supports syntax highlighting via rehype-pretty-code.