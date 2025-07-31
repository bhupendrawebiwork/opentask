// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains:  ['localhost' , '42ba6fbd7462.ngrok-free.app'],
    // domains: ["*"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
