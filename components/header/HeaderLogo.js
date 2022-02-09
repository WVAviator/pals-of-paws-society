import styles from "./HeaderLogo.module.scss";
import Image from "next/image";
import Link from "next/link";

const HeaderLogo = () => {
	const mobileLogoImagePath = "/images/mobile-logo.svg";
	const mobileSize = 90;

	const desktopLogoImagePath = "/images/desktop-logo.svg";
	const desktopSize = 95;

	const altText =
		"Pals of Paws Society logo - a silhouette of a cat and a dog looking up.";

	return (
		<Link href="/">
			<div className={styles.logo}>
				<div className={styles.mobile}>
					<Image
						src={mobileLogoImagePath}
						alt={altText}
						width={mobileSize}
						height={mobileSize}
					/>
				</div>
				<div className={styles.desktop}>
					<div className={styles.desktopContent}>
						<Image
							src={desktopLogoImagePath}
							alt={altText}
							width={desktopSize}
							height={desktopSize}
						/>
						<h2 className={styles.logoText}>Pals of Paws Society</h2>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default HeaderLogo;
