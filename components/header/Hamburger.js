import styles from "./Hamburger.module.scss";

const Hamburger = ({ open, setOpen }) => {
	const activeClass = `${styles.menuIcon} ${
		open ? styles.open : styles.closed
	}`;

	return (
		<button
			tabIndex={0}
			aria-expanded={open}
			aria-label="Menu"
			className={styles.menuIconContainer}
			onClick={(e) => {
				e.preventDefault();
				setOpen(!open);
			}}
		>
			<div className={activeClass} aria-hidden="true" focusable="false"></div>
		</button>
	);
};

export default Hamburger;
