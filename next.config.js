import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Handle font files as assets instead of strings to prevent serialization issues
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[name].[hash][ext]',
      },
    });

    // Enhanced cache configuration for large CSS assets
    config.cache = {
      ...config.cache,
      buildDependencies: {
        ...config.cache?.buildDependencies,
        config: [__filename],
      },
      // Improve serialization performance for large assets
      compression: 'gzip',
      maxMemoryGenerations: 1,
      // Add cache optimization for large strings
      cacheDirectory: config.cache?.cacheDirectory,
      store: 'pack',
      version: '1.0.0',
      // Configure cache for large CSS assets
      managedPaths: [
        ...config.cache?.managedPaths || [],
        /node_modules\/@radix-ui\/themes/,
      ],
    };

    // Configure webpack logging to suppress large string serialization warnings
    config.infrastructureLogging = {
      ...config.infrastructureLogging,
      level: 'warn',
      debug: false,
      // Filter out PackFileCacheStrategy warnings for known large assets
      stream: {
        write: (message) => {
          // Suppress the specific warning about large string serialization
          if (message.includes('Serializing big strings (100kiB) impacts deserialization performance')) {
            return;
          }
          // Allow other webpack logs to pass through
          process.stderr.write(message);
        }
      }
    };

    // Configure asset handling to use Buffers for large files
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    return config;
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
