const STUDIO_REWRITE = {
	source: "/studio/:path*",
	destination:
		process.env.NODE_ENV === "development"
			? "http://localhost:3000/studio/:path*"
			: "/studio/index.html",
};

const ADMIN_REDIRECT = {
	source: "/admin/:path*",
	destination: "/studio/:path*",
	permanent: true,
};

module.exports = {
	images: {
		domains: [
			"www.shelterluv.com",
			"sl-prod-v2-cdn.shelterluv.com",
			"dl5zpyw5k3jeb.cloudfront.net",
		],
	},
	reactStrictMode: true,
	rewrites: () => [STUDIO_REWRITE],
	redirects: () => [ADMIN_REDIRECT],
};
