# Task: Implement NeoBrutalism Component Across Codebase

## Overview

A reusable Neo Brutalism component has been created at `components/ui/neo-brutalism.tsx`. Your task is to refactor all components that use neo brutalism styling to use this new component instead of inline styles.

## Component API

### 1. NeoBrutalism Wrapper (for divs/containers)

```tsx
import { NeoBrutalism } from "@/components/ui/neo-brutalism";

<NeoBrutalism border={4} shadow="xl" rounded="3xl" className="bg-white p-8">
  Content here
</NeoBrutalism>;
```

### 2. nb() Helper Function (for semantic elements like Link, Button, AccordionTrigger)

```tsx
import { nb } from "@/components/ui/neo-brutalism";

<Link href="/events" className={nb({ border: 4, shadow: "lg", rounded: "xl", className: "bg-black text-white px-6 py-3" })}>
  View Events
</Link>

<button className={nb({ border: 2, shadow: "md", active: "push" })}>
  Click Me
</button>
```

## Props Reference

| Prop      | Values                                                                 |
| --------- | ---------------------------------------------------------------------- |
| `border`  | `2`, `3`, `4`                                                          |
| `shadow`  | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`              |
| `rounded` | `none`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full`                         |
| `hover`   | `none`, `lift`, `liftSmall`, `liftLarge`, `shadowGrow`, `shadowGrowLg` |
| `active`  | `none`, `push`, `pushLarge`, `pushWithShadow`                          |

## Shadow Size Mapping

- `xs` = 2px, `sm` = 3px, `md` = 4px, `lg` = 6px, `xl` = 8px, `2xl` = 10px, `3xl` = 12px, `4xl` = 16px

## Files to Update

Replace these inline neo brutalism patterns:

- `border-4 border-black shadow-[Xpx_Xpx_0px_0px_rgba(0,0,0,1)]`
- `boxShadow: "Xpx Xpx 0px #000000"`
- `style={{ border: "4px solid #000000", boxShadow: "6px 6px 0px #000000" }}`

### Files List:

1. `app/not-found.tsx` - Floating shapes, buttons, cards
2. `app/links/page.tsx` - Link cards with shadows
3. `app/github-session/page.tsx` - Section headers, cards
4. `app/events/[eventid]/page.tsx` - Event cards, buttons
5. `app/events/[eventid]/register/page.tsx` - Form elements, buttons
6. `app/events/[eventid]/badge/page.tsx` - Badge cards
7. `app/events/upcoming/[eventid]/page.tsx` - Event details, buttons
8. `app/events/page.tsx` - Event cards
9. `app/team/page.tsx` - Team member cards (inline boxShadow)
10. `app/team/profile/[userId]/ProfileClientView.tsx` - Profile cards, buttons
11. `app/profile/page.tsx` - Profile error card
12. `app/Components/Navigation/NavBar.tsx` - Nav links, hamburger button
13. `app/Components/Common/UpcomingEvent.tsx` - Event card, buttons
14. `app/Components/Common/MobileProfileDropdown.tsx` - Dropdown items
15. `app/Components/Common/ProfileDropdown.tsx` - Dropdown items (if applicable)
16. `app/Components/team/SocialButton.tsx` - Social buttons
17. `app/Components/team/EditProfileModal.tsx` - Modal, form fields (inline boxShadow)
18. `app/Components/team/ImageCropModal.tsx` - Modal (inline boxShadow)
19. `app/Components/team/ClubLeadCard.tsx` - Card (inline boxShadow)
20. `app/Components/Profile/ProfileHeader.tsx` - Social buttons, status badges
21. `app/Components/Profile/EventCard.tsx` - Event badges
22. `app/Components/Profile/CompleteProfileDialog.tsx` - Dialog, form fields (inline boxShadow)
23. `app/Components/Landing/MeetOurTeam.tsx` - Team section (inline boxShadow)
24. `app/Components/Landing/Footer.tsx` - Footer elements (inline boxShadow)
25. `app/Components/session-docs/SectionHeader.tsx` - Section headers
26. `app/Components/session-docs/Lightbox.tsx` - Lightbox, close button
27. `app/Components/session-docs/CommandBlock.tsx` - Command block
28. `app/Components/session-docs/ScreenshotPlaceholder.tsx` - Navigation buttons
29. `app/Components/events/ImageViewerModal.tsx` - Close button

## Rules

1. **Do NOT replace semantic elements** - Use `nb()` helper for Link, Button, AccordionTrigger, etc.
2. **Use NeoBrutalism wrapper** - Only for div containers that just need styling
3. **Match shadow sizes correctly** - Look at the pixel value and use corresponding size (6px = lg, 8px = xl)
4. **Preserve all existing functionality** - Only replace the styling, not the logic
5. **Handle inline styles** - Convert `style={{ boxShadow: "..." }}` to component props
6. **Run build after changes** - Verify with `npm run build`

## Example Transformations

### Before (Tailwind inline):

```tsx
<div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl p-8">
```

### After (NeoBrutalism wrapper):

```tsx
<NeoBrutalism border={4} shadow="xl" rounded="3xl" className="bg-white p-8">
```

### Before (Inline style):

```tsx
<div style={{ boxShadow: "6px 6px 0px #000000", border: "4px solid black" }} className="bg-white p-4">
```

### After:

```tsx
<NeoBrutalism border={4} shadow="lg" className="bg-white p-4">
```

### Before (Link with inline):

```tsx
<Link className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-3">
```

### After (nb helper):

```tsx
<Link className={nb({ border: 4, shadow: "md", className: "px-6 py-3" })}>
```

## Already Completed

- ✅ `app/page.tsx` - No Events card
- ✅ `app/Components/Common/AccordionComponent.tsx` - FAQ items
- ✅ `app/Components/session-docs/StepCard.tsx` - Step cards
