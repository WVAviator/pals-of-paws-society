import NavLinks from "./NavLinks";
import Hamburger from "./Hamburger";
import styles from "./Navigation.module.scss";

interface NavigationProps {
	mobileMenuOpen: boolean;
	setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Navigation = ({ mobileMenuOpen, setMobileMenuOpen }: NavigationProps) => {
	return (
		<nav role="navigation" aria-label="Main menu" className={styles.nav}>
			<NavLinks />
			<Hamburger open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
		</nav>
	);
};

export default Navigation;
