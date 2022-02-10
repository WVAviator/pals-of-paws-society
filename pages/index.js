import Head from "next/head";
import Hero from "../components/homepage/Hero";
import CardContent from "../components/page-sections/CardContent";
import InfoCard from "../components/content/InfoCard";
import PawprintSection from "/components/page-sections/PawprintSection";

import aboutImage01 from "/public/images/kitten01.jpg";
import aboutImage02 from "/public/images/van.jpg";
import aboutImage03 from "/public/images/rottweiler.jpg";
import volunteerImage01 from "/public/images/dogWithTrainer.png";
import volunteerImage02 from "/public/images/dogInHome.png";
import volunteerImage03 from "/public/images/dogAtVet.png";

import MissionVision from "../components/homepage/MissionVision";

export default function Home() {
	return (
		<main>
			<Hero />
			<PawprintSection pawprintRotation={10}>
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
			<PawprintSection
				pawprintRotation={170}
				backgroundColor="white"
				pawprintOpacity={0.05}
				enableShadow={true}
			>
				<MissionVision />
			</PawprintSection>
			<PawprintSection>
				<CardContent heading="Get involved today">
					<InfoCard
						image={volunteerImage01}
						heading="Volunteer"
						description="Help us with adoption events, transporting animals to their new homes, and fundraising."
						callToAction="Get Started"
					/>
					<InfoCard
						image={volunteerImage02}
						heading="Foster"
						description="Fostering a pet in your home gives them a safe and warm environment while we search for their new family or prepare them for transport."
						callToAction="Get Started"
					/>
					<InfoCard
						image={volunteerImage03}
						heading="Donate"
						description="100% of all proceeds go towards our mission of reducing pet overpopulation in Northwest Mississippi."
						callToAction="Get Started"
					/>
				</CardContent>
			</PawprintSection>
		</main>
	);
}
