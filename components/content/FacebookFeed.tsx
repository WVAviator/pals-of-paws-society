import { Head } from "next/document";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { FacebookProvider, Page } from "react-facebook";
import styles from "./FacebookFeed.module.scss";

const FacebookFeed = () => {
	const { height, width } = useWindowDimensions();
	const feedWidth = Math.min(width * 0.9, 500);
	return (
		<>
			<div className={styles.container}>
				<p>
					Follow us on{" "}
					<a href="https://www.facebook.com/palsofpawssociety">Facebook!</a>
				</p>
				<FacebookProvider appId="367458938719260">
					<Page
						href="https://www.facebook.com/palsofpawssociety/"
						tabs="timeline"
						adaptContainerWidth
						smallHeader
					/>
				</FacebookProvider>
			</div>
		</>
	);
};

export default FacebookFeed;
