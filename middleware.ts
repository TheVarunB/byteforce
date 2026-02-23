import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define which routes require the user to be signed in
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/list-agent(.*)'
])

// Notice the "async" and "await" added here!
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect() // Kick them to the login screen if they aren't signed in
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}