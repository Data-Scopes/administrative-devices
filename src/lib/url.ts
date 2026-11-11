// Prefix an internal path with the configured base, so links work both at a custom domain ("/")
// and at data-scopes.github.io/administrative-devices/.
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return `${base}/${clean}`;
}
