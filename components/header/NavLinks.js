import Link from "next/link";

const NavLinks = () => {
	return (
		<ul>
			<li>
				<Link href="/">
					<a>Home</a>
				</Link>
			</li>
			<li>
				<Link href="#">
					<a>About</a>
				</Link>
			</li>
			<li>
				<Link href="#">
					<a>Contact</a>
				</Link>
			</li>
			<li>
				<Link href="#">
					<a>Events</a>
				</Link>
			</li>
		</ul>
	);
};

export default NavLinks;
