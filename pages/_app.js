import PageLayout from "../components/layout/PageLayout";
import "../styles/globals.scss";
import Link from "next/link";

const components = {
	a: Link,
};

function MyApp({ Component, pageProps }) {
	return (
		<PageLayout>
			<Component {...pageProps} components={components} />
		</PageLayout>
	);
}

export default MyApp;
