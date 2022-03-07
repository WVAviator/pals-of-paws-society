import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import MDXPage from "../../components/content/MDXPage";
import MDXImage from "../../components/mdx/MDXImage";
import MDXLink from "../../components/mdx/MDXLink";
import { getFileData, getPaths } from "../../src/event";

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
};

const EventPage = ({ mdxSource, data }: EventPageProps) => {
	return (
		<div>
			<div>
				<MDXPage meta={{ title: data.title, description: data.excerpt }}>
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
