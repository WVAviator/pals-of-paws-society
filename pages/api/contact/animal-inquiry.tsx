import { NextApiRequest, NextApiResponse } from "next";
import { sendAutomatedEmail } from "../../../src/api/automatedMail";
import {
	generateDynamicGreeting,
	generateHtmlEmail,
	generateTextEmail,
} from "../../../src/api/emailTemplate";
import { Animal } from "../../../src/types/Animal";
import { ContactInformation } from "../../../src/types/ContactInformation";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const { formData, animal } = req.body as {
			formData: ContactInformation;
			animal: Animal;
		};

		const adoptionEmailHtml = `
		<p>${generateDynamicGreeting()}</p>
		<p>We found a potential adopter for ${animal.name}.</p>
		<p>
			While browsing our website at https://www.palsofpawssociety.org/, which
			contains animal listings posted publicly on Petfinder, the following
			adopter filled out a form to indicate their interest in ${animal.name}:
		</p>
		<br />
		<ul>
			<li>Name: ${formData.name}</li>
			<li>Email Address: ${formData.email}</li>
			<li>Phone Number: ${formData.phone}</li>
			<li>Comments: ${formData.comments}</li>
		</ul>
		<br />
		<p>
			Please reach out to them and direct them to begin your official process for
			adoption.
		</p>
		<p>
			Finding adopters for all homeless pets in Mississippi is a huge part of
			our mission at Pals of Paws Society, which is why we have decided to
			provide free animal marketing for all Northwest Mississippi animal rescues
			and shelters using public data available from Petfinder.
		</p>
		<p>
			We're happy to continue providing this service for free in alignment with
			our mission. If you want us to stop forwarding you messages from potential
			adopters, just let us know. Also feel free to reach out to us
			with any questions.
		</p>
		<p>
			We hope everything works out and ${animal.name} can find ${
			animal.sex === "male" ? "his" : "her"
		} new home!
		</p>
    `;
		const adoptionEmailText = `
		${generateDynamicGreeting()}\n
		We found a potential adopter for ${
			animal.name
		}.\nWhile browsing our website https://www.palsofpawssociety.org/, which contains animals publicly listed on Petfinder, the following individual expressed interest in ${
			animal.name
		} by filling out a contact form:\n\nName: ${
			formData.name
		}\nEmail Address: ${formData.email}\nPhone Number: ${
			formData.phone
		}\nComments:\n${
			formData.comments
		}\n\nPlease reach out to them and direct them to begin your offical process for adoption.\nWe're happy to continue providing this service for free in alignment with
		our mission. If you want us to stop forwarding you messages from potential
		adopters, just let us know. Feel free to reach out to us
		with any questions.\nWe hope everything works out and ${animal.name} can find ${
			animal.sex === "male" ? "his" : "her"
		} new home!`;

		const msg = {
			to: animal.organization.email,
			from: "Pals of Paws Society <adoptions@palsofpawssociety.org>",
			bcc: "palsofpawssociety@gmail.com",
			replyTo: "palsofpawssociety@gmail.com",
			subject: `Adopter for ${animal.name}`,
			text: generateTextEmail(adoptionEmailText),
			html: generateHtmlEmail(adoptionEmailHtml),
		};

		try {
			await sendAutomatedEmail(msg);
			res.send(200);
		} catch (error) {
			console.error(error);
			res.send(500);
		}
	} else {
		res.send(400);
	}
};

export default handler;
