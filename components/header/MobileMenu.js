import React from "react";
import styles from "./MobileMenu.module.scss";
import NavLinks from "./NavLinks";

const MobileMenu = ({ open, setOpen }) => {
	const onLinkClicked = () => {
		setOpen(false);
	};

	return (
		<nav
			role="navigation"
			className={`${styles.menu} ${open ? styles.open : styles.closed}`}
		>
			<NavLinks onClick={onLinkClicked} />
		</nav>
	);
};

export default MobileMenu;
