import { DefaultSeo } from "next-seo";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import ogImage from "/images/og/pop-og.png";

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
			<Header />
			<main id="main">{children}</main>
			<Footer />
		</>
	);
};

export default PageLayout;
