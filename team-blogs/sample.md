# Getting Started with Next.js and Supabase

Building modern web applications has never been easier with the powerful combination of Next.js and Supabase. In this guide, we'll explore how to create a full-stack application using these amazing technologies.

## What is Next.js?

Next.js is a React framework that enables you to build server-side rendered and statically generated web applications. It provides:

- **Server-Side Rendering (SSR)**: Improve SEO and initial page load performance
- **Static Site Generation (SSG)**: Pre-render pages at build time
- **API Routes**: Build your backend API within the same project
- **File-based Routing**: Automatic routing based on file structure

## What is Supabase?

Supabase is an open-source Firebase alternative that provides:

- **PostgreSQL Database**: Powerful relational database
- **Authentication**: Built-in user management
- **Real-time Subscriptions**: Listen to database changes
- **Storage**: File storage with CDN
- **Row Level Security**: Secure your data at the database level

## Setting Up Your Project

### 1. Create a Next.js Project

```bash
npx create-next-app@latest my-app
cd my-app
```

### 2. Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### 3. Configure Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Initialize Supabase Client

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## Building Your First Feature

Let's create a simple blog listing page:

```typescript
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    async function fetchBlogs() {
      const { data } = await supabase
        .from('blogs')
        .select('*')
        .order('published_at', { ascending: false })

      setBlogs(data || [])
    }

    fetchBlogs()
  }, [])

  return (
    <div>
      <h1>Blog Posts</h1>
      {blogs.map((blog) => (
        <article key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.excerpt}</p>
        </article>
      ))}
    </div>
  )
}
```

## Best Practices

### 1. Use Row Level Security (RLS)

Always enable RLS on your Supabase tables:

```sql
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view blogs"
  ON blogs FOR SELECT
  USING (true);
```

### 2. Handle Loading and Error States

```typescript
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

try {
  setLoading(true);
  const { data, error } = await supabase.from("blogs").select();
  if (error) throw error;
  setBlogs(data);
} catch (err) {
  setError(err.message);
} finally {
  setLoading(false);
}
```

### 3. Optimize Images

Use Next.js Image component for automatic optimization:

```typescript
import Image from 'next/image'

<Image
  src={blog.image_url}
  alt={blog.title}
  width={800}
  height={400}
  priority
/>
```

## Advanced Features

### Real-time Subscriptions

Listen to database changes in real-time:

```typescript
useEffect(() => {
  const subscription = supabase
    .channel("blogs")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "blogs" },
      (payload) => {
        console.log("Change received!", payload);
      },
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

### Authentication

Implement user authentication:

```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: "user@example.com",
  password: "password123",
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "password123",
});

// Sign out
await supabase.auth.signOut();
```

## Conclusion

Next.js and Supabase together provide a powerful stack for building modern web applications. With server-side rendering, static generation, and a robust backend, you can create fast, scalable, and secure applications.

### Key Takeaways

- Next.js provides excellent developer experience and performance
- Supabase offers a complete backend solution
- Row Level Security keeps your data safe
- Real-time features enable interactive applications
- The combination is perfect for rapid development

Happy coding! 🚀

---

_Written by the GDG RBU Team_
