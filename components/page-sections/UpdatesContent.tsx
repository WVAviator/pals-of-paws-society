import FacebookFeed from "../content/FacebookFeed";
import AnimalCounter from "../homepage/AnimalCounter";
import styles from "./UpdatesContent.module.scss";

const UpdatesContent = () => {
	return (
		<div className={styles.content}>
			<AnimalCounter />
			<FacebookFeed />
		</div>
	);
};

export default UpdatesContent;
