import Link from "next/link";
import PurpleButton from "../ui/PurpleButton";
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
					<Button
						href="/donate"
						className={styles.btn}
						size="large"
						variant="contained"
					>
						Donate
					</Button>
				</li>
			</ul>
		</nav>
	);
};

export default FooterNavigation;
