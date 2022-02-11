import Image from "next/image";
import styles from "./PawprintSection.module.scss";
import pawprints from "/public/images/pawprints01.svg";

const PawprintSection = ({
	children,
	pawprintRotation = 0,
	pawprintPosition = "50%",
	backgroundColor = "#DBDBDB",
	pawprintOpacity = 0.15,
	enableShadow = false,
	sectionTitle,
}) => {
	const pawprintStyle = {
		transform: `translate(-50%, -50%) rotate(${pawprintRotation}deg)`,
		top: pawprintPosition,
		opacity: pawprintOpacity,
	};

	const backgroundStyle = {
		backgroundColor,
		boxShadow: enableShadow ? "0 2px 3px 3px rgba(0, 0, 0, 0.3)" : "none",
	};

	return (
		<section
			aria-label={sectionTitle}
			className={styles.section}
			style={backgroundStyle}
		>
			<div className={styles.imageContainer} style={pawprintStyle}>
				<Image src={pawprints} />
			</div>
			{children}
		</section>
	);
};

export default PawprintSection;
