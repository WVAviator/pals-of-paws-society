import Link from "next/link";

interface NavLinksProps {
	onClick?: () => void;
}

const NavLinks = ({ onClick = () => {} }: NavLinksProps) => {
	return (
		<ul>
			<Link href="/" passHref>
				<li onClick={onClick}>
					<a>Home</a>
				</li>
			</Link>
			<Link href="/about" passHref>
				<li onClick={onClick}>
					<a>About</a>
				</li>
			</Link>
			<Link href="/fundraisers" passHref>
				<li onClick={onClick}>
					<a>Fundraisers</a>
				</li>
			</Link>
			<Link href="/adopt" passHref>
				<li onClick={onClick}>
					<a>Adopt</a>
				</li>
			</Link>
		</ul>
	);
};

export default NavLinks;
