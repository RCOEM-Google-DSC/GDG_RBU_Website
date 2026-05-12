# GDG RBU Website

Official website for Google Developer Groups on Campus - RBU

## Tech Stack

## Features

- Event management and registration
- Member profiles and portfolios
- Blog system filters
- Badge generation for events
- Authentication and role-based access
- Responsive design with neo-brutalism theme

## Routes

| **Route**                    | **Admin** | **Member**  | **User** |
| ---------------------------- | --------- | ----------- | -------- |
| `/`                          | ✅         | ✅           | ✅        |
| `/register`                  | ✅         | ✅           | ✅        |
| `/profile`                   | ✅         | ✅           | ✅        |
| `/team`                      | ✅         | ✅           | ✅        |
| `/team/profile/[userId]`     | ✅         | ✅           | ✅        |
| `/gallery`                   | ✅         | ✅           | ✅        |
| `/portfolio-builder`         | ✅         | ✅           | ✅        |
| `/blogs`                     | ✅         | ✅           | ✅        |
| `/blogs/[id]`                | ✅         | ✅           | ✅        |
| `/events`                    | ✅         | ✅           | ✅        |
| `/events/[eventid]`          | ✅         | ✅           | ✅        |
| `/events/[eventid]/register` | ✅         | ✅           | ✅        |
| `/events/[eventid]/badge`    | ✅         | ✅           | ✅        |
| `/events/upcoming/[eventid]` | ✅         | ✅           | ✅        |
| `/docs/[[...slug]]`          | ✅         | ✅           | ✅        |
| `/links`                     | ✅         | ✅           | ✅        |
| `/github-session`            | ✅         | ✅           | ✅        |
| `/QR`                        | ✅         | ✅           | ✅        |
| `/checkin`                   | ✅         | ✅           | ✅        |
| `/admin`                     | ✅         | ✅           | ❌        |
| `/admin/events`              | ✅         | ✅           | ❌        |
| `/admin/events/add`          | ✅         | ✅           | ❌        |
| `/admin/team-members`        | ✅         | ✅           | ❌        |
| `/admin/users`               | ✅         | ✅ (partial) | ❌        |
| `/admin/blogs`               | ✅         | ✅           | ❌        |
