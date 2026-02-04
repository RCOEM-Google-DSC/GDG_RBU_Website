# Minimalist Grid Portfolio Template

A clean, high-contrast minimalist portfolio template featuring a technical drawing aesthetic, bold typography, and a structured grid layout.

## Route Structure

- `/[userId]`: Dynamic user portfolio page.
- `/`: Redirects to the main site.

## Database Schema Integration

This template strictly follows the Supabase database schema:

### Portfolios (`portfolios` table)
- `name`: Displayed as the main heading.
- `about_me`: Displayed in the "About" section.
- `skills`: Categorized into Languages, Frameworks, and Tools.

### Projects (`portfolio_projects` table)
- `name` -> `title` in UI
- `description`: Project summary.
- `image_url`: Project thumbnail.
- `deployed_url` -> `live` link.
- `github_url` -> `github` link.

### Experience (`portfolio_experience` table)
- `role`: Job title.
- `company`: Company name.
- `description`: Work description.
- `start_date` & `end_date`: Formatted as a period (e.g., "2021 - Present").

### Social Links (`portfolio_social_links` table)
- `platform`: Used for icon selection and labeling.
- `url`: Link destination.

## Component Architecture

- `Header`: Sticky navigation with dynamic initials logo.
- `Hero`: Impactful introduction with name and role.
- `About`: Clean text section for professional summary.
- `Skills`: Grouped skill chips with hover effects.
- `Projects`: Large grid layout for featured work.
- `Experience`: Minimalist timeline for career history.
- `Footer`: Simple closing with name and social icons.

## Styling Approach

- **Fonts**: Inter (sans-serif) for body, Oswald (sans-serif) for display/headings.
- **Colors**: Primarily Slate-900 (text) on White (background), with Slate-200 for borders/lines.
- **Animations**: Subtle hover transitions on buttons, links, and project cards.
- **Grid**: Uses a strict 12-column grid system for consistent alignment.

## Usage

To use this template, ensure the user has a record in the `portfolios` table with `template_id` matching this template's identifier.
