import { DefaultSeo, LocalBusinessJsonLd } from "next-seo";
import Footer from "../footer/Footer";
import Header from "../header/Header";

interface PageLayoutProps {
	children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
	return (
		<>
			<DefaultSeo
				title="Pals of Paws Society"
				description="Pals of Paws Society is a nonprofit organization dedicated to fighting the pet overpopulation problem in Northwest Mississippi. We provide adoption, animal transport, and veterinary financial assistance for shelters, rescue groups, and individuals throughout Desoto, Tate, and Tunica counties, as well as Memphis, Tennessee, from our headquarters in Hernando."
				openGraph={{
					type: "website",
					locale: "en_US",
					url: "https://www.palsofpawssociety.org/",
					site_name: "Pals of Paws Society",
					title: "Pals of Paws Society",
					description:
						"Pals of Paws Society is a nonprofit organization dedicated to fighting the pet overpopulation problem in Northwest Mississippi. We provide adoption, animal transport, and veterinary financial assistance for shelters, rescue groups, and individuals throughout Desoto, Tate, and Tunica counties, as well as Memphis, Tennessee, from our headquarters in Hernando.",
					images: [
						{
							url: "https://www.palsofpawssociety.org/images/og/pop-og.png",
							width: 1200,
							height: 630,
							alt: "Pals of Paws Society",
						},
					],
				}}
			/>
			<LocalBusinessJsonLd
				type="LocalBusiness"
				id="https://www.palsofpawssociety.org/"
				name="Pals of Paws Society"
				description="Pals of Paws Society is a nonprofit organization dedicated to fighting the pet overpopulation problem in Northwest Mississippi. We provide adoption, animal transport, and veterinary financial assistance for shelters, rescue groups, and individuals throughout Desoto, Tate, and Tunica counties, as well as Memphis, Tennessee, from our headquarters in Hernando."
				url="https://www.palsofpawssociety.org/"
				additionalType="http://www.productontology.org/id/Non-profit_organization"
				images={[
					"https://www.palsofpawssociety.org/images/og/pop-og.png",
					"https://www.palsofpawssociety.org/images/pop-logo.png",
				]}
				telephone="+19014436336"
				address={{
					streetAddress: "12 W Commerce St Unit 49",
					addressLocality: "Hernando",
					addressRegion: "MS",
					postalCode: "38632",
					addressCountry: "US",
				}}
				geo={{ latitude: 34.823, longitude: -89.993 }}
				areaServed={[
					{
						geoMidpoint: {
							latitude: "34.823",
							longitude: "-89.993",
						},
						geoRadius: "30",
					},
				]}
				sameAs={["https://www.facebook.com/PalsofPawsSociety"]}
				nonprofitStatus="http://schema.org/Nonprofit501c3"
			/>
			<Header />
			<main id="main">{children}</main>
			<Footer />
		</>
	);
};

export default PageLayout;
