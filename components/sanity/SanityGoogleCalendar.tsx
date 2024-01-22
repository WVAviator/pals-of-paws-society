import React from "react";

interface SanityGoogleCalendarProps {
	src: string;
}

const SanityGoogleCalendar = ({ src }: SanityGoogleCalendarProps) => {
	const style = {
		border: "none",
		width: "min(90vw, 800px)",
		minHeight: "600px",
	};

	return (
		<div>
			<iframe
				src={src}
				frameBorder="0"
				scrolling="no"
				style={style}
				allowFullScreen={true}
			></iframe>
		</div>
	);
};
export default SanityGoogleCalendar;
