import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import { SanityImageAsset, PageContent } from "../../types";
import SanityImage from "./SanityImage";
import styles from "./SanityContent.module.scss";
import SanityFacebookIFrame from "./SanityFacebookIFrame";
import FeralShirtForm from "../fundraisers/FeralShirtForm";
import VolunteerForm from "../forms/VolunteerForm";
import Head from "next/head";
import Link from "next/link";

interface SanityContentProps {
	pageContent: PageContent;
}

const components: Partial<PortableTextReactComponents> = {
	types: {
		image: ({ value }) => (
			<div>
				<SanityImage source={value as SanityImageAsset} />
			</div>
		),
		facebookPost: ({ value }) => (
			<div>
				<SanityFacebookIFrame src={value.url} />
			</div>
		),
		shirtForm: () => <FeralShirtForm />,
		volunteerForm: () => <VolunteerForm />,
	},
	marks: {
		link: ({ children, value }) => (
			<a href={value.href} target="_blank" rel="noopener noreferrer">
				{children}
			</a>
		),
		internalLink: ({ children, value }) => (
			<Link href={value?.href || "#"}>
				<a>{children}</a>
			</Link>
		),
	},
};

const SanityContent = ({ pageContent }: SanityContentProps) => {
	return (
		<>
			<Head>
				<title>{pageContent.title}</title>

				<meta name="description" content={pageContent.description} />

				<meta property="og:type" key="ogType" content="website" />
				<meta
					property="og:title"
					key="ogTitle"
					content={pageContent.title}
				/>
				<meta
					property="og:url"
					key="ogUrl"
					content={`https://www.palsofpawssociety.org/`}
				/>
				<meta
					property="og:description"
					key="ogDescription"
					content={pageContent.description}
				/>
			</Head>
			<section
				role="article"
				aria-label={pageContent.title}
				className={styles.articleSection}
			>
				<article className={styles.content}>
					<h1>{pageContent.title}</h1>
					<PortableText
						value={pageContent.body}
						components={components}
					/>
				</article>
			</section>
		</>
	);
};

export default SanityContent;
