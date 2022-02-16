import Head from "next/head";
import styles from "./MDXPage.module.scss";

const MDXPage = (props) => {
	return (
		<>
			<Head>
				<title>{props.meta.title}</title>
				<meta name="description" content={props.meta.description} />
			</Head>
			<section
				role="content"
				aria-label={props.meta.title}
				className={styles.section}
			>
				<article className={styles.content}>{props.children}</article>
			</section>
		</>
	);
};

export default MDXPage;
