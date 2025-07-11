// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost' , 'a0cc98eac48f.ngrok-free.app'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
