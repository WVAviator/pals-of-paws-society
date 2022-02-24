import { NextApiRequest, NextApiResponse } from "next";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	
    


};

export default handler;