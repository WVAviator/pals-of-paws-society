import { GetStaticPaths, GetStaticProps } from "next";
import { Fundraiser } from "../../types";
import SanityContent from "../../components/sanity/SanityContent";
import sanityClient from "../../src/sanity";
import { EventJsonLd, NextSeo } from "next-seo";

interface PageProps {
	fundraiser: Fundraiser;
}

const FundraiserPage = ({ fundraiser }: PageProps) => {
	return (
		<>
			<NextSeo
				title={fundraiser.title}
				description={fundraiser.description}
				canonical={`https://www.palsofpawssociety.org/fundraisers/${fundraiser.pageUrl.current}`}
				openGraph={{
					title: fundraiser.title, //
					description: fundraiser.description,
					url: `https://www.palsofpawssociety.org/fundraisers/${fundraiser.pageUrl.current}`,
					images: [
						{
							url: fundraiser.mainImage.asset.url,
							width: 500,
							height: 500,
							alt: fundraiser.title,
						},
					],
				}}
			/>
			<EventJsonLd
				name={fundraiser.title}
				url={`https://www.palsofpawssociety.org/fundraisers/${fundraiser.pageUrl.current}`}
				description={fundraiser.description}
				startDate={fundraiser.startDate}
				endDate={fundraiser.endDate}
				images={[fundraiser.mainImage.asset.url]}
				eventStatus="EventScheduled"
				organizer={{
					type: "Organization",
					name: "Pals of Paws Society",
					url: "https://www.palsofpawssociety.org",
				}}
				location="VirtualLocation"
			/>
			<div>
				<SanityContent pageContent={fundraiser} />
			</div>
		</>
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
				"mainImage": mainImage{
					...,
					"asset": asset->{
						...,
						"url": url
					}
				},
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
