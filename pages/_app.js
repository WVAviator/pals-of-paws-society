import PageLayout from "../components/layout/PageLayout";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
	return (
		<PageLayout>
			<Component {...pageProps} />
		</PageLayout>
	);
}

export default MyApp;
