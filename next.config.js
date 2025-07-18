// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost' , '601b7302bc70.ngrok-free.app'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
