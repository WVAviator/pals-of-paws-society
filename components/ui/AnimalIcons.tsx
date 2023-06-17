import maleIcon from "/public/images/maleIcon.svg";
import femaleIcon from "/public/images/femaleIcon.svg";
import catIcon from "/public/images/catIcon.svg";
import dogIcon from "/public/images/dogIcon.svg";
import styles from "./AnimalIcons.module.scss";
import Image from "next/image";

interface AnimalIconsProps {
	sex: string;
	type: string;
}

const AnimalIcons = ({ sex, type }: AnimalIconsProps) => {
	const sexIcon = (
		<Image
			aria-label={sex}
			src={sex === "female" ? femaleIcon : maleIcon}
			alt={sex}
		/>
	);
	const typeIcon = (
		<Image
			aria-label={type}
			src={type === "dog" ? dogIcon : catIcon}
			alt={type}
		/>
	);

	return (
		<div className={styles.icons}>
			{typeIcon}
			{sexIcon}
		</div>
	);
};

export default AnimalIcons;
