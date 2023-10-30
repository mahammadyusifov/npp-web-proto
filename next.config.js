/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ["page.tsx"],
  compiler: { emotion: true },
  async rewrites() {
    return [
      {
        destination: 'http://127.0.0.1:8000/:path*',
        source: '/:path*',
      },
      {
        destination: 'http://127.0.0.1:8000/:path*',
        source: '/:path*',
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
