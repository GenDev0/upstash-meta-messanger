/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "links.papareact.com",
      "static.wikia.nocookie.net",
      "platform-lookaside.fbsbx.com",
    ],
  },
};

module.exports = nextConfig;
