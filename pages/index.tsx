import InfoCard from "../components/content/InfoCard";
import Hero from "../components/homepage/Hero";
import CardContent from "../components/page-sections/CardContent";
import PawprintSection from "../components/page-sections/PawprintSection";

import volunteerImage03 from "/public/images/dogAtVet.png";
import volunteerImage02 from "/public/images/dogInHome.png";
import volunteerImage01 from "/public/images/dogWithTrainer.png";
import aboutImage01 from "/public/images/kitten01.jpg";
import aboutImage03 from "/public/images/rottweiler.jpg";
import aboutImage02 from "/public/images/van.jpg";
import heroImage from "/public/images/hero.jpg";

import { GetStaticProps } from "next";
import Petco from "../components/brand/Petco/Petco";
import Sponsors from "../components/brand/Sponsors/Sponsors";
import Titos from "../components/brand/Titos/Titos";
import MissionVision from "../components/homepage/MissionVision";
import UpdatesContent from "../components/page-sections/UpdatesContent";
import { getSpreadsheetData } from "../src/api/SheetData";
import CallToAction from "../components/homepage/CallToAction";

interface HomeProps {
	catCount: number;
	dogCount: number;
}

export default function Home({ catCount, dogCount }: HomeProps) {
	return (
		<>
			<Hero image={heroImage}>
				<CallToAction
					message="Fighting pet overpopulation one adoption at a time"
					action="Learn About Us"
				/>
			</Hero>
			<PawprintSection sectionTitle="About Us" pawprintRotation={10}>
				<CardContent>
					<InfoCard
						image={aboutImage01}
						heading="Adoption Marketing"
						description="We provide our local animal shelters and rescue organizations with assistance in marketing animals for adoption."
						callToAction="Learn More"
						href="/about/adoption-management"
						alt="A gray kitten"
					/>
					<InfoCard
						image={aboutImage02}
						heading="Animal Transports"
						description="We work with our rescue partners to move unadopted animals to areas where adoption demand is higher."
						callToAction="Learn More"
						href="/about/transports"
						alt="A van driving on a road"
					/>
					<InfoCard
						image={aboutImage03}
						heading="Spay & Neuter Financing"
						description="We provide financial assistance for spays and neuters through our vet partners."
						callToAction="Learn More"
						href="/about/spayneuter"
						alt="A rottweiler"
					/>
				</CardContent>
			</PawprintSection>
			<PawprintSection
				sectionTitle="Updates"
				backgroundColor="white"
				pawprintRotation={175}
				pawprintOpacity={0.05}
			>
				<UpdatesContent catCount={catCount} dogCount={dogCount} />
			</PawprintSection>
			<PawprintSection
				sectionTitle="Our Mission and Vision"
				pawprintRotation={5}
				backgroundColor="white"
				pawprintOpacity={0.05}
				sectionId="mission"
			>
				<MissionVision />
			</PawprintSection>
			<PawprintSection
				pawprintRotation={190}
				sectionTitle="Volunteer Opportunities"
			>
				<CardContent heading="Get involved today">
					<InfoCard
						image={volunteerImage01}
						heading="Volunteer"
						description="Help us with adoption events, transporting animals to their new homes, and fundraising."
						callToAction="Get Started"
						href="/volunteer"
						alt="A woman holding a small dog"
					/>
					<InfoCard
						image={volunteerImage02}
						heading="Foster"
						description="Fostering a pet in your home gives them a safe and warm environment while we search for their new family or prepare them for transport."
						callToAction="Get Started"
						href="/volunteer"
						alt="A dog indoors laying on a dog bed"
					/>
					<InfoCard
						image={volunteerImage03}
						heading="Donate"
						description="100% of all proceeds go towards our mission of reducing pet overpopulation in Northwest Mississippi."
						callToAction="Get Started"
						href="/donate"
						alt="A bulldog sitting on an exam table at the vet"
					/>
				</CardContent>
			</PawprintSection>
			<PawprintSection
				addPawprints={false}
				sectionTitle="Partners"
				minimumHeight="5rem"
			>
				<Sponsors>
					<Petco />
					<Titos />
				</Sponsors>
			</PawprintSection>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const docId = "19VCKWp6Wq1224GB-etsKtA0LUXVPXHBuFoiZ5q0K0YY";
	const dogSheetId = "0";
	const catSheetId = "1046287395";

	const dogSheetData = await getSpreadsheetData<any>({
		docId,
		sheetId: dogSheetId,
	});
	const catSheetData = await getSpreadsheetData<any>({
		docId,
		sheetId: catSheetId,
	});

	const catCount = catSheetData?.length || 751;
	const dogCount = dogSheetData?.length || 208;

	return {
		props: { catCount, dogCount },
		revalidate: 86400,
	};
};
