/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  // Fix cross-origin issues
  async headers() {
    return [
      {
        source: '/_next/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
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
    minimumCacheTTL: 3600, // Increased cache time
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    unoptimized: false, // Enable optimization
  },
  // Optimized webpack configuration
  webpack: (config, { isServer, dev }) => {
    // Optimize bundle splitting
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 20,
        minSize: 15000,
        maxSize: 15 * 1024 * 1024, // 15MB max chunk size
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 30,
            chunks: 'all',
            enforce: true,
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: 20,
            chunks: 'all',
            reuseExistingChunk: true,
          },
        },
      };
    }

    // Reduce bundle size in production
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'framer-motion': 'framer-motion/dist/framer-motion',
      };
    }

    return config;
  },
  
  // Enhanced experimental features
  experimental: {
    optimizePackageImports: [
      'lucide-react', 
      'framer-motion', 
      'recharts',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu'
    ],
    scrollRestoration: true,
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig;
