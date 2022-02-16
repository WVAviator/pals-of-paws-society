import Image from "next/image";
import { useEffect } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import ArrowIcon from "../ui/ArrowIcon";
import PurpleButton from "../ui/PurpleButton";
import styles from "./Hero.module.scss";
import heroImage from "/public/images/hero.jpg";

const Hero = () => {
	const { height, width } = useWindowDimensions();

	let imagePosition = "center 15%";

	useEffect(() => {
		imagePosition = width > 1150 ? "center 15%" : "75%";
	}, [width]);

	return (
		<section className={styles.background}>
			<Image
				src={heroImage}
				alt="A dog in a grassy field"
				objectFit="cover"
				objectPosition={imagePosition}
				layout="fill"
				className={styles.image}
				priority
			/>
			<div className={styles.content}>
				<div className={styles.headingContainer}>
					<h1>Fighting pet overpopulation one adoption at a time</h1>
					<PurpleButton href="#">
						<div className={styles.btnContent}>
							Learn More
							<ArrowIcon />
						</div>
					</PurpleButton>
				</div>
			</div>
		</section>
	);
};

export default Hero;
