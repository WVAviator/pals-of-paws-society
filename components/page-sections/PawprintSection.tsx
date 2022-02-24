import Image from "next/image";
import styles from "./PawprintSection.module.scss";
import pawprints from "/public/images/pawprints01.svg";

interface PawprintSectionProps {
	children?: React.ReactNode;
	pawprintRotation?: number;
	pawprintPosition?: string;
	backgroundColor?: string;
	pawprintOpacity?: number;
	enableShadow?: boolean;
	sectionTitle: string;
	minimumHeight?: string;
	addPawprints?: boolean;
	pawprintColor?: string;
}

const PawprintSection = ({
	children,
	pawprintRotation = 0,
	pawprintPosition = "50%",
	backgroundColor = "#DBDBDB",
	pawprintOpacity = 0.15,
	enableShadow = false,
	sectionTitle,
	minimumHeight = "20rem",
	addPawprints = true,
}: PawprintSectionProps) => {
	const pawprintStyle = {
		transform: `translate(-50%, -50%) rotate(${pawprintRotation}deg)`,
		top: pawprintPosition,
		opacity: pawprintOpacity,
	};

	const backgroundStyle = {
		backgroundColor,
		boxShadow: enableShadow ? "0 2px 3px 3px rgba(0, 0, 0, 0.3)" : "none",
		minHeight: minimumHeight,
	};

	return (
		<section
			aria-label={sectionTitle}
			className={styles.section}
			style={backgroundStyle}
		>
			{addPawprints ? (
				<div className={styles.imageContainer} style={pawprintStyle}>
					<Image src={pawprints} alt="" width={2800} height={230} />
				</div>
			) : null}
			{children}
		</section>
	);
};

export default PawprintSection;
