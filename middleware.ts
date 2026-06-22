import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
  // Match all pathnames except for:
  // - API routes
  // - Next.js internals (/_next, /_vercel)
  // - SEO/static files served from the app or public dir (anything with a dot)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
