import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
// pages/api/revalidate.js

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		await res.unstable_revalidate("/adopt");
		return res.json({ revalidated: true });
	} catch (err) {
		// If there was an error, Next.js will continue
		// to show the last successfully generated page
		console.log(err);
		return res.status(500).send("Error revalidating");
	}
}
