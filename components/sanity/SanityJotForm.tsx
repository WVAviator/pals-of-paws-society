import React from "react";

interface SanityJotFormProps {
	id: string;
	title: string;
	src: string;
}

const SanityJotForm = ({ src, title, id }: SanityJotFormProps) => {
	const style = {
		border: "none",
		width: "92vw",
		minHeight: "100vh",
	};

	return (
		<div>
			<iframe
				id={id}
				title={title}
				allow="geolocation; microphone; camera"
				src={src}
				style={style}
			></iframe>
		</div>
	);
};
export default SanityJotForm;
