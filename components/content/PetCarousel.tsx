import Image from "next/image";
import { Animal } from "../../src/types/Animal";
import Carousel from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";
import styles from "./PetCarousel.module.scss";
import PawprintSection from "../page-sections/PawprintSection";

function PetCarousel({ animal }: { animal: Animal }): JSX.Element {
	const mappedPhotos = animal.photos.map((photo) => {
		return (
			<div key={photo} className={styles.imageContainer}>
				<Image
					src={photo}
					alt={`A ${animal.breed} ${animal.type}`}
					layout="fill"
					objectFit="cover"
				/>
				<p></p>
			</div>
		);
	});

	return (
		<PawprintSection
			addPawprints={false}
			sectionTitle="Image carousel"
			backgroundColor="#0f172a"
		>
			<Carousel
				isLoop={true}
				hasMediaButton={false}
				objectFit="cover"
				className={styles.carousel}
				hasDotButtons={false}
				hasSizeButton={false}
			>
				{mappedPhotos}
			</Carousel>
		</PawprintSection>
	);
}

export default PetCarousel;
