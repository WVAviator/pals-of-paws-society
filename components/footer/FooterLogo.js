import Image from "next/image";
import logo from "/public/images/whitelogo.svg";

const FooterLogo = () => {
	return (
		<div>
			<Image src={logo} width={120} height={120} />
		</div>
	);
};

export default FooterLogo;
