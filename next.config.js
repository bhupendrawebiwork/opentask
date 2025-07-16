// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost' , '192.168.0.116:3000'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
