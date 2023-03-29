/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd'],
  images: {
    domains: ['s3-sa-east-1.amazonaws.com', 'lh3.googleusercontent.com', 'cdn.sanity.io']
  },
}

module.exports = nextConfig
