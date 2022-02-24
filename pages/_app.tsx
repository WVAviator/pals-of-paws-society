import PageLayout from "../components/layout/PageLayout";
import "../styles/globals.scss";
import MDXLink from "../components/mdx/MDXLink";
import MDXImage from "../components/mdx/MDXImage";
import { ThemeProvider } from "@mui/material";

import { muiTheme } from "../styles/muiTheme";

const mdxComponents = {
	a: MDXLink,
	img: MDXImage,
	MDXImage,
};

interface AppProps {
	Component: any;
	pageProps: any;
}

function MyApp({ Component, pageProps }: AppProps) {
	// const router = useRouter();
	// const [loadingPage, setLoadingPage] = useState<boolean>(false);

	// useEffect(() => {

	// 	const changeStart = (url, { shallow }) => setLoadingPage(true);
	// 	const changeComplete = (url, { shallow }) => setLoadingPage(false);

	// 	router.events.on("routeChangeStart", changeStart);
	// 	router.events.on("routeChangeComplete", changeComplete);
	// 	router.events.on("routeChangeError", changeComplete);

	// 	return () => {
	// 		router.events.off("routeChangeStart", changeStart);
	// 		router.events.off("routeChangeComplete", changeComplete);
	// 		router.events.off("routeChangeError", changeComplete);
	// 	}

	// }, [])

	return (
		<ThemeProvider theme={muiTheme}>
			<PageLayout>
				<Component {...pageProps} components={mdxComponents} />
			</PageLayout>
		</ThemeProvider>
	);
}

export default MyApp;
