import Head from "next/head";
import Hero from "../components/homepage/Hero";
import CardContent from "../components/page-sections/CardContent";
import PawprintSection from "/components/page-sections/PawprintSection";

export default function Home() {
	return (
		<main>
			<Hero />
			<PawprintSection pawprintRotation={15}>
				<CardContent></CardContent>
			</PawprintSection>
		</main>
	);
}
