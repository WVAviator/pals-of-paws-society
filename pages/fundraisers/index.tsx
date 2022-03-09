import { GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import UnderConstruction from "../../components/layout/UnderConstruction";
import { getEvents } from "../../src/event";
import Image from "next/image";
import { EventMeta } from "../../src/types/EventMeta";
import Link from "next/link";
import EventCard from "../../components/content/EventCard";
import PawprintSection from "../../components/page-sections/PawprintSection";
import EventContent from "../../components/page-sections/EventContent";

interface FundraisersProps {
	events: EventMeta[];
}

const Fundraisers = ({ events }: FundraisersProps) => {
	const sortedEvents = events.sort((a, b) => {
		return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
	});

	const activeEvents = sortedEvents.filter(
		(event) => new Date(event.endDate) > new Date()
	);
	const pastEvents = sortedEvents.filter(
		(event) => new Date(event.endDate) < new Date()
	);

	const mappedActiveEvents = activeEvents.map((event) => {
		return (
			<div key={event.slug}>
				<EventCard event={event} active />
			</div>
		);
	});

	const mappedPastEvents = pastEvents.map((event) => {
		return (
			<div key={event.slug}>
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
				<EventContent heading="Past Events">{mappedPastEvents}</EventContent>
			</PawprintSection>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const events: EventMeta[] = getEvents();

	return {
		props: { events },
	};
};

export default Fundraisers;
