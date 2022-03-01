# Pals of Paws Society

Pals of Paws Society is a nonprofit organization dedicated to reducing pet overpopulation in Northwest Mississippi. The Pals of Paws Society website is developed using [NextJS](https://nextjs.org/docs), [React](https://reactjs.org/docs/getting-started.html), [Typescript](https://www.typescriptlang.org/docs/), [MDX](https://mdxjs.com/), [NodeJS](https://nodejs.org/en/docs/), [Stripe](https://stripe.com/docs), and [Google Sheets API](https://developers.google.com/sheets/api). The website is mostly static, displaying most content though [@next/mdx](https://nextjs.org/docs/advanced-features/using-mdx#nextmdx) pages, with some application functionality including:

- Displaying local animals available for adoption through the merging of the organization's account with [Shelterluv](https://www.shelterluv.com/) with generic adoptable animals available through the use of the [Petfinder public API](https://www.petfinder.com/developers/v2/docs/). The data from the APIs are merged into one common Typescript interface to be served up as revalidated static props and client-side rendering.
- Submission of contact, adoption, and volunteer request forms, the data from which is stored in [Google Sheets](https://developers.google.com/sheets/api) and also forwarded to the organization's members via email.
- Acceptance of donations and fundraising contributions using the [Stripe](https://stripe.com/docs) API with an Elements Provider to remain PCI compliant.

Application deployment platform TBD.

Site design, content, copy, development, and deployment by Alexander Durham (WVAviator).
