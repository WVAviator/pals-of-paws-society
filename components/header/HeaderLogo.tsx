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
				<div
					className={styles.logo}
					itemScope
					itemType="https://schema.org/LocalBusiness"
				>
					<div className={styles.mobile}>
						<Image
							src={mobileLogo}
							alt={altText}
							width={95}
							height={95}
							itemProp="image"
						/>
					</div>
					<div className={styles.desktop}>
						<div className={styles.desktopContent}>
							<Image src={desktopLogo} alt={altText} width={95} height={95} />
							<h2 className={styles.logoText} itemProp="name">
								Pals of Paws Society
							</h2>
						</div>
					</div>
					<meta itemProp="address" content="Hernando, MS" />
					<meta itemProp="telephone" content="954-224-9779" />
					<meta itemProp="areaServed" content="Northwest Mississippi" />
					<meta itemProp="email" content="palsofpawssociety@gmail.com" />
					<link
						itemProp="nonprofitStatus"
						href="https://schema.org/Nonprofit501c3"
					/>
				</div>
			</a>
		</Link>
	);
};

export default HeaderLogo;
