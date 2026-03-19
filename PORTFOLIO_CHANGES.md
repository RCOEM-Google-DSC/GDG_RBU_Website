# Portfolio System - Security & Rendering Improvements

## Summary of Changes

This document outlines all changes made to the portfolio builder system to address template rendering issues and implement proper security measures.

---

## 1. **Fixed Social Links & Icons Rendering**

### Issues Resolved:
- Social links with missing URLs were rendering as broken links
- Icons were incorrect or hardcoded (e.g., all using generic arrows)
- Different templates had different icon handling approaches

### Files Updated:
- **Architectural**: `components/Footer.tsx` - Added icon mapping for GitHub, LinkedIn, Twitter/X, Mail, Website, etc.
- **Magazine**: `components/Footer.tsx` - Added URL validation, filtered socials before rendering
- **Minimalist-Grid**: `components/Footer.tsx` - Added URL validation + icon mapping
- **Hyun-Barng**: `components/Footer.tsx` - Added URL validation
- **Soft**: `components/Footer.tsx` - Added URL validation + X (Twitter) support

### Key Implementation:
```typescript
// Before rendering, validate URL exists
{social.url && (
  <a href={social.url} target="_blank">
    <IconComponent />
  </a>
)}
```

---

## 2. **Fixed Portfolio Crash Issues**

### Issue:
Templates crashed when user data was missing due to using `.single()` instead of `.maybeSingle()`.

### Files Updated:
All 5 templates' `lib/getPortfolioData.ts`:
- `architectural`
- `magazine`
- `minimalist-grid`
- `hyun-barng`
- `soft`

### Fix:
Changed from `.single()` to `.maybeSingle()` for user queries:
```typescript
// Before
.eq("id", userId).single()  // Crashes if no match

// After
.eq("id", userId).maybeSingle()  // Returns null safely
```

---

## 3. **Standardized Skills Handling**

### Issue:
Skills (Languages, Frameworks, Tools) were bundled into a generic array of categories, causing:
- Layout shifts when sections were empty
- Icon inconsistencies across templates
- Difficulty controlling visibility per section

### Refactoring:
Changed data structure from:
```typescript
// Old
skills: Array<{ category: string, skills: string[] }>

// New
skills: {
  languages: string[];
  frameworks: string[];
  tools: string[];
}
```

### Files Updated:
**Data Layer:**
- All 5 templates' `lib/getPortfolioData.ts`
- `lib/portfolio-transformers.ts` (for preview compatibility)

**Component Layer:**
- All 5 templates' `components/Skills.tsx`

**Page Layer:**
- All 5 templates' `[userId]/page.tsx` (updated hasSkills logic)

### Outcome:
- Skills now render as explicit sections
- Empty sections are hidden, but rendering order is consistent
- Components have full control over layout

---

## 4. **Implemented Row Level Security (RLS)**

### Issue:
Database lacked Row Level Security policies. Security was handled only at API layer, leaving risk of bypass.

### Solution:
Created comprehensive RLS policies in `db/migrations/001_enable_rls.sql`:

**Policies Implemented:**

1. **Portfolios Table:**
   - SELECT: Published OR owner (can see own unpublished)
   - INSERT/UPDATE/DELETE: Owner only

2. **Portfolio Projects/Experience/Social Links:**
   - SELECT: If parent portfolio is published OR user is owner
   - INSERT/UPDATE/DELETE: Portfolio owner only

3. **Portfolio Templates:**
   - SELECT: Read-only for all authenticated users

### Security Model:
```sql
-- Public Read (anyone can see published)
CREATE POLICY "portfolios_select_policy" 
  FOR SELECT
  USING (is_published = true OR auth.uid() = user_id);

-- Owner Write Only
CREATE POLICY "portfolios_update_policy"
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

### Deployment:
Run the following in Supabase SQL Editor:
```bash
# Copy the entire content of db/migrations/001_enable_rls.sql
# Paste into Supabase Dashboard → SQL Editor → Run
```

---

## 5. **Data Persistence & Publishing**

### Verified (Already Working):
✅ **Single Portfolio per User:** UNIQUE constraint on `user_id`
✅ **Public Read Access:** No auth required for published portfolios
✅ **Owner-Only Edit:** All API routes verify user ownership
✅ **Auto-unpublish Previous:** API unpublishes old portfolio when publishing new
✅ **Confirmation Dialog:** Frontend warns before replacing portfolio

---

## Testing Checklist

### Social Links
- [ ] Add social link with valid URL → Renders with correct icon
- [ ] Add social link without URL → Hidden (not rendered)
- [ ] Add multiple social links → All render in correct order

### Skills Rendering
- [ ] Add only Languages → Shows only Languages section
- [ ] Add Languages + Frameworks → Shows both sections
- [ ] Leave all empty → No skills section shown
- [ ] Edit and remove a section → Properly updates UI

### Portfolio Publishing
- [ ] Create portfolio with all fields → Publishes successfully
- [ ] Access published portfolio (public) → Visible
- [ ] Access unpublished portfolio (not owner) → Hidden (404 or access denied)
- [ ] Try to edit someone else's portfolio → Blocked by RLS

### Security (Post-RLS)
- [ ] Direct API call to fetch own portfolio → Works
- [ ] Direct API call to fetch published portfolio → Works
- [ ] Direct API call to fetch someone's unpublished → Blocked
- [ ] Direct API call to update someone else's → Blocked

---

## Files Created/Modified

### New Files:
- `db/migrations/001_enable_rls.sql` - RLS policies

### Modified Files (Data Layer):
- `app/(portfolio)/architectural/lib/getPortfolioData.ts`
- `app/(portfolio)/magazine/lib/getPortfolioData.ts`
- `app/(portfolio)/minimalist-grid/lib/getPortfolioData.ts`
- `app/(portfolio)/hyun-barng/lib/getPortfolioData.ts`
- `app/(portfolio)/soft/lib/getPortfolioData.ts`
- `lib/portfolio-transformers.ts`

### Modified Files (Components):
- `app/(portfolio)/architectural/components/Footer.tsx`
- `app/(portfolio)/architectural/components/Hero.tsx`
- `app/(portfolio)/architectural/components/Skills.tsx`
- `app/(portfolio)/magazine/components/Footer.tsx`
- `app/(portfolio)/magazine/components/Skills.tsx`
- `app/(portfolio)/minimalist-grid/components/Footer.tsx`
- `app/(portfolio)/minimalist-grid/components/Skills.tsx`
- `app/(portfolio)/hyun-barng/components/Footer.tsx`
- `app/(portfolio)/hyun-barng/components/Skills.tsx`
- `app/(portfolio)/soft/components/Footer.tsx`
- `app/(portfolio)/soft/components/Skills.tsx`

### Modified Files (Pages):
- `app/(portfolio)/architectural/[userId]/page.tsx`
- `app/(portfolio)/magazine/[userId]/page.tsx`
- `app/(portfolio)/minimalist-grid/[userId]/page.tsx`
- `app/(portfolio)/hyun-barng/[userId]/page.tsx`
- `app/(portfolio)/soft/[userId]/page.tsx`

---

## Git Workflow

The changes are on the `portfolio-improvements` branch. To merge:

```bash
# Switch to main
git checkout main

# Pull latest from remote
git pull origin main

# Merge portfolio improvements
git merge portfolio-improvements

# Push to remote
git push origin main
```

Or create a Pull Request on GitHub for review before merging.
