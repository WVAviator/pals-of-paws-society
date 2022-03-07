import { Paper } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { EventMeta } from "../../src/types/EventMeta";
import styles from "./EventCard.module.scss";

interface EventCardProps {
	event: EventMeta;
}

const EventCard = ({ event }: EventCardProps) => {
	return (
		<Link href={`/fundraisers/${event.slug}`}>
			<a>
				<Paper className={styles.card} elevation={3}>
					<div className={styles.image}>
						<Image src={event.image} layout="fill" objectFit="cover" />
					</div>
					<h1>{event.title}</h1>
					<p>{event.excerpt}</p>
				</Paper>
			</a>
		</Link>
	);
};
export default EventCard;
