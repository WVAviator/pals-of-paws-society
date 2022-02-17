import styles from "./Header.module.scss";
import { useState } from "react";

import HeaderLogo from "./HeaderLogo";
import MobileMenu from "./MobileMenu";
import Navigation from "./Navigation";
import PurpleButton from "../ui/PurpleButton";
import { Button } from "@mui/material";
import SkipNavigation from "./SkipNavigation";

const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

					<Button
						variant="contained"
						href="/donate"
						size="large"
						className={styles.btn}
					>
						Donate
					</Button>
				</div>
			</div>
			<MobileMenu open={mobileMenuOpen} />
		</header>
	);
};

export default Header;
