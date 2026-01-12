# Supabase Rate Limit Management

## Problem

Supabase enforces rate limits on email-based authentication to prevent abuse:

- **Free tier**: ~3-4 signups per hour per IP
- **Error**: `AuthApiError: email rate limit exceeded` (HTTP 429)

## Solutions Implemented

### 1. Client-Side Rate Limiting ✅

The registration page now tracks signup attempts in `localStorage`:

- Max 3 attempts per hour
- Visual warning banner when rate limited
- Disabled signup button during cooldown
- Clear error messages

### 2. OAuth Alternatives ✅

Users can bypass email limits by using:

- **Google OAuth** (recommended)
- **GitHub OAuth**

## For Development

### Quick Fixes:

1. **Wait 60 minutes** for rate limit reset
2. **Use OAuth** instead of email signup
3. **Clear localStorage** to reset client-side tracking:
   ```javascript
   localStorage.removeItem("signup_attempts");
   ```

### Disable Email Confirmation (Dev Only):

1. Go to Supabase Dashboard → Authentication → Providers
2. Under Email, disable "Confirm email"
3. ⚠️ **Re-enable for production!**

### Use Different Email Addresses:

- Use `+` aliases: `yourname+test1@gmail.com`, `yourname+test2@gmail.com`
- Each counts as a unique email but delivers to same inbox

## For Production

### 1. Upgrade Supabase Plan

- **Pro Plan**: Higher rate limits
- **Team/Enterprise**: Custom limits

### 2. Configure Email Provider

Use a custom SMTP provider for better deliverability:

- SendGrid
- AWS SES
- Postmark

### 3. Implement Backend Rate Limiting

Add server-side checks in Edge Functions or API routes:

```typescript
// Example: Track by IP address
const rateLimitKey = `signup:${ip}`;
const attempts = await redis.incr(rateLimitKey);
if (attempts === 1) {
  await redis.expire(rateLimitKey, 3600); // 1 hour
}
if (attempts > 3) {
  throw new Error("Rate limit exceeded");
}
```

### 4. Monitor Usage

- Set up alerts in Supabase Dashboard
- Track signup metrics
- Identify abuse patterns

## Error Handling

The app now handles rate limits gracefully:

```typescript
// Checks client-side limit before API call
if (checkRateLimit()) {
  toast.error(`Wait ${cooldown} minutes or use OAuth`);
  return;
}

// Handles server-side 429 errors
if (error.status === 429) {
  toast.error("Rate limit exceeded. Try OAuth or wait 60 min");
}
```

## Testing

To test rate limiting:

1. Attempt 3 signups within an hour
2. 4th attempt should show warning banner
3. Signup button should be disabled
4. OAuth buttons remain enabled

## Reset Rate Limit (Dev)

```javascript
// In browser console:
localStorage.removeItem("signup_attempts");
location.reload();
```

## Resources

- [Supabase Auth Rate Limits](https://supabase.com/docs/guides/platform/going-into-prod#auth-rate-limits)
- [Custom SMTP Setup](https://supabase.com/docs/guides/auth/auth-smtp)
