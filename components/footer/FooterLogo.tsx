import Image from "next/image";
import Link from "next/link";
import logo from "/public/images/whitelogo.svg";

const FooterLogo = () => {
	return (
		<Link href="/" passHref>
			<a>
				<div>
					<Image
						src={logo}
						width={120}
						height={120}
						alt="Pals of Paws Society logo - a silhouette of a dog and a cat looking up"
					/>
				</div>
			</a>
		</Link>
	);
};

export default FooterLogo;
