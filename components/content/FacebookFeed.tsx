import { FacebookProvider, Page } from "react-facebook";
import styles from "./FacebookFeed.module.scss";

const FacebookFeed = () => {
	return (
		<div className={styles.container}>
			<p>
				Follow us on{" "}
				<a href="https://www.facebook.com/palsofpawssociety">Facebook!</a>
			</p>
			<a href="#mission" className={styles.skip}>
				Skip Facebook feed
			</a>
			<FacebookProvider appId="367458938719260">
				<Page
					href="https://www.facebook.com/palsofpawssociety/"
					tabs="timeline"
					adaptContainerWidth
					smallHeader
				/>
			</FacebookProvider>
		</div>
	);
};

export default FacebookFeed;
