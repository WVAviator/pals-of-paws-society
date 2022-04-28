export default {
	name: "fundraiser",
	title: "Fundraiser",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
			description:
				"This is what will appear in the browser tab and at the top of the page.",
		},
		{
			name: "pageUrl",
			title: "Fundraiser Page URL",
			type: "slug",
			description:
				"This is what will be appended to the URL. https://www.palsofpawssociety.org/fundraisers/[Page URL]",
			options: {
				source: "title",
				maxLength: 96,
			},
		},
		{
			name: "mainImage",
			title: "Main Image",
			type: "image",
			options: {
				hotspot: true,
			},
			description:
				"This is the image that will appear on the fundraisers page as part of the card.",
			fields: [
				{
					name: "alt",
					title: "Alt Text",
					type: "string",
					description:
						"Briefly describe the image (used for accessibility). If the image is purely decorative, leave the alt text empty.",
				},
			],
		},
		{
			name: "description",
			title: "Description",
			type: "text",
			description:
				"This is the description that will appear on the card on the fundraisers page and in the meta tags for the page (good for search engines).",
		},
		{
			name: "startDate",
			title: "Start Date",
			type: "datetime",
			description:
				"Arbitrary, but will determine the order in which the fundraisers are displayed on the fundraisers page (newer fundraisers appear first).",
		},
		{
			name: "endDate",
			title: "End Date",
			type: "datetime",
			description:
				'Optional, will be displayed on the event card if included. Card with end dates in the past will appear in the "Past Fundraisers" section.',
		},
		{
			name: "body",
			title: "Body",
			type: "blockContent",
		},
	],
};
