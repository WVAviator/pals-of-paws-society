export default {
	name: "category",
	title: "Category",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{
			name: "categoryUrl",
			title: "Category URL",
			type: "slug",
			description:
				"This represents the category in the URL. https://www.palsofpawssociety.org/[Base URL]/[Page URL]",
			options: {
				source: "category.title",
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
