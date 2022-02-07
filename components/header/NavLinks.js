import Link from "next/link";
import styles from "./NavLinks.module.scss";

const NavLinks = () => {
	return (
		<ul className={styles.navLinks}>
			<li>
				<Link href="#">Home</Link>
			</li>
			<li>
				<Link href="#">About</Link>
			</li>
			<li>
				<Link href="#">Contact</Link>
			</li>
			<li>
				<Link href="#">Events</Link>
			</li>
		</ul>
	);
};

export default NavLinks;
