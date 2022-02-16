const withMDX = require("@next/mdx")({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
		providerInputSource: "@mdx-js/react",
	},
});

module.exports = withMDX({
	images: {
		domains: [
			"www.shelterluv.com",
			"sl-prod-v2-cdn.shelterluv.com",
			"dl5zpyw5k3jeb.cloudfront.net",
		],
	},
	reactStrictMode: true,
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
});
