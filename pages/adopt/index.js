import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";

const Adopt = ({ data }) => {
	console.log(data);

	const mappedAnimals = data.animals.map((animal) => {
		return (
			<div
				key={animal.id}
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
	const key = process.env.SHELTERLUV_API_KEY;

	const response = await axios.get(
		"https://www.shelterluv.com/api/v1/animals",
		{
			headers: {
				"X-Api-Key": key,
			},
		}
	);

	return {
		props: { data: response.data },
	};
}

export default Adopt;
