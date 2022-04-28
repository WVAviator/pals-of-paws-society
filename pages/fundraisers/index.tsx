import { GetStaticProps } from "next";
import EventCard from "../../components/content/EventCard";
import PawprintSection from "../../components/page-sections/PawprintSection";
import EventContent from "../../components/page-sections/EventContent";
import { Fundraiser } from "../../types";
import sanityClient from "../../src/sanity";

interface FundraisersProps {
	fundraisers: Fundraiser[];
}

const Fundraisers = ({ fundraisers }: FundraisersProps) => {
	const sortedEvents = fundraisers.sort((a, b) => {
		return (
			new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
		);
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
			<PawprintSection sectionTitle="Active Events">
				<EventContent heading="Current Events">
					{mappedActiveEvents}
				</EventContent>
			</PawprintSection>
			<PawprintSection sectionTitle="Past Events">
				<EventContent heading="Past Events">
					{mappedPastEvents}
				</EventContent>
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
