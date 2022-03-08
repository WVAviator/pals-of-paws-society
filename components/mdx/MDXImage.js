import Image from "next/image";
import styles from "./MDXImage.module.scss";

const MDXImage = (props) => {

	return (
		<div className={styles.image}>
			<Image {...props} />
			<style jsx>{`
				@media (min-width: 40rem) {
					div {
						float: ${props.float ?? "none"};
						width: ${props.floatWidth ?? "100%"};
						margin: 1rem ${props.float === "right" ? "0" : "3rem"} 1rem ${props.float === "left" ? "0" : "3rem"};
					}
				}
			`}</style>
		</div>
	);
};

export default MDXImage;
