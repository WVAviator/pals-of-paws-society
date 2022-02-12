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
				<Link href="/about">
					<a>About</a>
				</Link>
			</li>

			<li>
				<Link href="/fundraisers">
					<a>Fundraisers</a>
				</Link>
			</li>
			<li>
				<Link href="/adopt">
					<a>Adopt</a>
				</Link>
			</li>
		</ul>
	);
};

export default NavLinks;
