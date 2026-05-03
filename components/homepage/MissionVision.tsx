import Image from "next/image";
import styles from "./MissionVision.module.scss";
import overpopulationIcon from "/public/images/overpopulation.png";
import vetIcon from "/public/images/vetcare.png";
import rescueIcon from "/public/images/rescue.png";
import kitten from "/public/images/kitten02.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "../ui/CustomButton";

const MissionVision = () => {
	return (
		<section>
			<div className={styles.mission}>
				<div className={styles.missionContent}>
					<div className={styles.description}>
						<h2>Our mission</h2>
						<p>
							Pals of Paws Society works to reduce pet overpopulation in
							Northwest Mississippi through spay/neuter assistance, adoption,
							and community education - giving every animal a chance at a loving
							home.
						</p>
					</div>
					<div className={styles.missionSummary}>
						<div className={styles.missionSummaryItem}>
							<Image
								src={overpopulationIcon}
								alt="An icon of three small circles varying in size"
								width={128}
								height={128}
							/>
							<p>Remediate animal overpopulation</p>
						</div>
						<div className={styles.missionSummaryItem}>
							<Image
								src={vetIcon}
								alt="An icon of a heart with an EKG line overlay"
								width={128}
								height={128}
							/>
							<p>Improving access to veterinary care</p>
						</div>
						<div className={styles.missionSummaryItem}>
							<Image
								src={rescueIcon}
								alt="An icon of a small house"
								width={128}
								height={128}
							/>
							<p>Coordinate with rescue groups</p>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.vision}>
				<div className={styles.visionContent}>
					<div className={styles.visionImage}>
						<Image
							src={kitten}
							alt="A kitten sitting on a brick wall in a garden"
							width={567}
							height={567}
						/>
					</div>
					<div className={styles.description}>
						<h2>Our vision</h2>
						<p>
							In Northwest Mississippi, pet overpopulation is a serious
							community epidemic that transpires with a growing stray population
							and the overcrowding of local animal shelters.
						</p>
						<p>
							Pals of Paws Society aims to tackle the overpopulation problem at
							its source – by providing community outreach and education
							regarding the importance of spaying and neutering pets. Through
							our fundraising and networking efforts, we hope to eliminate the
							pet overpopulation problem in our community.
						</p>
						<CustomButton
							variant="outlined"
							endIcon={<ArrowForwardIcon />}
							className={styles.btn}
							href="/about"
						>
							Learn About Us
						</CustomButton>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MissionVision;
