import sanityClient from "@sanity/client";

const config = {
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	apiVersion: "2021-03-21",
	useCdn: process.env.NODE_ENV === "production",
};

export default sanityClient(config);
