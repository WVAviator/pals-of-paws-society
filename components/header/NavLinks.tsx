import Link from "next/link";
import styles from "./NavLinks.module.scss";

interface NavLinksProps {
	onClick?: () => void;
}

const NavLinks = ({ onClick = () => {} }: NavLinksProps) => {
	return (
		<ul>
			<li onClick={onClick}>
				<Link href="/">
					<a>Home</a>
				</Link>
			</li>

			<li onClick={onClick}>
				<Link href="/about">
					<a>About</a>
				</Link>
			</li>

			<li onClick={onClick}>
				<Link href="/fundraisers">
					<a>Fundraisers</a>
				</Link>
			</li>

			<li onClick={onClick}>
				<Link href="/adopt">
					<a>Adopt</a>
				</Link>
			</li>

			<li onClick={onClick}>
				<Link href="/fundraisers/vaccinated-and-loved">
					<a>Vaccinated and Loved</a>
				</Link>
			</li>

			<li onClick={onClick}>
				<Link href="/lost">
					<a>Lost Pets</a>
				</Link>
			</li>

			<li onClick={onClick} className={styles.mobileDonate}>
				<Link href="/donate">
					<a>Donate</a>
				</Link>
			</li>
		</ul>
	);
};

export default NavLinks;
