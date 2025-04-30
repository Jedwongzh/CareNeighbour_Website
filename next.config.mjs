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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true,
  },
  // Enable webpack bundle analyzer in development mode
  webpack: (config, { isServer, dev }) => {
    // Optimize bundle size
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 25,
      minSize: 20000,
      maxSize: 20 * 1024 * 1024, // 20MB max chunk size
      cacheGroups: {
        framework: {
          name: 'framework',
          test: /[\\/]node_modules[\\/](react|react-dom|framer-motion)[\\/]/,
          priority: 40,
          // Don't create a framework chunk in development mode
          enforce: !dev,
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

    return config;
  },
  // Optimize package imports without CSS optimization
  experimental: {
    // Removed optimizeCss: true as it requires the critters package
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
  },
};

export default nextConfig;
