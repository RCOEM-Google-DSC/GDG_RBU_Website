# Hyun Barng Style Portfolio Template

A dark-themed, sophisticated portfolio template featuring high-impact typography, smooth transitions, and a focus on "Unseen Logic" and technical excellence.

## Route Structure

- `/[userId]`: Dynamic user portfolio page.
- `/`: Redirects to the main site.

## Database Schema Integration

This template strictly follows the Supabase database schema:

### Portfolios (`portfolios` table)
- `name`: Displayed in the Navbar and Hero with a bold "DISPLAY" style.
- `about_me`: Displayed in the "Beyond The Surface" section.
- `profile_image`: Used in the About section.

### Projects (`portfolio_projects` table)
- `name` -> `title` in UI.
- `description`: Project summary.
- `image_url`: Large, immersive project card background.
- `deployed_url` / `github_url` -> "View Project" link.

### Experience (`portfolio_experience` table)
- `role`: Job title.
- `company`: Company name.
- `description`: Work description.
- `start_date` & `end_date`: Formatted as a period.
- `isLatest`: Automatically determined based on date.

### Social Links (`portfolio_social_links` table)
- `platform`: Displayed as pill-buttons in the Hero section and text-links in the Footer.
- `url`: Link destination.

## Component Architecture

- `Navbar`: Translucent sticky header with dark mode toggle.
- `Hero`: Immersive entrance with Archivo Black typography and grain effect.
- `About`: Centered text focus with "Beyond The Surface" aesthetic.
- `Skills`: Categorized skill cards with Material Icons.
- `Projects`: Large-scale article cards with gradient overlays.
- `Experience`: Vertical timeline with accent dots.
- `Footer`: Clean closing with "Let's Chat" CTA.

## Styling Approach

- **Fonts**: Archivo Black (display), Inter (body).
- **Colors**: Deep dark backgrounds (`#050505`), light surfaces (`#F3F3F3`), and high-contrast accents.
- **Effects**: Grain overlay for texture, material icons for visual cues, and smooth dark/light mode transitions.

## Usage

Ensure the user has a record in the `portfolios` table. The template leverages Tailwind CSS for all responsive layouts and interactions.
