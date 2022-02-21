import Link from "next/link";
import styles from "./FooterNavigation.module.scss";
import CustomButton from "../ui/CustomButton";

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
					<CustomButton className={styles.btn} href="/donate">
						Donate
					</CustomButton>
				</li>
			</ul>
		</nav>
	);
};

export default FooterNavigation;
