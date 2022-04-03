import { GetStaticPaths, GetStaticProps } from "next";
import { Fundraiser } from "../../types";
import SanityContent from "../../components/sanity/SanityContent";
import sanityClient from "../../src/sanity";

interface PageProps {
	fundraiser: Fundraiser;
}

const FundraiserPage = ({ fundraiser }: PageProps) => {
	return (
		<div>
			<SanityContent pageContent={fundraiser} />
		</div>
	);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const pageUrl = params?.fundraiser;

	const query = `*[_type == "fundraiser" &&  pageUrl.current == $pageUrl
	][0]{
        body,
        description,
        title,
        pageUrl,
        startDate,
        endDate,
        mainImage
      }`;

	const fundraiser: Fundraiser = await sanityClient.fetch(query, {
		pageUrl,
	});

	return {
		props: {
			fundraiser,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const query = `*[_type == "fundraiser"]{
        pageUrl
    }`;
	const fundraisers: Fundraiser[] = await sanityClient.fetch(query);
	return {
		paths: fundraisers.map((fundraiser) => ({
			params: {
				fundraiser: fundraiser.pageUrl.current,
			},
		})),
		fallback: false,
	};
};

export default FundraiserPage;
