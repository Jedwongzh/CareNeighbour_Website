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
  webpack: (config, { isServer }) => {
    // Enable aggressive code splitting and smaller chunks
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 20,
      minSize: 10000,
      maxSize: 15000, // Reduce chunk size to 15 KB
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

    if (isServer) {
      // Exclude specific modules from server bundle
      config.externals = config.externals || [];
      config.externals.push("big-dependency-name");
    }

    return config;
  },
};

export default nextConfig;
