import Link from "next/link";
import PurpleButton from "../ui/PurpleButton";
import styles from "./FooterNavigation.module.scss";

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
					<PurpleButton href="/donate" className={styles.btn}>
						Donate
					</PurpleButton>
				</li>
			</ul>
		</nav>
	);
};

export default FooterNavigation;
