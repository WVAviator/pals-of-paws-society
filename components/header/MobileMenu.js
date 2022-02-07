import React from "react";
import styles from "./MobileMenu.module.scss";
import NavLinks from "./NavLinks";

const MobileMenu = ({ open }) => {
	return (
		<div className={`${styles.menu} ${open ? styles.open : styles.closed}`}>
			<NavLinks />
		</div>
	);
};

export default MobileMenu;
