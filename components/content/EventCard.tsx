import { Paper } from "@mui/material";
import Link from "next/link";
import { Fundraiser } from "../../types";
import SanityImage from "../sanity/SanityImage";
import styles from "./EventCard.module.scss";

interface EventCardProps {
	event: Fundraiser;
	active?: boolean;
}

const EventCard = ({ event, active = false }: EventCardProps) => {
	return (
		<Link href={`/fundraisers/${event.pageUrl.current}`}>
			<a>
				<Paper className={styles.card} elevation={3}>
					<div className={styles.image}>
						<SanityImage
							source={event.mainImage}
							layout="fill"
							objectFit="cover"
						/>
					</div>
					<div className={styles.cardText}>
						<h1>{event.title}</h1>
						<p>{event.description}</p>
						{event.endDate ? (
							<p className={styles.date}>
								{active ? "Ends " : "Ended "}
								<time>
									{new Date(event.endDate).toLocaleDateString(
										"en-US",
										{
											year: "numeric",
											month: "long",
											day: "numeric",
										}
									)}
								</time>
							</p>
						) : (
							<p className={styles.date}>
								Started{" "}
								{new Date(event.startDate).toLocaleDateString(
									"en-US",
									{
										year: "numeric",
										month: "long",
										day: "numeric",
									}
								)}
							</p>
						)}
					</div>
				</Paper>
			</a>
		</Link>
	);
};
export default EventCard;
