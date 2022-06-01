# Pals of Paws Society

Pals of Paws Society is a nonprofit organization dedicated to reducing pet overpopulation in Northwest Mississippi. The Pals of Paws Society website is developed using [NextJS](https://nextjs.org/docs), [React](https://reactjs.org/docs/getting-started.html), [Typescript](https://www.typescriptlang.org/docs/), [MDX](https://mdxjs.com/), [NodeJS](https://nodejs.org/en/docs/), [Stripe](https://stripe.com/docs), and [Google Sheets API](https://developers.google.com/sheets/api). The website is mostly static, originally displaying most content though [@next/mdx](https://nextjs.org/docs/advanced-features/using-mdx#nextmdx) pages (now migrated to [Sanity.io](https://www.sanity.io/docs/overview-introduction)), with some application functionality including:

- Displaying local animals available for adoption through the merging of the organization's account with [Shelterluv](https://www.shelterluv.com/) with generic adoptable animals available through the use of the [Petfinder public API](https://www.petfinder.com/developers/v2/docs/). The data from the APIs are merged into one common Typescript interface to be served up as static props.
- Submission of contact, adoption, and volunteer request forms, the data from which is stored in [Google Sheets](https://developers.google.com/sheets/api) and also forwarded to the organization's members via email through [SendGrid](https://docs.sendgrid.com/).
- Acceptance of donations and fundraising contributions using the [Stripe](https://stripe.com/docs) API with an Elements Provider to remain PCI compliant.

The site is deployed on Vercel under the hobby tier with permission to collect donations and contributions for small local fundraiser events without requiring classification under the commercial tier.

Site design, content, copy, development, and deployment by Alexander Durham (WVAviator).
