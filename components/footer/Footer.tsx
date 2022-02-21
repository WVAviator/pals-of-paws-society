import styles from "./Footer.module.scss";
import FooterLogo from "./FooterLogo";
import FooterNavigation from "./FooterNavigation";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerContent}>
				<FooterNavigation />
				<FooterLogo />
				<div className={styles.copyright}>
					<p>© 2022 Pals of Paws Society. All Rights Reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
