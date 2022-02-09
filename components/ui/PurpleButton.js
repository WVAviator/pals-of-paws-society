import Link from "next/link";
import styles from "./PurpleButton.module.scss";

const PurpleButton = ({ children, href, className }) => {
	let appliedClasses = styles.btn;
	if (className) appliedClasses += " " + className;

	return (
		<div className={appliedClasses}>
			<Link href={href}>{children}</Link>
		</div>
	);
};

export default PurpleButton;
