import { NextApiRequest, NextApiResponse } from "next";
import { ContactInformation } from "../../../src/types/ContactInformation";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const { formData } = req.body as {
			formData: ContactInformation;
		};

		const volunteerActivities = formData.volunteer.join("\n");

		const msg = {
			to: "volunteer@palsofpawssociety.org", // Change to your recipient
			from: "POP Volunteer <volunteer@palsofpawssociety.org>", // Change to your verified sender
			subject: `Volunteer Request - ${formData.name}`,
			text: `A volunteer application has been submitted on the website. ${formData.name} has indicated that they are interested in helping with the following activities:\n\n${volunteerActivities}\nComments:\n${formData.comments}\n\nHere is their contact information:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nThe website has informed them that that someone will reach out as soon as possible.`,
			html: getHtml(formData),
		};
		sgMail
			.send(msg)
			.then(() => {
				res.send(200);
			})
			.catch((error: any) => {
				console.error(error);
				res.send(500);
			});
	} else {
		res.send(400);
	}
};

export default handler;

const getHtml = (formData: ContactInformation) => {
	const volunteerActivities = formData.volunteer
		.map((item) => {
			return `<li>${item}</li>`;
		})
		.join("");
	console.log(volunteerActivities);

	return `
	<head>
	<style>
		body {
			background-color: #dbdbdb;
		}
		.banner {
			height: 30px;
			width: 100%;
</head>
<body>
	<div class="banner"></div>
	<div>
		<p>A volunteer application has been submitted on the website. ${formData.name} has indicated that they are interested in helping with the following activities:</p>
        <ul>
        ${volunteerActivities}
        </ul>
        <p>Comments:</p>
        <p>${formData.comments}</p>
        <p>Here is their contact information:</p>
        <ul>
        <li>Name: ${formData.name}</li>
        <li>Email: ${formData.email}</li>
        <li>Phone: ${formData.phone}</li>
        </ul>
        <p>The website has informed them that that someone will reach out as soon as possible.</p>
	</div>
	<div class="banner"></div>
</body>

    `;
};
