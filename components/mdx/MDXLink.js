import Link from "next/link";
import styles from "./MDXLink.module.scss";

const MDXLink = (props) => {
	const href = props.href;
	const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

	console.log(href);

	if (isInternalLink) {
		return (
			<Link href={href}>
				<a className={styles.link} {...props}>
					{props.children}
				</a>
			</Link>
		);
	}

	return (
		<a
			className={styles.link}
			target="_blank"
			rel="noopener noreferrer"
			{...props}
		/>
	);
};

export default MDXLink;
