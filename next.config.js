/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      'chrome-aws-lambda',
      'puppeteer-core',
      'playwright-core',
      'puppeteer-extra',
      'puppeteer-extra-plugin-stealth',
      'puppeteer-extra-plugin-recaptcha',
      'puppeteer-extra-plugin-user-preferences',
      'puppeteer-extra-plugin-user-data-dir',
    ],
  },
};

module.exports = nextConfig;
