import Image from "next/image";
import CatHero from "/public/images/CatHero.png";
import styles from "./DonateHero.module.scss";
import PaymentForm from "./PaymentForm";

const DonateHero = () => {
	return (
		<section className={styles.section}>
			<Image
				src={CatHero}
				alt="A cat laying on a dining room chair"
				objectFit="cover"
				objectPosition="22%"
				layout="fill"
				className={styles.image}
				priority
			/>

			<div className={styles.content}>
				<div className={styles.form}>
					<PaymentForm />
				</div>
			</div>
		</section>
	);
};

export default DonateHero;
