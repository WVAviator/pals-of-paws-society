import { GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import UnderConstruction from "../../components/layout/UnderConstruction";
import { getEvents } from "../../src/event";
import Image from "next/image";
import { EventMeta } from "../../src/types/EventMeta";
import Link from "next/link";
import EventCard from "../../components/content/EventCard";

interface FundraisersProps {
	events: EventMeta[];
}

const Fundraisers = ({ events }: FundraisersProps) => {
	const mappedEvents = events.map((event) => {
		return (
			<div key={event.slug}>
				<EventCard event={event} />
			</div>
		);
	});

	return <div>{mappedEvents}</div>;
};

export const getStaticProps: GetStaticProps = async () => {
	const events: EventMeta[] = getEvents();

	return {
		props: { events },
	};
};

export default Fundraisers;
