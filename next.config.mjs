/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // Optional: add a specific pathname if you want to restrict to a certain cloud name
        // pathname: '/YOUR_CLOUD_NAME/**',
      },
    ],
  },
};

export default nextConfig;
