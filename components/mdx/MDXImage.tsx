import Image, { ImageProps } from "next/image";
import styles from "./MDXImage.module.scss";

interface Props extends ImageProps {
	float?: "left" | "right" | "none";
	floatWidth?: string;
	alt?: string;
}

const MDXImage = ({
	float = "none",
	floatWidth = "100%",
	alt = "",
	...rest
}: Props) => {
	return (
		<div className={styles.image}>
			<Image alt={alt} {...rest} />
			<style jsx>{`
				@media (min-width: 40rem) {
					div {
						float: ${float};
						width: ${floatWidth};
						margin: ${float === "none"
							? "1rem 0rem"
							: `1rem ${float === "right" ? "0" : "3rem"} 1rem
							${float === "left" ? "0" : "3rem"}`};
					}
				}
			`}</style>
		</div>
	);
};

export default MDXImage;
