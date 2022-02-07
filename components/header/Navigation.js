import NavLinks from "./NavLinks";
import Hamburger from "./Hamburger";
import styles from "./Navigation.module.scss";

const Navigation = ({ mobileMenuOpen, setMobileMenuOpen }) => {
	return (
		<nav className={styles.nav}>
			<NavLinks />
			<Hamburger open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
		</nav>
	);
};

export default Navigation;
