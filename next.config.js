/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      loader: 'html-loader',
    });
    return config
  },
  transpilePackages: ['antd'],
  images: {
    domains: ['s3-sa-east-1.amazonaws.com', 'lh3.googleusercontent.com', 'cdn.sanity.io', 'res.cloudinary.com']
  },
}

module.exports = nextConfig

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    silent: true,
    org: "pipis",
    project: "cuatro-carnes",
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
  }
);