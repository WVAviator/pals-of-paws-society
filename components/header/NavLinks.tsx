import Link from "next/link";

interface NavLinksProps {
	onClick?: () => void;
}

const NavLinks = ({ onClick = () => { } }: NavLinksProps) => {
	return (
		<ul>

			<li onClick={onClick}>
				<Link href="/" ><a>Home</a></Link>
			</li>


			<li onClick={onClick}>
				<Link href="/about" ><a>About</a></Link>
			</li>


			<li onClick={onClick}>
				<Link href="/fundraisers" ><a>Fundraisers</a></Link>
			</li>


			<li onClick={onClick}>
				<Link href="/adopt" ><a>Adopt</a></Link>
			</li>

		</ul>
	);
};

export default NavLinks;
