import Link from "next/link";

interface NavLinksProps {
	onClick?: () => void;
}

const NavLinks = ({ onClick = () => { } }: NavLinksProps) => {
	return (
		<ul>

			<li onClick={onClick}>
				<Link href="/" passHref><a>Home</a></Link>
			</li>


			<li onClick={onClick}>
				<Link href="/about" passHref><a>About</a></Link>
			</li>


			<li onClick={onClick}>
				<Link href="/fundraisers" passHref><a>Fundraisers</a></Link>
			</li>


			<li onClick={onClick}>
				<Link href="/adopt" passHref><a>Adopt</a></Link>
			</li>

		</ul>
	);
};

export default NavLinks;
