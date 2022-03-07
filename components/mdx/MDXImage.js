import Image from "next/image";
import styles from "./MDXImage.module.scss";

const MDXImage = (props) => {
	// let floatStyle = { float: "none" };
	// if (props.float) {
	// 	floatStyle = {
	// 		float: props.float,
	// 		width: props.floatWidth ?? "33%",
	// 		margin: `1rem ${props.float === "right" ? "0" : "3rem"} 1rem ${
	// 			props.float === "right" ? "3rem" : "0"
	// 		}`, //Flush with the content margins on one side
	// 	};
	// }

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
