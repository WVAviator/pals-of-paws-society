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
		</Head>
	);
};

export default DefaultHead;
