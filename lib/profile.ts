export function isProfileComplete(user: {
  name?: string | null;
  email?: string | null;
  section?: string | null;
  branch?: string | null;
  phone_number?: string | null;
}) {
  return Boolean(
    user?.name &&
      user?.email &&
      user?.section &&
      user?.branch &&
      user?.phone_number
  );
}
