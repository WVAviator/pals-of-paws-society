import styles from "./CardContent.module.scss";

interface CardContentProps {
	children: JSX.Element;
	heading: string;
}

const CardContent = ({ children, heading = null }: CardContentProps) => {
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

export default CardContent;
