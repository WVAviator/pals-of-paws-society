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

	const page: Page = await sanityClient.fetch(query, {
		categoryUrl,
		pageUrl,
	});

	return {
		props: {
			page,
		},
		revalidate: 3600,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const query = `*[_type == "page"]{
        category->{ categoryUrl },
        pageUrl
    }`;

	const pages: Page[] = await sanityClient.fetch(query);

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
