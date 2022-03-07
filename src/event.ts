import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { EventMeta } from "./types/EventMeta";

export const getEvents = () => {
	let events: EventMeta[] = [];
	const files = fs.readdirSync(path.join(process.cwd(), "events"));

	if (files) {
		files.forEach((file) => {
			if (path.extname(file) == ".mdx") {
				const source = fs.readFileSync(
					path.join(process.cwd(), "events", `${file}`),
					{
						encoding: "utf-8",
					}
				);
				const { content, data } = matter(source);
				events.push({ ...data, slug: file.replace(".mdx", "") } as EventMeta);
			}
		});
		return events;
	} else {
		return null;
	}
};

export const getPaths = () => {
	let paths: { params: { slug: string } }[] = [];

	const files = fs.readdirSync(path.join(process.cwd(), "events"));
	if (files) {
		files.forEach((file) => {
			if (path.extname(file) == ".mdx") {
				paths.push({ params: { slug: file.replace(".mdx", "") } });
			}
		});
		return paths;
	} else {
		return null;
	}
};

export const getFileData = (fileName: string) => {
	const data = fs.readFileSync(
		path.join(process.cwd(), "events", `${fileName}.mdx`),
		{
			encoding: "utf-8",
		}
	);
	if (data) {
		return data;
	} else {
		return null;
	}
};
