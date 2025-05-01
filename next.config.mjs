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
      maxSize: 15 * 1024 * 1024, // Reduced max chunk size to 15MB
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
          minChunks: 1, // Allow splitting libraries used even once
          reuseExistingChunk: true,
        },
        commons: {
          name: 'commons',
          minChunks: 2,
          priority: 20,
        },
        // Add a vendor group to catch other node_modules
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)?.[1];
            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName?.replace('@', '')}`;
          },
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    };

    // Ensure minimize is enabled for production builds
    config.optimization.minimize = !dev;
    // Consider adding TerserPlugin options if needed, but minimize should be enough

    return config;
  },
  // Optimize package imports without CSS optimization
  experimental: {
    // Removed optimizeCss: true as it requires the critters package
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
  },
};

export default nextConfig;
