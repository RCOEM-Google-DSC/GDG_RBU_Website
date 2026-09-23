# Portfolio Module

Self-contained, pluggable portfolio builder feature for GDG chapter websites.
Drop it in → set env vars → portfolio builder works.

## Quick Start

### 1. Required Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

Image uploads (optional):
```env
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### 2. Database Tables

Run the following SQL in your Supabase project. The `users` table is assumed to already exist.

```sql
CREATE TABLE public.portfolio_templates (
  id text NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  preview_image_url text,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (id)
);

CREATE TABLE public.portfolios (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  template_id text NOT NULL,
  display_name text NOT NULL,
  profile_image_url text,
  about_me text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_published boolean NOT NULL DEFAULT false,
  languages text[] DEFAULT '{}',
  frameworks text[] DEFAULT '{}',
  tools text[] DEFAULT '{}',
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES public.users(id),
  FOREIGN KEY (template_id) REFERENCES public.portfolio_templates(id)
);

CREATE TABLE public.portfolio_projects (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  portfolio_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  image_url text,
  github_url text,
  live_url text,
  created_at timestamptz DEFAULT now(),
  technologies text[] DEFAULT '{}',
  display_order integer NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  FOREIGN KEY (portfolio_id) REFERENCES public.portfolios(id)
);

CREATE TABLE public.portfolio_experience (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  portfolio_id uuid NOT NULL,
  role text NOT NULL,
  company text NOT NULL,
  description text,
  start_date date NOT NULL,
  end_date date,
  is_current boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (id),
  FOREIGN KEY (portfolio_id) REFERENCES public.portfolios(id)
);

CREATE TABLE public.portfolio_social_links (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  portfolio_id uuid NOT NULL,
  platform text NOT NULL,
  url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (id),
  FOREIGN KEY (portfolio_id) REFERENCES public.portfolios(id)
);
```

### 3. Usage

**Server-side (API routes, Server Components):**

```ts
import { PortfolioService } from "@/modules/portfolio/portfolio.service";

const service = new PortfolioService();
const portfolio = await service.get(userId);
const published = await service.getPublished(userId);
const templates = await service.getTemplates();
```

**Client-side (React components):**

```ts
import { createPortfolioApiClient } from '@/modules/portfolio';

const api = createPortfolioApiClient();
const { portfolio } = await api.get();
await api.addProject({ title: 'My App', portfolio_id: '...' });
```

**Custom configuration:**

```ts
const service = new PortfolioService({
  uploadFolder: 'MY_ORG_PORTFOLIO',
  portfoliosTable: 'custom_portfolios',
});
```

## Architecture

```
modules/portfolio/
├── index.ts                  # Barrel export (public API)
├── portfolio.types.ts        # All type definitions
├── portfolio.config.ts       # Config factory + template registry
├── portfolio.service.ts      # Server-side data operations
├── portfolio.client.ts       # Client-side fetch wrapper
├── portfolio.validation.ts   # Zod schemas for input validation
├── portfolio.transformers.ts # Template-specific data transformers
├── migrations/
│   └── rename-templates.sql  # Template ID rename migration
└── README.md                 # This file
```

### API Endpoints

| Method | Path                                 | Description              | Auth Required |
|--------|--------------------------------------|--------------------------|---------------|
| GET    | `/api/portfolio`                     | Current user's portfolio | Yes           |
| POST   | `/api/portfolio`                     | Create portfolio         | Yes           |
| PUT    | `/api/portfolio`                     | Update portfolio         | Yes           |
| DELETE | `/api/portfolio`                     | Delete portfolio         | Yes           |
| GET    | `/api/portfolio/:userId`             | Public portfolio         | No            |
| GET    | `/api/portfolio/projects`            | List projects            | Yes           |
| POST   | `/api/portfolio/projects`            | Add project              | Yes           |
| PUT    | `/api/portfolio/projects/:id`        | Update project           | Yes           |
| DELETE | `/api/portfolio/projects/:id`        | Delete project           | Yes           |
| GET    | `/api/portfolio/experience`          | List experience          | Yes           |
| POST   | `/api/portfolio/experience`          | Add experience           | Yes           |
| PUT    | `/api/portfolio/experience/:id`      | Update experience        | Yes           |
| DELETE | `/api/portfolio/experience/:id`      | Delete experience        | Yes           |
| GET    | `/api/portfolio/social-links`        | List social links        | Yes           |
| POST   | `/api/portfolio/social-links`        | Add social link          | Yes           |
| PUT    | `/api/portfolio/social-links/:id`    | Update social link       | Yes           |
| DELETE | `/api/portfolio/social-links/:id`    | Delete social link       | Yes           |
| GET    | `/api/portfolio/templates`           | List templates           | No            |
| GET    | `/api/portfolio/templates/:id`       | Get template             | No            |
| POST   | `/api/portfolio/upload`              | Upload profile image     | Yes           |

### Config Options

| Option                 | Default                  | Env Var                                  |
|------------------------|--------------------------|------------------------------------------|
| `portfoliosTable`      | `'portfolios'`           | `NEXT_PUBLIC_PORTFOLIO_TABLE`            |
| `templatesTable`       | `'portfolio_templates'`  | `NEXT_PUBLIC_PORTFOLIO_TEMPLATES_TABLE`  |
| `projectsTable`        | `'portfolio_projects'`   | `NEXT_PUBLIC_PORTFOLIO_PROJECTS_TABLE`   |
| `experienceTable`      | `'portfolio_experience'` | `NEXT_PUBLIC_PORTFOLIO_EXPERIENCE_TABLE` |
| `socialLinksTable`     | `'portfolio_social_links'`| `NEXT_PUBLIC_PORTFOLIO_SOCIAL_LINKS_TABLE`|
| `usersTable`           | `'users'`                | `NEXT_PUBLIC_USERS_TABLE`                |
| `uploadFolder`         | `'GDG_Portfolio'`        | `NEXT_PUBLIC_PORTFOLIO_UPLOAD_FOLDER`    |

### Template Registry

| ID              | Display Name    | Design Aesthetic                                    |
|-----------------|-----------------|-----------------------------------------------------|
| `brutalist-dark`| Brutalist Dark  | Dark mode, bold typography, red accents, brutalist   |
| `warm-elegance` | Warm Elegance   | Playfair serif, warm earthy tones, smooth animations |
| `clean-grid`    | Clean Grid      | 12-column grid, Oswald headings, high-contrast       |
| `editorial-mono`| Editorial Mono  | Magazine spread, Space Grotesk, monochrome           |
| `noir-grain`    | Noir Grain      | Ultra-dark, Archivo Black, grain texture, cinematic  |

## Extending

To add a new template:

1. Add entry to `TEMPLATE_REGISTRY` in `portfolio.config.ts`
2. Add transformer function in `portfolio.transformers.ts`
3. Create route group under `app/(portfolio)/your-template-folder/`
4. Add template record to `portfolio_templates` DB table
5. Export new transformer from `index.ts`
