# Soft Portfolio Template Migration

## Overview
This portfolio template has been migrated to Next.js with Supabase integration. It features a modern, "soft" aesthetic with smooth animations and dynamic data fetching.

## Route Structure
- **Root Redirect**: `/soft` redirects to `/`
- **Dynamic User Portfolio**: `/soft/[userId]`
- **Components**: `app/(portfolio)/soft/components/`
- **Data Fetching**: `app/(portfolio)/soft/lib/getPortfolioData.ts`
- **Styles**: `app/(portfolio)/soft/styles.css`

## Database Schema (Supabase)
Strictly adheres to the following tables:
- `portfolios`: Basic info, skills, profile image.
- `portfolio_projects`: Project title, description, image, links.
- `portfolio_experience`: Career history, roles, companies, dates.
- `portfolio_social_links`: Platform and URL.
- `users`: Contact email and phone.

## Component Architecture
- **Server Components**: `[userId]/page.tsx` handles data fetching.
- **Client Components**: `Header.tsx` (for scroll effects and theme toggling).
- **Presentation Components**: `Hero`, `Philosophy`, `Skills`, `Projects`, `Experience`, `Contact`, `Footer`.

## Styling Approach
- **Tailwind CSS**: Core layout and responsiveness.
- **Google Fonts**: 'Playfair Display' (serif/display) and 'Inter' (sans-serif/body).
- **Custom CSS**: Smooth scrolling, custom scrollbar, and fadeInUp animations.
- **Dark Mode**: Fully supported via Tailwind's `dark:` classes.

## Usage
To view a user's portfolio, navigate to `/soft/[userId]` where `[userId]` is the UUID of the user in the Supabase database.

## Customization Guide
- **Colors**: Define in `tailwind.config.ts` under the extended theme.
- **Fonts**: Modify `app/(portfolio)/soft/styles.css` and the layout.
- **Fallback Images**: Updated in the respective component (Hero, Skills, Projects).
