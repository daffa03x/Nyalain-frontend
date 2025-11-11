import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Tambahkan domain lain di sini jika perlu
      {
        protocol: 'https',
        hostname: 'images.pexels.com', // Contoh
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com', // Contoh
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
