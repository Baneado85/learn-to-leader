/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Handles basePath if published under a repository subpath on GitHub Pages
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

export default nextConfig;
