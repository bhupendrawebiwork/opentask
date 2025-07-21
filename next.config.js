// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains:  ['localhost' , 'c5e9f37f220e.ngrok-free.app'],
    // domains: ["*"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
