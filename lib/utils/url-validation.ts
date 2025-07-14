/**
 * Validates a redirect URL to prevent open redirect vulnerabilities
 * Only allows relative URLs or URLs from the same origin
 */
export function validateRedirectUrl(url: string, origin: string): string {
  try {
    // If it's a relative URL starting with /, it's safe
    if (url.startsWith('/')) {
      return url;
    }

    // Parse the URL to check if it's from the same origin
    const parsedUrl = new URL(url);
    const parsedOrigin = new URL(origin);

    // Only allow same origin redirects
    if (parsedUrl.origin === parsedOrigin.origin) {
      return url;
    }

    // If validation fails, return safe default
    return '/';
  } catch (error) {
    // If URL parsing fails, return safe default
    return '/';
  }
}