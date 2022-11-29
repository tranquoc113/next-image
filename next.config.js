/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
		domains: ['storageapi.fleek.co'],
	},
}

module.exports = nextConfig
