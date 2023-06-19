import { GetStaticProps } from "next";
import EventCard from "../../components/content/EventCard";
import PawprintSection from "../../components/page-sections/PawprintSection";
import EventContent from "../../components/page-sections/EventContent";
import { Fundraiser } from "../../types";
import sanityClient from "../../src/sanity";
import { NextSeo } from "next-seo";

interface FundraisersProps {
	fundraisers: Fundraiser[];
}

const Fundraisers = ({ fundraisers }: FundraisersProps) => {
	const sortedEvents = fundraisers.sort((a, b) => {
		return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
	});

	console.log(sortedEvents);

	const activeEvents = sortedEvents.filter((event) => {
		if (event.endDate) {
			const endDate = new Date(event.endDate);
			const today = new Date();
			return today < endDate;
		} else {
			return true;
		}
	});
	const pastEvents = sortedEvents.filter(
		(event) => new Date(event.endDate) < new Date()
	);

	const mappedActiveEvents = activeEvents.map((event) => {
		return (
			<div key={event.pageUrl.current}>
				<EventCard event={event} active />
			</div>
		);
	});

	const mappedPastEvents = pastEvents.map((event) => {
		return (
			<div key={event.pageUrl.current}>
				<EventCard event={event} />
			</div>
		);
	});

	return (
		<>
			<NextSeo
				title="Fundraisers"
				description="Check out any of our current or past fundraisers and help raise money for animal welfare in NW Mississippi."
				canonical="https://www.palsofpawssociety.org/fundraisers"
				openGraph={{
					title: "Fundraisers",
					description:
						"Check out any of our current or past fundraisers and help raise money for animal welfare in NW Mississippi.",
					url: `https://www.palsofpawssociety.org/fundraisers`,
					images: [
						{
							url: "https://www.palsofpawssociety.org/images/og/pop-og.png",
							width: 1200,
							height: 630,
							alt: "Pals of Paws Society",
						},
					],
				}}
			/>
			<PawprintSection sectionTitle="Active Events">
				<EventContent heading="Current Events">
					{mappedActiveEvents}
				</EventContent>
			</PawprintSection>
			<PawprintSection sectionTitle="Past Events">
				<EventContent heading="Past Events">{mappedPastEvents}</EventContent>
			</PawprintSection>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const query = `*[_type == "fundraiser"]{
        description,
        title,
        pageUrl,
        startDate,
        endDate,
        mainImage
      }`;

	const fundraisers: Fundraiser[] = await sanityClient.fetch(query);

	return {
		props: { fundraisers },
	};
};

export default Fundraisers;
