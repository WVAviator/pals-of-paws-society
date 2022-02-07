import Link from "next/link";
import styles from "./Hamburger.module.scss";

const Hamburger = ({ open, setOpen }) => {
	const activeClass = open ? styles.open : styles.closed;

	return (
		<a className={styles.menuIcon} onClick={() => setOpen(!open)}>
			<div className={activeClass}></div>
		</a>
	);
};

export default Hamburger;
