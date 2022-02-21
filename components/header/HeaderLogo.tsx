import styles from "./HeaderLogo.module.scss";
import Image from "next/image";
import Link from "next/link";
import mobileLogo from "/public/images/mobile-logo.svg";
import desktopLogo from "/public/images/desktop-logo.svg";

const HeaderLogo = () => {
	const altText =
		"Pals of Paws Society logo - a silhouette of a cat and a dog looking up.";

	return (
		<Link href="/">
			<a>
				<div className={styles.logo}>
					<div className={styles.mobile}>
						<Image src={mobileLogo} alt={altText} width={95} height={95} />
					</div>
					<div className={styles.desktop}>
						<div className={styles.desktopContent}>
							<Image src={desktopLogo} alt={altText} width={95} height={95} />
							<h2 className={styles.logoText}>Pals of Paws Society</h2>
						</div>
					</div>
				</div>
			</a>
		</Link>
	);
};

export default HeaderLogo;
