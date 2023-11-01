/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ["page.tsx"],
  compiler: { emotion: true },
  async rewrites() {
    return [
      {
        destination: "http://127.0.0.1:8000/content/common",
        source: "/content/common",
      },
      {
        destination: "http://0.0.0.0:8000/auth/login",
        source: "/auth/login",
      },
      {
        destination: "http://0.0.0.0:8000/auth/register",
        source: "/auth/register",
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
