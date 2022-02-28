import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const auth = await google.auth.getClient({
		scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
	});
	const sheets = google.sheets({ version: "v4", auth });

	//const { id } = req.query;
	const range = `'Dogs 2022'!A1:A50`;
	const response = await sheets.spreadsheets.values.get({
		spreadsheetId: process.env.SHEET_ID,
		range,
	});
	const [title, content] = response.data.values;
	res.send({ title, content });
};

export default handler;
