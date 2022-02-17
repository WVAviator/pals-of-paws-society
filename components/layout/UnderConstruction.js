import Image from "next/image";
import GridContent from "../page-sections/GridContent";
import image from "/public/images/construction.svg";
import PawprintSection from "../page-sections/PawprintSection";
import styles from "./UnderConstruction.module.scss";

const UnderConstruction = () => {
	return (
		<>
			<PawprintSection
				sectionTitle={"Under Construction"}
				backgroundColor="white"
				addPawprints={false}
			>
				<GridContent columnLayout="1fr">
					<div className={styles.content}>
						This page is under construction. We apologize.
					</div>
					<div className={styles.content}>
						<Image src={image} alt="A construction barricade icon" />
					</div>
				</GridContent>
			</PawprintSection>
			<PawprintSection backgroundColor="white" pawprintOpacity={0.05} />
		</>
	);
};

export default UnderConstruction;
