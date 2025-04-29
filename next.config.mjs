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
    unoptimized: true,
  },
  swcMinify: true,
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
      maxInitialRequests: 25,
      minSize: 20000,
      maxSize: 25000, // Reduce chunk size to 25 KB
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
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          },
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true,
        },
      },
    };

    return config;
  },
};

export default nextConfig;
