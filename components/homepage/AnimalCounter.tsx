import Image from "next/image";
import CustomButton from "../ui/CustomButton";
import styles from "./AnimalCounter.module.scss";
import cat from "/public/images/cat-purple.svg";
import dog from "/public/images/dog-purple.svg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const AnimalCounter = () => {
	const catCount = 72;
	const dogCount = 36;

	return (
		<div className={styles.counters}>
			<p>So far, in 2022, we have helped</p>
			<div className={styles.petCounter}>
				<div className={styles.icon}>
					<Image
						className={styles.icon}
						src={cat}
						alt="A cat icon"
						layout="fill"
					/>
				</div>
				<p>{catCount} cats</p>
			</div>
			<div className={styles.petCounter}>
				<div className={styles.icon}>
					<Image src={dog} alt="A dog icon" layout="fill" />
				</div>
				<p>{dogCount} dogs</p>
			</div>
			<p>..and counting!</p>
			<CustomButton href="/volunteer" endIcon={<ArrowForwardIcon />}>
				Join Us
			</CustomButton>
		</div>
	);
};

export default AnimalCounter;
