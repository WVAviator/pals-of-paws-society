import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res.status(405).end("Method not allowed");
	}

	if (req.query.secret !== process.env.REVALIDATION_TOKEN) {
		return res.status(401).json({ message: "Invalid token" });
	}

	try {
		const { categoryUrl, pageUrl, fundraiserUrl } = req.body;

		if (fundraiserUrl) {
			await res.revalidate("/fundraisers");
			await res.revalidate(`/fundraisers/${fundraiserUrl}`);
			return res.json({ revalidated: true });
		}

		if (pageUrl) {
			await res.revalidate(`/${categoryUrl}/${pageUrl}`);
			return res.json({ revalidated: true });
		}

		await res.revalidate(`/${categoryUrl}`);
		return res.json({ revalidated: true });
	} catch (err) {
		// If there was an error, Next.js will continue
		// to show the last successfully generated page
		return res.status(500).send("Error revalidating");
	}
}
