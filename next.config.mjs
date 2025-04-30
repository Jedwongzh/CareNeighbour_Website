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
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true,
  },
  compress: true,
  productionBrowserSourceMaps: false,
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  output: "standalone",
  webpack: (config, { isServer }) => {
    // Enable aggressive code splitting and smaller chunks
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 15,
      minSize: 8000,
      maxSize: 12000, // Reduce chunk size to 12 KB
      cacheGroups: {
        default: false,
        vendors: false,
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          reuseExistingChunk: true,
        },
        lib: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const match = module?.context?.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
            if (!match) {
              return "misc-package";
            }
            const packageName = match[1];
            return `npm.${packageName.replace("@", "")}`;
          },
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true,
        },
      },
    };

    // Remove source maps in production
    if (!isServer) {
      config.devtool = false;
    }

    // Add module optimization
    config.optimization.moduleIds = 'deterministic';
    config.optimization.runtimeChunk = 'single';

    return config;
  },
};

export default nextConfig;
