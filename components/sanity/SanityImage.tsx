import sanityClient from "../../src/sanity";
import Image, { ImageProps } from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { SanityImageAsset } from "../../types";

interface Props extends Omit<ImageProps, "src"> {
	source: SanityImageAsset;
	maxWidth?: string;
}

const SanityImage = ({
	source,
	layout = "responsive",
	maxWidth = "800px",
	...rest
}: Props) => {
	const imageProps = useNextSanityImage(sanityClient, source);

	const imageOptions = {
		fill: {
			src: imageProps?.src ?? "/images/no-image.png",
			loader: imageProps?.loader,
		},
		responsive: {
			...imageProps,
			sizes: `(max-width: ${maxWidth}) 100vw, ${maxWidth}`,
		},
		intrinsic: {
			...imageProps,
		},
		fixed: {
			...imageProps,
		},
	};

	return (
		<Image
			{...imageOptions[layout]}
			alt={source?.alt ?? ""}
			layout={layout}
			{...rest}
		/>
	);
};

export default SanityImage;
