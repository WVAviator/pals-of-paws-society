import Link from "next/link";
import styles from "./Hamburger.module.scss";

const Hamburger = ({ open, setOpen }) => {
	const activeClass = `${styles.menuIcon} ${
		open ? styles.open : styles.closed
	}`;

	return (
		<div className={styles.menuIconContainer} onClick={() => setOpen(!open)}>
			<div className={activeClass}></div>
		</div>
	);
};

export default Hamburger;
