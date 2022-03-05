import Head from "next/head";
import DonateHero from "../../components/donate/DonateHero";

const Donate = () => {
	return (
		<div>
			<Head>
				<title>Donate to Pals Of Paws Society</title>
				<meta
					name="description"
					content="Pals of Paws Society uses donations from the community to help finance low cost options for pet spays and neuters. Making these procedures more accessible and affordable aligns with our goal of reducing pet overpopulation in Northwest Mississippi."
				/>

				<meta property="og:type" key="ogType" content="website" />
				<meta
					property="og:title"
					key="ogTitle"
					content="Donate to Pals of Paws Society"
				/>
				<meta
					property="og:url"
					key="ogUrl"
					content="https://www.palsofpawssociety.org/donate"
				/>
				<meta
					property="og:description"
					key="ogDescription"
					content="Pals of Paws Society uses donations from the community to help finance low cost options for pet spays and neuters. Making these procedures more accessible and affordable aligns with our goal of reducing pet overpopulation in Northwest Mississippi."
				/>
			</Head>
			<DonateHero />
		</div>
	);
};

export default Donate;
