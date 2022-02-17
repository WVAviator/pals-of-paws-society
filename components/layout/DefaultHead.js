import Head from "next/head";

const DefaultHead = () => {
	return (
		<Head>
			<title>Pals of Paws Society</title>
			<meta
				name="description"
				content="Pals of Paws Society is a nonprofit organization dedicated to fighting the pet overpopulation problem in Northwest Mississippi. We provide adoption, animal transport, and verterinary financial assistance for shelters, rescue groups, and individuals throughout Desoto, Tate, and Tunica counties, as well as Memphis, Tenessee, from our headquarters in Hernando."
			/>
			<meta
				name="keywords"
				content="pet adoption, animal transport, spay and nueter"
			/>
			<meta charset="UTF-8" />
			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<link rel="icon" href="/POP_Favicon.png" />
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
			<link
				href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Signika+Negative:wght@400;600&display=swap"
				rel="stylesheet"
			/>
		</Head>
	);
};

export default DefaultHead;
