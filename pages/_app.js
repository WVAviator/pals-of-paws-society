import PageLayout from "../components/layout/PageLayout";
import "../styles/globals.scss";
import MDXLink from "../components/mdx/MDXLink";
import MDXImage from "../components/mdx/MDXImage";

const components = {
	a: MDXLink,
	img: MDXImage,
	MDXImage,
};

function MyApp({ Component, pageProps }) {
	return (
		<PageLayout>
			<Component {...pageProps} components={components} />
		</PageLayout>
	);
}

export default MyApp;
