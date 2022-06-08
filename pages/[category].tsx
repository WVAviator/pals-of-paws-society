import { GetStaticPaths, GetStaticProps } from "next";
import SanityContent from "../components/sanity/SanityContent";
import sanityClient from "../src/sanity";
import { Category, Page } from "../types";

interface PageProps {
	page: Category;
}

const CategoryPage = ({ page }: PageProps) => {
	return (
		<div>
			<SanityContent pageContent={page} />
		</div>
	);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const categoryUrl = params?.category;

	const query = `*[_type == "category" && categoryUrl.current == $categoryUrl
	][0]{
        body,
        description,
        title,
        categoryUrl
      }`;

	console.log("Fetching static props for [category]", new Date());

	const page: Category = await sanityClient.fetch(query, {
		categoryUrl,
	});

	return {
		props: {
			page,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const query = `*[_type == "category"]{
        categoryUrl
    }`;

	console.log("Fetching static paths for [category]", new Date());

	const pages: Category[] = await sanityClient.fetch(query);

	return {
		paths: pages.map((page) => ({
			params: {
				category: page.categoryUrl.current,
			},
		})),

		fallback: false,
	};
};

export default CategoryPage;
