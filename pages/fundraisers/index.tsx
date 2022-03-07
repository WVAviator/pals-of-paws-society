import { GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import UnderConstruction from "../../components/layout/UnderConstruction";
import { getEvents } from "../../src/event";
import Image from "next/image";
import { EventMeta } from "../../src/types/EventMeta";
import Link from "next/link";

interface FundraisersProps {
	events: EventMeta[];
}

const Fundraisers = ({ events }: FundraisersProps) => {
	const mappedEvents = events.map((event) => {
		return (
			<Link href={`/fundraisers/${event.slug}`} key={event.slug}>
				<a>
					<div>
						<Image
							src={event.image}
							width={300}
							height={200}
							objectFit="cover"
						/>
						<h1>{event.title}</h1>
						<p>{event.excerpt}</p>
					</div>
				</a>
			</Link>
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
