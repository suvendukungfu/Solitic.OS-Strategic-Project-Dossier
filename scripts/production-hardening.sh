#!/bin/bash

# Solitic.OS Production Hardening & Security Synchronization Script
# This script applies all critical configuration fixes and security patches.

echo "🚀 Starting Solitic.OS Production Hardening..."

# 1. Update tsconfig.json to lockdown JSX
echo "📝 Locking down tsconfig.json compiler options..."
sed -i '' 's/"jsx": "react-jsx"/"jsx": "preserve"/g' tsconfig.json || echo "⚠️ tsconfig.json already optimized or not found."

# 2. Restore strict build gates in next.config.mjs
echo "🏗️ Restoring strict build-time validation gates..."
# We use a simple overwrite for next.config.mjs as it has been meticulously synchronized
cat <<EOF > next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
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
EOF

# 3. Synchronize Security Patches
echo "🛡️ Synchronizing security patches (CVE-2025-66478)..."
# The user has already installed Next.js 16.2.3, we ensure it's locked in package.json
sed -i '' 's/"next": "^16.2.3"/"next": "16.2.3"/g' package.json || echo "⚠️ Next.js already locked or not found."

echo "✅ Production Hardening Complete."
echo "👉 Run 'npm run build' to verify strict type/lint compliance."
