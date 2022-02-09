import Link from "next/link";

const NavLinks = () => {
	return (
		<ul>
			<li>
				<Link href="/">Home</Link>
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
