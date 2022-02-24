import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />

				<link rel="icon" href="/POP_Favicon.png" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Signika+Negative:wght@400;600&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
