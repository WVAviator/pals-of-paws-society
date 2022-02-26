import Head from "next/head";
import logo from "/public/images/desktop-logo.svg";

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
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />

			<meta property="og:type" content="website" />
			<meta property="og:title" content="Pals of Paws Society" />
			<meta property="og:url" content="https://www.palsofpawssociety.org/" />
			<meta property="og:image" content={logo} />
			<meta
				property="og:description"
				content="Pals of Paws Society is a nonprofit organization dedicated to fighting the pet overpopulation problem in Northwest Mississippi. We provide adoption, animal transport, and verterinary financial assistance for shelters, rescue groups, and individuals throughout northwest Mississippi from our headquarters in Hernando."
			/>
		</Head>
	);
};

export default DefaultHead;
