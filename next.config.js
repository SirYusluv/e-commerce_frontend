/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["127.0.0.1", "192.168.165.243", "192.168.239.243"],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
