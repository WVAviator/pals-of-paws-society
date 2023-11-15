import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image, { StaticImageData } from "next/image";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import CustomButton from "../ui/CustomButton";
import styles from "./Hero.module.scss";

interface HeroProps {
	image: string | StaticImageData;
	imagePositionBreakpoint?: number;
	mobileImagePosition?: string | number;
	desktopImagePosition?: string | number;
}

const Hero: React.FC<HeroProps> = ({
	image,
	imagePositionBreakpoint = 1150,
	mobileImagePosition = "75%",
	desktopImagePosition = "center 15%",
}) => {
	const { height, width } = useWindowDimensions();

	return (
		<section className={styles.background}>
			<Image
				src={image}
				alt="A dog in a grassy field"
				objectFit="cover"
				objectPosition={
					width > imagePositionBreakpoint
						? desktopImagePosition
						: mobileImagePosition
				}
				layout="fill"
				className={styles.image}
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
