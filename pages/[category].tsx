import { GetStaticPaths, GetStaticProps } from "next";
import SanityContent from "../components/sanity/SanityContent";
import sanityClient from "../src/sanity";
import { Category, Page } from "../types";
import { NextSeo } from "next-seo";

interface PageProps {
	page: Category;
}

const CategoryPage = ({ page }: PageProps) => {
	return (
		<>
			<NextSeo
				title={page.title}
				description={page.description}
				canonical={`https://www.palsofpawssociety.org/${page.categoryUrl.current}`}
				openGraph={{
					title: page.title, //
					description: page.description,
					url: `https://www.palsofpawssociety.org/${page.categoryUrl.current}`,
					images: [
						{
							url: `https://www.palsofpawssociety.org/images/og/pop-og.png`,
							width: 1200,
							height: 630,
							alt: page.title,
						},
					],
				}}
			/>
			<div>
				<SanityContent pageContent={page} />
			</div>
		</>
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
