/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['res.cloudinary.com', 'upload.wikimedia.org'],
	},
	poweredByHeader: false,
	env: {
		APP_URL: process.env.REACT_APP_URL,
		APP_ENV: process.env.REACT_APP_ENV,
		APP_API_URL: process.env.REACT_APP_API_URL,
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `https://netflix-online-cinema-backend.herokuapp.com/api/api/:path*`,
			},
		]
	},
}

module.exports = nextConfig
