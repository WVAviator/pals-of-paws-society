import Image from "next/image";
import styles from "./ProfileCard.module.scss";

const ProfileCard = (props) => {
	return (
		<article className={styles.card}>
			<div className={styles.content}>
				{/* <div className={styles.image}>
					<Image {...props} />
				</div> */}
				<div className={styles.text}>
					<h3>{props.name}</h3>
					<h4>{props.title}</h4>
					{/* <p>{props.description}</p> */}
				</div>
			</div>
		</article>
	);
};

export default ProfileCard;
