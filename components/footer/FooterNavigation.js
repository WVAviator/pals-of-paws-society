import Link from "next/link";
import styles from "./FooterNavigation.module.scss";
import { Button } from "@mui/material";

const FooterNavigation = () => {
	return (
		<nav className={styles.nav}>
			<ul>
				<li>
					<Link href="/privacy">Privacy Policy</Link>
				</li>
				<li>
					<Link href="/terms">Terms of Service</Link>
				</li>
				<li>
					<Link href="/donate" passHref>
						<Button className={styles.btn} size="large" variant="contained">
							Donate
						</Button>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default FooterNavigation;
