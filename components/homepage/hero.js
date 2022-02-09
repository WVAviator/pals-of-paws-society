import Image from "next/image";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import ArrowIcon from "../ui/ArrowIcon";
import PurpleButton from "../ui/PurpleButton";
import styles from "./Hero.module.scss";
import heroImage from "/public/images/hero.jpg";

const Hero = () => {
	const { height, width } = useWindowDimensions();

	const imagePosition = width > 1150 ? "center top" : "75%";

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
				<div class={styles.headingContainer}>
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
