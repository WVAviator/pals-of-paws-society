import styles from "./EventContent.module.scss";

interface EventContentProps {
	children: React.ReactNode;
	heading?: string;
}

const EventContent = ({ children, heading = null }: EventContentProps) => {
	const optionalHeading = heading ? (
		<h2 className={styles.heading}>{heading}</h2>
	) : null;

	return (
		<div className={styles.contentContainer}>
			{optionalHeading}
			<div className={styles.cardContent}>{children}</div>
		</div>
	);
};

export default EventContent;
