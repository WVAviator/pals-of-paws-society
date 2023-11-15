import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image, { StaticImageData } from "next/image";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import CustomButton from "../ui/CustomButton";
import styles from "./Hero.module.scss";
import { PropsWithChildren } from "react";

interface HeroProps {
	image: string | StaticImageData;
	imagePositionBreakpoint?: number;
	mobileImagePosition?: string | number;
	desktopImagePosition?: string | number;
}

const Hero: React.FC<PropsWithChildren<HeroProps>> = ({
	image,
	children,
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
			<div className={styles.content}>{children}</div>
		</section>
	);
};

export default Hero;
