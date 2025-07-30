// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains:  ['localhost' , '9b24d0e87d0a.ngrok-free.app'],
    // domains: ["*"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
