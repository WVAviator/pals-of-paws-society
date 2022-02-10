import Head from "next/head";
import Hero from "../components/homepage/Hero";
import CardContent from "../components/page-sections/CardContent";
import InfoCard from "../components/content/InfoCard";
import PawprintSection from "/components/page-sections/PawprintSection";

import aboutImage01 from "/public/images/kitten01.jpg";
import aboutImage02 from "/public/images/van.jpg";
import aboutImage03 from "/public/images/rottweiler.jpg";

export default function Home() {
	return (
		<main>
			<Hero />
			<PawprintSection pawprintRotation={15}>
				<CardContent>
					<InfoCard
						image={aboutImage01}
						heading="Adoption Marketing"
						description="We provide our local animal shelters and rescue organizations with assistance in marketing animals for adoption."
						callToAction="Learn More"
					/>
					<InfoCard
						image={aboutImage02}
						heading="Animal Transports"
						description="We work with our rescue partners to move unadopted animals to areas where adoption demand is higher."
						callToAction="Learn More"
					/>
					<InfoCard
						image={aboutImage03}
						heading="Spay & Neuter Financing"
						description="We provide financial assistance for spays and neuters through our vet partners."
						callToAction="Learn More"
					/>
				</CardContent>
			</PawprintSection>
		</main>
	);
}
