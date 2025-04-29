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
  // Remove swcMinify if Next.js 15.2.4 does not recognize it
  // swcMinify: true, 
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
      chunks: "all",
      maxInitialRequests: 25,
      minSize: 20000,
      maxSize: 25000, // chunk size limit
      cacheGroups: {
        default: false,
        vendors: false,
        commons: {
          name: "commons",
          chunks: "all",
          minChunks: 2,
          reuseExistingChunk: true,
        },
        lib: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const match = module?.context?.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
            if (!match) {
              return "misc-package"; // Fallback if no match
            }
            const packageName = match[1];
            return `npm.${packageName.replace("@", "")}`;
          },
          chunks: "all",
          priority: 10,
          reuseExistingChunk: true,
        },
      },
    };
    return config;
  },
};

export default nextConfig;
