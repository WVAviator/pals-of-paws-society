import axios from "axios";
import Image from "next/image";
import getShelterluvAnimals from "/src/api/Shelterluv.ts";

const Adopt = ({ animals }) => {
	console.log(animals);

	const mappedAnimals = animals.map((animal) => {
		return (
			<div
				key={animal.ID}
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<h3>{animal.Name}</h3>
				<p>{animal.Sex}</p>
				<div>
					{animal.CoverPhoto ? (
						<Image src={animal.CoverPhoto} width={300} height={300} />
					) : null}
				</div>
			</div>
		);
	});

	return (
		<div
			style={{
				padding: "3rem",
				display: "flex",
				flexWrap: "wrap",
				gap: "2rem",
			}}
		>
			{mappedAnimals}
		</div>
	);
};

export async function getStaticProps() {
	const animals = await getShelterluvAnimals();

	return {
		props: { animals },
	};
}

export default Adopt;
