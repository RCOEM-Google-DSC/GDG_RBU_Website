# Architectural Portfolio Template

## Overview

This is a dynamic portfolio template with a brutalist/architectural design aesthetic. Each user gets their own portfolio page with data fetched from the Supabase database.

## Route Structure

### Dynamic User Portfolio

- **URL Pattern**: `/architectural/[userId]`
- **Example**: `/architectural/123e4567-e89b-12d3-a456-426614174000`
- **Description**: Displays the portfolio for a specific user based on their UUID

### Root Route

- **URL Pattern**: `/architectural`
- **Behavior**: Redirects to home page (no userId provided)

## Database Schema

The portfolio pulls data from the following Supabase tables:

### `portfolios`

- `id` (uuid)
- `user_id` (uuid) - Links to users table
- `template_id` (uuid)
- `name` (text) - User's display name
- `profile_image` (text)
- `about_me` (text)
- `skills` (text[]) - Array of skill names
- `created_at`, `updated_at`

### `portfolio_projects`

- `id` (uuid)
- `portfolio_id` (uuid)
- `name` (text) - Project title
- `description` (text)
- `image_url` (text)
- `github_url` (text)
- `deployed_url` (text)
- `created_at`

### `portfolio_experience`

- `id` (uuid)
- `portfolio_id` (uuid)
- `role` (text)
- `company` (text)
- `description` (text)
- `start_date` (date)
- `end_date` (date) - null if current position

### `portfolio_social_links`

- `id` (uuid)
- `portfolio_id` (uuid)
- `platform` (text) - e.g., "GitHub", "LinkedIn", "Twitter"
- `url` (text)

### `users` (for contact info)

- `email` (text)
- `phone_number` (text)

## Features

### Conditional Rendering

Sections automatically hide if they have no data:

- **Projects**: Hidden if no projects exist
- **Skills**: Hidden if no skills exist
- **Experience**: Hidden if no experience entries exist
- **Contact Info**: Email/phone only shown if available

### SEO Optimization

- Dynamic metadata generation based on portfolio data
- Open Graph tags for social sharing
- Proper page titles and descriptions

### Styling

- **Fonts**: Inter (body), Oswald (headings)
- **Accent Color**: Red-600 (#DC2626)
- **Theme**: Dark mode with brutalist design
- **Animations**: Smooth hover effects on all interactive elements

## Component Structure

```
app/(portfolio)/architectural/
├── [userId]/
│   └── page.tsx          # Dynamic user portfolio page
├── components/
│   ├── Header.tsx        # Fixed navigation
│   ├── Hero.tsx          # Name, role, about section
│   ├── Projects.tsx      # Project showcase with images
│   ├── Skills.tsx        # Categorized skills
│   ├── Experience.tsx    # Work history timeline
│   ├── Footer.tsx        # Contact info and social links
│   └── ui/
│       └── SectionHeading.tsx  # Reusable section header
├── lib/
│   └── getPortfolioData.ts    # Data fetching logic
├── layout.tsx            # Portfolio-specific layout
├── styles.css            # Custom styles and fonts
└── page.tsx              # Root redirect

```

## Usage

### For Users

1. Ensure your portfolio data is in the Supabase database
2. Access your portfolio at: `/architectural/YOUR_USER_ID`
3. Share the link with potential employers/clients

### For Developers

1. User IDs come from the URL parameter
2. Data is fetched server-side for optimal performance
3. 404 page shown if portfolio doesn't exist
4. All data follows the exact database schema

## Data Flow

1. User visits `/architectural/[userId]`
2. `getPortfolioData(userId)` fetches from Supabase
3. Data is transformed to match component props
4. Components conditionally render based on available data
5. If no data found, Next.js 404 page is shown

## Customization

### Adding New Sections

1. Create component in `components/`
2. Add data fetching logic in `getPortfolioData.ts`
3. Import and render in `[userId]/page.tsx`

### Styling Changes

- Modify `styles.css` for global portfolio styles
- Update `tailwind.config.ts` for theme colors
- Edit individual components for specific styling

## Notes

- All fields strictly follow the database schema
- No fallback/dummy data - real data only
- Optimized for performance with server-side rendering
- Fully responsive design
- Accessibility-first approach
