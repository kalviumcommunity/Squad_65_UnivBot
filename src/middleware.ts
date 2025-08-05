// Middleware disabled - authentication handled at component level
// This allows the root page to show the non-dismissible sign-in dialog

export function middleware() {
  // No middleware logic needed
  return
}

export const config = {
  matcher: [
    // No routes protected by middleware
    // Authentication is handled in the page component
  ],
} 