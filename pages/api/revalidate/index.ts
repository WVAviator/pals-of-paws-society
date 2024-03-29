import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		return res.status(405).end("Method not allowed");
	}

	const token = req.headers.token as string;

	if (token !== process.env.REVALIDATION_TOKEN) {
		return res.status(403).json({
			message: "Token not permitted",
		});
	}

	const { categoryUrl, category, pageUrl, fundraiserUrl } = req.body;

	try {
		if (fundraiserUrl) {
			await res.revalidate("/fundraisers");
			await res.revalidate(`/fundraisers/${fundraiserUrl.current}`);
			return res.json({ revalidated: true });
		}

		if (pageUrl && category) {
			await res.revalidate(
				`/${category.categoryUrl.current}/${pageUrl.current}`,
			);
			return res.json({ revalidated: true });
		}

		await res.revalidate(`/${categoryUrl.current}`);
		return res.json({ revalidated: true });
	} catch (err) {
		let path = "";

		if (fundraiserUrl) {
			path = `/fundraisers/${fundraiserUrl.current}`;
		} else if (pageUrl && category) {
			path = `/${category.categoryUrl.current}/${pageUrl.current}`;
		} else {
			path = `/${categoryUrl.current}`;
		}
		return res
			.status(500)
			.send(`Error revalidating path: ${path}. Error: ${err}`);
	}
}
