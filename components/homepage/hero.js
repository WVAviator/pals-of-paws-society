import styles from "./hero.module.scss";

const Hero = () => {
	return (
		<section className={styles.background}>
			<div className={styles.content}>
				<div class={styles.headingContainer}>
					<h1>Fighting pet overpopulation one adoption at a time</h1>
				</div>
			</div>
		</section>
	);
};

export default Hero;
