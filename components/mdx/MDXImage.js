import Image from "next/image";
import styles from "./MDXImage.module.scss";

const MDXImage = (props) => {
	return (
		<div className={styles.image}>
			<Image {...props} />
		</div>
	);
};

export default MDXImage;
