import { GetStaticPaths, GetStaticProps } from "next";
import SanityContent from "../components/sanity/SanityContent";
import sanityClient from "../src/sanity";
import { Page } from "../types";

interface PageProps {
	page: Page;
}

const DynamicPage = ({ page }: PageProps) => {
	return (
		<div>
			<SanityContent pageContent={page} />
		</div>
	);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const pageUrl = params?.page[1];
	const categoryUrl = params?.page[0];

	const query = `*[_type == "page" && category->categoryUrl.current == $categoryUrl &&  pageUrl.current == $pageUrl
	][0]{
        body,
        description,
        title,
        pageUrl,
        category->{ categoryUrl }
      }`;

	console.log("Retrieving static props for [...page]...", new Date());

	const page: Page = await sanityClient.fetch(query, {
		categoryUrl,
		pageUrl,
	});

	return {
		props: {
			page,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const pageQuery = `*[_type == "page"]{
        category->{ categoryUrl },
        pageUrl
    }`;

	console.log("Fetching static paths for [...page]...", new Date());

	const pages: Page[] = await sanityClient.fetch(pageQuery);

	return {
		paths: pages.map((page) => {
			return {
				params: {
					page: [
						page.category.categoryUrl.current,
						page.pageUrl.current,
					],
				},
			};
		}),
		fallback: false,
	};
};

export default DynamicPage;
