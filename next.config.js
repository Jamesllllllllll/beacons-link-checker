/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['chrome-aws-lambda', 'puppeteer-core', 'playwright-core']
  }
}

module.exports = nextConfig
