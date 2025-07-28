// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains:  ['localhost' , '07a74360e57c.ngrok-free.app'],
    // domains: ["*"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
