import React from "react";
import styles from "./MobileMenu.module.scss";
import NavLinks from "./NavLinks";

interface MobileMenuProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileMenu = ({ open, setOpen }: MobileMenuProps) => {
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
