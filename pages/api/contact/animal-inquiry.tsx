import { NextApiRequest, NextApiResponse } from "next";
import { Animal } from "../../../src/types/Animal";
import { ContactInformation } from "../../../src/types/ContactInformation";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const optOutEmailAddresses = ["wvaviator@gmail.com"];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const { formData, animal } = req.body as {
			formData: ContactInformation;
			animal: Animal;
		};

		if (optOutEmailAddresses.includes(animal.organization.email)) {
			res.status(400);
			return;
		}

		const msg = {
			to: "wvaviator@gmail.com", // Change to your recipient
			from: "wvaviator@gmail.com", // Change to your verified sender
			subject: `Adopter for ${animal.name}`,
			text: `We have found a potential adopter for ${
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
			adopters, simply reply to this email. Also feel free to reach out to us
			with any questions.\nWe hope everything works out and ${animal.name} can find ${
				animal.sex === "male" ? "his" : "her"
			} new home!\n\nPals of Paws Society`,
			html: getHtml(animal, formData),
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

const getHtml = (animal: Animal, formData: ContactInformation) => {
	return `
	<head>
	<style>
		body {
			background-color: #dbdbdb;
		}
		.banner {
			height: 30px;
			width: 100%;

			background-color: #9c84b6;
		}
		a {
			color: #692fa8;
			text-decoration: none;
		}
		a:hover {
			text-decoration: underline;
		}
		ul {
			list-style: none;
		}
		address {
			font-style: normal;
		}
		img {
			margin-right: 2rem;
			max-height: 5.625rem;
		}
	</style>
</head>
<body>
	<div class="banner"></div>
	<div>
		<p>We have found a potential adopter for ${animal.name}!</p>
		<p>
			While browsing our
			<a href="https://www.palsofpawssociety.org/">website</a>, which contains
			<a href="https://www.palsofpawssociety.org/adopt">animal listings</a>
			posted publicly on <a href="https://www.petfinder.com/">Petfinder</a>, the
			following adopter filled out a form to indicate their interest in
			${animal.name}:
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
			Please reach out to them and direct them to begin your offical process for
			adoption.
		</p>
		<p>
			Finding adopters for all homeless pets in Mississippi is a huge part of
			our mission at Pals of Paws Society, which is why we have decided to
			provide free animal marketing for all Northwest Mississippi animal rescues
			and shelters using public data available from Petfinder. Please visit our
			<a href="https://www.palsofpawssociety.org/">website</a> to learn more
			about our services, including
			<a href="https://www.palsofpawssociety.org/about/adoptions"
				>adoption assistance</a
			>,
			<a href="https://www.palsofpawssociety.org/about/transports">transports</a
			>, and our
			<a href="https://www.palsofpawssociety.org/about/tnr">TNR program.</a>
		</p>
		<p>
			We're happy to continue providing this service for free in alignment with
			our mission. If you want us to stop forwarding you messages from potential
			adopters, simply reply to this email. Also feel free to reach out to us
			with any questions.
		</p>
		<p>
			We hope everything works out and ${animal.name} can find ${
		animal.sex === "male" ? "his" : "her"
	} new home! Please feel free to reach out to us with
			any questions.
		</p>
		<br />
		<div style="display: flex">
			<span
				><img
					src="https://firebasestorage.googleapis.com/v0/b/pals-of-paws-society.appspot.com/o/pop-logo.png?alt=media&token=0f0e9b62-d0c0-4a61-943b-a4ced0a2ab8e"
			/></span>
			<span>
				<br />
				<address>Pals of Paws Society</address>
				<address>2466 Tragg Ave.</address>
				<address>Hernando, MS 38632</address>
			</span>
		</div>
	</div>
	<div class="banner"></div>
</body>

    `;
};
