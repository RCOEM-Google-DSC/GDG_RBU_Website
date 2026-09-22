# Blog Module

Self-contained, pluggable blog feature for GDG chapter websites.  
Drop it in → set env vars → blog works.

## Quick Start

### 1. Required Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

Image uploads (optional, handled by existing `/api/upload`):
```env
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### 2. Database Tables

Run the following SQL in your Supabase project. The `users` table is assumed to already exist.

```sql
CREATE TABLE public.blogs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  writer_id uuid NOT NULL,
  image_url text DEFAULT 'blog.png',
  title text NOT NULL,
  markdown text NOT NULL,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (id),
  FOREIGN KEY (writer_id) REFERENCES public.users(id)
);

CREATE TABLE public.comments_blogs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  blog_id uuid NOT NULL,
  user_id uuid NOT NULL,
  comment text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (id),
  FOREIGN KEY (blog_id) REFERENCES public.blogs(id),
  FOREIGN KEY (user_id) REFERENCES public.users(id)
);

CREATE TABLE public.blog_likes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  blog_id uuid NOT NULL,
  user_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (id),
  FOREIGN KEY (blog_id) REFERENCES public.blogs(id),
  FOREIGN KEY (user_id) REFERENCES public.users(id)
);
```

### 3. Usage

**Server-side (API routes, Server Components):**

```ts
import { BlogService } from '@/modules/blog';

const service = new BlogService();
const blogs = await service.getAll();
const blog  = await service.getById('uuid');
```

**Client-side (React components):**

```ts
import { createBlogApiClient } from '@/modules/blog';

const blog = createBlogApiClient();
const { blogs } = await blog.list();
const { blog: post } = await blog.get('uuid');
await blog.addComment('uuid', 'Great post!');
```

**Custom configuration:**

```ts
const service = new BlogService({
  allowedRoles: ['editor', 'admin'],
  maxCommentLength: 5000,
  imageFolder: 'MY_BLOG_IMAGES',
});
```

## Architecture

```
modules/blog/
├── index.ts            # Barrel export (public API)
├── blog.types.ts       # All type definitions
├── blog.config.ts      # Config factory with defaults
├── blog.service.ts     # Server-side data operations
├── blog.client.ts      # Client-side fetch wrapper
├── blog.validation.ts  # Zod schemas for input validation
└── README.md           # This file
```

### API Endpoints

| Method | Path                         | Description         | Auth Required |
|--------|------------------------------|---------------------|---------------|
| GET    | `/api/blogs`                 | List all blogs      | No            |
| GET    | `/api/blogs/:id`             | Get single blog     | No            |
| POST   | `/api/blogs/create`          | Create blog post    | Yes (member+) |
| PATCH  | `/api/blogs/:id`             | Update blog post    | Yes (author)  |
| GET    | `/api/blogs/mine`            | My blogs            | Yes           |
| POST   | `/api/blogs/:id/comments`    | Add comment         | Yes           |

### Config Options

| Option             | Default            | Description                        |
|--------------------|--------------------|------------------------------------|
| `tableName`        | `'blogs'`          | Supabase table for posts           |
| `commentsTable`    | `'comments_blogs'` | Supabase table for comments        |
| `likesTable`       | `'blog_likes'`     | Supabase table for likes           |
| `usersTable`       | `'users'`          | Supabase table for user lookups    |
| `imageFolder`      | `'GDG_BLOG_COVERS'`| Cloudinary upload folder           |
| `allowedRoles`     | `['admin','member']`| Roles that can create/edit blogs  |
| `maxCommentLength` | `2000`             | Max characters per comment         |
| `previewLength`    | `150`              | Markdown preview truncation length |

## Extending

To add new features (e.g., blog tags, drafts):

1. Add types to `blog.types.ts`
2. Add schema to `blog.validation.ts`
3. Add methods to `BlogService`
4. Add endpoints in `app/api/blogs/`
5. Optionally add client methods to `blog.client.ts`
