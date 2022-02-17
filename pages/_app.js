import PageLayout from "../components/layout/PageLayout";
import "../styles/globals.scss";
import MDXLink from "../components/mdx/MDXLink";
import MDXImage from "../components/mdx/MDXImage";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";

const mdxComponents = {
	a: MDXLink,
	img: MDXImage,
	MDXImage,
};

const muiTheme = createTheme({
	palette: {
		primary: {
			main: "#9C84B6",
			contrastText: "#ffffff",
		},
		secondary: {
			main: "#0A1354",
			dark: "#0F172A",
			contrastText: "#ffffff",
		},
		contrastTheshold: 3,
		tonalOffset: 0.2,
	},
	typography: {
		fontFamily: ["Signika Negative", "Inter", "sans-serif"].join(","),
	},
});

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={muiTheme}>
			<PageLayout>
				<Component {...pageProps} components={mdxComponents} />
			</PageLayout>
		</ThemeProvider>
	);
}

export default MyApp;
