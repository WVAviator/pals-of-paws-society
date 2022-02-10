import Image from "next/image";
import styles from "./MissionVision.module.scss";
import overpopulationIcon from "/public/images/overpopulation.png";
import vetIcon from "/public/images/vetcare.png";
import rescueIcon from "/public/images/rescue.png";
import kitten from "/public/images/kitten02.png";
import PurpleButton from "../ui/PurpleButton";
import ArrowIcon from "../ui/ArrowIcon";

const MissionVision = () => {
	return (
		<section>
			<div classname={styles.mission}>
				<div className={styles.missionContent}>
					<div className={styles.description}>
						<h2>Our mission</h2>
						<p>
							Our mission is to increase adoption visibility for animal rescue
							and shelter organizations, arrange transportation for animals into
							areas of higher adoption demand, and remediate animal
							overpopulation through community outreach, education, financial
							assistance for veterinary care, and coordination with local,
							national, and international animal rescue groups.{" "}
						</p>
					</div>
					<div className={styles.missionSummary}>
						<div className={styles.missionSummaryItem}>
							<Image src={overpopulationIcon} />
							<p>Remediate animal overpopulation</p>
						</div>
						<div className={styles.missionSummaryItem}>
							<Image src={vetIcon} />
							<p>Veterinary financial assistance</p>
						</div>
						<div className={styles.missionSummaryItem}>
							<Image src={rescueIcon} />
							<p>Coordinate with rescue groups</p>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.vision}>
				<div className={styles.visionContent}>
					<div className={styles.visionImage}>
						<Image src={kitten} />
					</div>
					<div className={styles.description}>
						<h2>Our vision</h2>
						<p>
							In Northwest Mississippi, pet overpopulation is a serious
							community epidemic that transpires with a growing stray population
							and the overcrowding of local animal shelters.
						</p>
						<p>
							Pals of Paws Society also aims to tackle the problem at its source
							– by providing community outreach and education regarding the
							importance of spaying and neutering pets, and by providing
							individuals and organizations with the financial means to do so.
							Through our fundraising and networking efforts, we hope to
							eliminate the pet overpopulation problem in our community.
						</p>
						<PurpleButton href="#" className={styles.visionButton}>
							<>
								Learn More <ArrowIcon color="#9C84B6" />
							</>
						</PurpleButton>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MissionVision;
