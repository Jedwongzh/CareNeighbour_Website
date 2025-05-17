/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['blob.v0.dev'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  webpack: (config) => {
    // Optimize bundle size
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 25,
      minSize: 20000,
      maxSize: 1000000,
      cacheGroups: {
        framework: {
          name: 'framework',
          test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
          priority: 40,
          chunks: 'all',
        },
        commons: {
          name: 'commons',
          test: /[\\/]node_modules[\\/]/,
          priority: 30,
          chunks: 'all',
        },
        // Specific chunks for large libraries
        framerMotion: {
          test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
          name: 'framer-motion',
          priority: 50,
          chunks: 'all',
        },
        lucideReact: {
          test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
          name: 'lucide-react',
          priority: 50,
          chunks: 'all',
        },
      },
    };

    return config;
  },
};

export default nextConfig;
