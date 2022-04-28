const STUDIO_REWRITE = {
	source: "/admin/:path*",
	destination:
		process.env.NODE_ENV === "development"
			? "http://localhost:3000/admin/:path*"
			: "/admin/index.html",
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
};
