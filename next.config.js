/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	env: {
		APP_URL: process.env.REACT_APP_URL,
		APP_ENV: process.env.REACT_APP_ENV,
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `https://netflix-online-cinema-backend.herokuapp.com/api/:path*`,
			},
			{
				source: '/uploads/:path*',
				destination: `https://netflix-online-cinema-backend.herokuapp.com/uploads/:path*`,
			},
		]
	},
}

module.exports = nextConfig
