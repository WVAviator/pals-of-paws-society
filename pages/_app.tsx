import PageLayout from "../components/layout/PageLayout";
import "../styles/globals.scss";
import { ThemeProvider } from "@mui/material";

import { muiTheme } from "../styles/muiTheme";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Fallback from "../components/layout/Fallback";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import AdoptionBrowsingProvider from "../context/AdoptionBrowsingProvider";

interface AppProps {
	Component: any;
	pageProps: any;
}

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const [loadingPage, setLoadingPage] = useState<boolean>(false);

	useEffect(() => {
		const changeStart = () => setLoadingPage(true);
		const changeComplete = () => setLoadingPage(false);

		router.events.on("routeChangeStart", changeStart);
		router.events.on("routeChangeComplete", changeComplete);
		router.events.on("routeChangeError", changeComplete);

		return () => {
			router.events.off("routeChangeStart", changeStart);
			router.events.off("routeChangeComplete", changeComplete);
			router.events.off("routeChangeError", changeComplete);
		};
	}, [router.events]);

	return (
		<ThemeProvider theme={muiTheme}>
			<GoogleReCaptchaProvider
				reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
			>
				<AdoptionBrowsingProvider>
					<PageLayout>
						{loadingPage ? <Fallback /> : <Component {...pageProps} />}
					</PageLayout>
				</AdoptionBrowsingProvider>
			</GoogleReCaptchaProvider>
		</ThemeProvider>
	);
}

export default MyApp;
