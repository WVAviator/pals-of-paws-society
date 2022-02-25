import Header from "../header/Header";
import Footer from "../footer/Footer";
import DefaultHead from "./DefaultHead";
import { MDXProvider } from "@mdx-js/react";
import Link from "next/link";

interface PageLayoutProps {
	children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
	return (
		<>
			<DefaultHead />
			<Header />
			<main id="main">{children}</main>
			<Footer />
			<div itemScope itemType="https://schema.org/LocalBusiness">
				<meta itemProp="legalName" content="Pals of Paws Society"/>
				<meta itemProp="location" content="Hernando, MS" />
				<meta itemProp="areaServed" content="Northwest Mississippi" />
				<meta itemProp="email" content="palsofpawssociety@gmail.com" />
				<meta itemProp="logo" content="/public/images/desktop-logo.svg" />
				<meta itemProp="nonprofitStatus" content="https://schema.org/Nonprofit501c3" />
			</div>
		</>
	);
};

export default PageLayout;
