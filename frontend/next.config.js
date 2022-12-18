/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['jsx'],
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
}

module.exports = nextConfig
