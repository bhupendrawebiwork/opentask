// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains:  ['localhost' , '74e7d9700020.ngrok-free.app'],
    // domains: ["*"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
