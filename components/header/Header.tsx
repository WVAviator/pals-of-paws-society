import styles from "./Header.module.scss";
import { useState } from "react";

import HeaderLogo from "./HeaderLogo";
import MobileMenu from "./MobileMenu";
import Navigation from "./Navigation";
import SkipNavigation from "./SkipNavigation";
import CustomButton from "../ui/CustomButton";

const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

	return (
		<header>
			<SkipNavigation />
			<div className={styles.header}>
				<div className={styles.headerContent}>
					<HeaderLogo />
					<Navigation
						mobileMenuOpen={mobileMenuOpen}
						setMobileMenuOpen={setMobileMenuOpen}
					/>
					<div className={styles.btn}>
						<CustomButton className={styles.btn} href="/donate">
							Donate
						</CustomButton>
					</div>
				</div>
			</div>
			<MobileMenu open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
		</header>
	);
};

export default Header;
