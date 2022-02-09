import styles from "./CardContent.module.scss";

const CardContent = ({ children }) => {
	return (
		<div className={styles.contentContainer}>
			<div className={styles.cardContent}>{children}</div>
		</div>
	);
};

export default CardContent;
