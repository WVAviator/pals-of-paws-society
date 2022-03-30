import { Paper } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { EventMeta } from "../../src/types/EventMeta";
import styles from "./EventCard.module.scss";

interface EventCardProps {
	event: EventMeta;
	active?: boolean;
}

const EventCard = ({ event, active = false }: EventCardProps) => {
	const isoDateString = new Date(event.endDate).toISOString();

	return (
		<Link href={`/fundraisers/${event.slug}`}>
			<a>
				<Paper className={styles.card} elevation={3}>
					<div className={styles.image}>
						<Image
							src={event.image}
							alt={event.title}
							layout="fill"
							objectFit="cover"
						/>
					</div>
					<div className={styles.cardText}>
						<h1>{event.title}</h1>
						<p>{event.description}</p>
						<p className={styles.date}>
							{active ? "Ends " : "Ended "}
							<time dateTime={isoDateString}>
								{event.endDate}
							</time>
						</p>
					</div>
				</Paper>
			</a>
		</Link>
	);
};
export default EventCard;
