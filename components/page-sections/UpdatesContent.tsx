import FacebookFeed from "../content/FacebookFeed";
import AnimalCounter from "../homepage/AnimalCounter";
import styles from "./UpdatesContent.module.scss";

interface UpdatesContentProps {
	catCount: number;
	dogCount: number;
}

const UpdatesContent = ({ catCount, dogCount }: UpdatesContentProps) => {
	return (
		<div className={styles.content}>
			<AnimalCounter catCount={catCount} dogCount={dogCount} />
			<FacebookFeed />
		</div>
	);
};

export default UpdatesContent;
