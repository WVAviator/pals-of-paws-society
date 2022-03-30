import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import MDXPage from "../../components/content/MDXPage";
import FeralShirtForm from "../../components/fundraisers/FeralShirtForm";
import MDXIFrame from "../../components/mdx/MDXIFrame";
import MDXImage from "../../components/mdx/MDXImage";
import MDXLink from "../../components/mdx/MDXLink";
import { getFileData, getPaths } from "../../src/event";
import Head from "next/head";

interface EventPageProps {
	mdxSource: MDXRemoteSerializeResult<Record<string, unknown>>;
	data: {
		[key: string]: any;
	};
}

const components = {
	a: MDXLink,
	img: MDXImage,
	MDXImage,
	MDXIFrame,
	FeralShirtForm,
};

const EventPage = ({ mdxSource, data }: EventPageProps) => {
	const schemaData = {
		__html: `
		"@context": "https://schema.org",
		"@type": "Event",
		"name": ${data.title},
		"description": ${data.description},
		"image": ${data.image},
		"startDate": ${new Date(Date.parse(data.startDate)).toISOString()},  
		"endDate": ${new Date(Date.parse(data.endDate)).toISOString()}
		`,
	};

	return (
		<div>
			<Head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={schemaData}
					key="schema-jsonld"
				/>
				<meta property="og:image" key="ogImage" content={data.image} />
			</Head>

			<div>
				<MDXPage
					meta={{ title: data.title, description: data.description }}
				>
					<MDXRemote {...mdxSource} components={components} />
				</MDXPage>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params;

	const source = getFileData(slug as string);
	const { content, data } = await matter(source);
	const mdxSource = await serialize(content);

	return {
		props: {
			mdxSource,
			data,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = getPaths();

	return {
		paths,
		fallback: false,
	};
};

export default EventPage;
