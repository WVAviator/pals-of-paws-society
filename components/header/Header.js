import styles from "./Header.module.scss";
import { useState } from "react";

import HeaderLogo from "./HeaderLogo";
import MobileMenu from "./MobileMenu";
import Navigation from "./Navigation";
import { Button } from "@mui/material";
import SkipNavigation from "./SkipNavigation";
import Link from "next/link";

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
					<Link href="/donate" passHref>
						<Button variant="contained" size="large" className={styles.btn}>
							Donate
						</Button>
					</Link>
				</div>
			</div>
			<MobileMenu open={mobileMenuOpen} />
		</header>
	);
};

export default Header;
