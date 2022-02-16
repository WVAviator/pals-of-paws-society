import Link from "next/link";

const CustomLink = (props) => {
	const href = props.href;
	const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

	console.log(href);

	if (isInternalLink) {
		return (
			<Link href={href}>
				<a {...props}>{props.children}</a>
			</Link>
		);
	}

	return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

export default CustomLink;
