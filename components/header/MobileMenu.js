import React from "react";
import styles from "./MobileMenu.module.scss";
import NavLinks from "./NavLinks";

const MobileMenu = ({ open }) => {
	return (
		<nav
			role="navigation"
			className={`${styles.menu} ${open ? styles.open : styles.closed}`}
		>
			<NavLinks />
		</nav>
	);
};

export default MobileMenu;
