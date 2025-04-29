import CompressionPlugin from "compression-webpack-plugin";
import withBundleAnalyzer from "@next/bundle-analyzer";

let userConfig = undefined;
try {
  // try to import ESM first
  userConfig = await import('./v0-user-next.config.mjs');
} catch (e) {
  try {
    // fallback to CJS import
    userConfig = await import("./v0-user-next.config");
  } catch (innerError) {
    // ignore error
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})({
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    outputFileTracingRoot: "./", // Trace only necessary files
    outputFileTracingIgnores: [
      "**/*.png",
      "**/*.jpg",
      "**/*.mp4",
      "**/*.test.js",
      "**/*.spec.js",
    ],
  },
  output: "standalone", // Enable standalone mode for smaller server bundles
  webpack: (config) => {
    // Enable code splitting and set smaller max chunk size
    config.optimization.splitChunks = {
      chunks: "all",
      maxSize: 200000, // Reduce chunk size to 200 KB
    };

    // Add compression plugin
    config.plugins.push(
      new CompressionPlugin({
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: /\.(js|css|html|svg)$/,
        threshold: 10240, // Only compress files larger than 10 KB
        minRatio: 0.8, // Compress files with a compression ratio below 0.8
      })
    );

    return config;
  },
});

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig;

  for (const key in config) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      };
    } else {
      nextConfig[key] = config[key];
    }
  }
}

export default nextConfig;
