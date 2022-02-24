import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";
import Link from "next/link";

import heroImage from "/public/images/hero.jpg";
import styles from "./Hero.module.scss";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import CustomButton from "../ui/CustomButton";

const widthToShiftImage = 1150;
const mobileShift = "75%";
const desktopShift = "center 15%";

const Hero = () => {
	const { height, width } = useWindowDimensions();

	return (
		<section className={styles.background}>
			<Image
				src={heroImage}
				alt="A dog in a grassy field"
				objectFit="cover"
				objectPosition={width > widthToShiftImage ? desktopShift : mobileShift}
				layout="fill"
				className={styles.image}
				//width={1377}
				//height={880}
				priority
			/>
			<div className={styles.content}>
				<div className={styles.headingContainer}>
					<h1>Fighting pet overpopulation one adoption at a time</h1>

					<CustomButton
						endIcon={<ArrowForwardIcon />}
						className={styles.btn}
						href="/about"
					>
						Learn About Us
					</CustomButton>
				</div>
			</div>
		</section>
	);
};

export default Hero;
