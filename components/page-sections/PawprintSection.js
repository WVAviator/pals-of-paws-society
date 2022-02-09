import Image from "next/image";
import styles from "./PawprintSection.module.scss";
import pawprints from "/public/images/pawprints01.svg";

const PawprintSection = ({
	children,
	pawprintRotation = 0,
	pawprintPosition = "50%",
}) => {
	const pawprintStyle = {
		transform: `translate(-50%, -50%) rotate(${pawprintRotation}deg)`,
		top: pawprintPosition,
	};

	return (
		<section className={styles.section}>
			<div className={styles.imageContainer} style={pawprintStyle}>
				<Image src={pawprints} className={styles.pawprints} />
			</div>
			{children}
		</section>
	);
};

export default PawprintSection;
