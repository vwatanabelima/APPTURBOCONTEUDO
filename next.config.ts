import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  devIndicators: {
    // This is kept for older Next.js versions, but the top-level one is preferred.
    allowedDevOrigins: [
      'https://6000-firebase-studio-1758321501493.cluster-fsmcisrvfbb5cr5mvra3hr3qyg.cloudworkstations.dev',
    ],
  },
  // This is the correct location for Next.js 14+
  allowedDevOrigins: [
    'https://6000-firebase-studio-1758321501493.cluster-fsmcisrvfbb5cr5mvra3hr3qyg.cloudworkstations.dev',
  ],
};

export default nextConfig;
