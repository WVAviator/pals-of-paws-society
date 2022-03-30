import Head from "next/head";
import styles from "./MDXPage.module.scss";
import { useRouter } from "next/router";

interface MDXPageProps {
	meta: {
		title: string;
		description: string;
	};
	children: React.ReactNode;
}

const MDXPage = (props: MDXPageProps) => {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>{props.meta.title}</title>

				<meta name="description" content={props.meta.description} />

				<meta property="og:type" key="ogType" content="website" />
				<meta
					property="og:title"
					key="ogTitle"
					content={props.meta.title}
				/>
				<meta
					property="og:url"
					key="ogUrl"
					content={`https://www.palsofpawssociety.org${router.pathname}`}
				/>
				<meta
					property="og:description"
					key="ogDescription"
					content={props.meta.description}
				/>
			</Head>
			<section
				role="article"
				aria-label={props.meta.title}
				className={styles.section}
			>
				<article className={styles.content}>{props.children}</article>
			</section>
		</>
	);
};

export default MDXPage;
