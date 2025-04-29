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
    domains: ['v0.blob.com', 'hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Optimize image loading
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128],
    unoptimized: false, // Enable image optimization
  },
  // Enable webpack bundle analyzer in development mode
  webpack: (config, { isServer, dev }) => {
    // Optimize bundle size with more aggressive splitting
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 30,
      minSize: 10000,
      maxSize: 10 * 1024 * 1024, // 10MB max chunk size (reduced from 20MB)
      cacheGroups: {
        framework: {
          name: 'framework',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          priority: 40,
          enforce: true,
        },
        framerMotion: {
          name: 'framer-motion',
          test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
          priority: 39,
          enforce: true,
        },
        lucide: {
          name: 'lucide',
          test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
          priority: 38,
          enforce: true,
        },
        radix: {
          name: 'radix',
          test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
          priority: 37,
          enforce: true,
        },
        lib: {
          test: /[\\/]node_modules[\\/]/,
          priority: 30,
          minChunks: 2,
          reuseExistingChunk: true,
        },
        commons: {
          name: 'commons',
          minChunks: 2,
          priority: 20,
        },
      },
    };

    // Exclude large libraries from the server bundle
    if (isServer) {
      config.externals = [...(config.externals || []), 'framer-motion', 'recharts'];
    }

    return config;
  },
  // Optimize package imports
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts', '@radix-ui/react-icons'],
  },
  // Disable unnecessary features
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
};

export default nextConfig;
