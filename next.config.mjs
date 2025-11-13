/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    devIndicators: false,
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
};

export default nextConfig;
