export default {
	name: "page",
	title: "Page",
	type: "document",
	fields: [
		{
			name: "category",
			title: "Page Category",
			type: "reference",
			to: { type: "category" },
		},
		{
			name: "title",
			title: "Title",
			type: "string",
			description:
				"This is what will appear in the browser tab and at the top of the page.",
		},
		{
			name: "pageUrl",
			title: "Page URL",
			type: "slug",
			description:
				'This is what will be appended to the URL. If you want to create the main page for the category only with no "Page URL", enter "index". https://www.palsofpawssociety.org/[Category URL]/[Page URL]',
			options: {
				source: "title",
				maxLength: 96,
			},
		},
		{
			name: "description",
			title: "Description",
			type: "text",
			description:
				"This is the description that will appear in the meta tags for the page (good for search engines).",
		},
		{
			name: "body",
			title: "Body",
			type: "blockContent",
		},
	],
};
