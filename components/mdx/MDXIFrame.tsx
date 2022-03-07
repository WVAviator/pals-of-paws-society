interface MDXIFrameProps {
	src: string;
}

const MDXIFrame = ({ src }: MDXIFrameProps) => {
	const style = {
		border: "none",
		overflow: "hidden",
	};

	return (
		<div>
			<iframe
				src={src}
				width="500"
				height="660"
				style={style}
				scrolling="no"
				frameBorder="0"
				allowFullScreen={true}
				allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
			></iframe>
		</div>
	);
};
export default MDXIFrame;
