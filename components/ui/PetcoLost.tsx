interface PetcoLostProps {
	url: string;
}

const PetcoLost: React.FC<PetcoLostProps> = ({ url }) => {
	return (
		<div
			style={{
				position: "relative",
				width: "100%",
				height: "90svh",
			}}
		>
			<iframe
				src={url}
				frameBorder="0"
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					width: "100%",
					height: "100%",
				}}
			/>
		</div>
	);
};

export default PetcoLost;
