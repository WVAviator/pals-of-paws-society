import maleIcon from "/public/images/maleIcon.svg";
import femaleIcon from "/public/images/femaleIcon.svg";
import catIcon from "/public/images/catIcon.svg";
import dogIcon from "/public/images/dogIcon.svg";
import styles from "./AnimalIcons.module.scss";
import Image from "next/image";

const AnimalIcons = ({ sex, type }) => {
	const sexIcon = (
		<Image src={sex === "female" ? femaleIcon : maleIcon} alt={sex} />
	);
	const typeIcon = (
		<Image src={type === "dog" ? dogIcon : catIcon} alt={type} />
	);

	return (
		<div className={styles.icons}>
			{typeIcon}
			{sexIcon}
		</div>
	);
};

export default AnimalIcons;
