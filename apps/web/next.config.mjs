/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // typedRoutes intentionally left off until the full route map exists —
  // otherwise Links to not-yet-built screens (portfolio, settings, …) fail typecheck.
}

export default nextConfig
