/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['s3-sa-east-1.amazonaws.com', 'lh3.googleusercontent.com']
  },
}

module.exports = nextConfig
