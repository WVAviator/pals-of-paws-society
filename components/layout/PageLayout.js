import Header from "../header/Header";
import Footer from "../footer/Footer";
import DefaultHead from "./DefaultHead";
import { MDXProvider } from "@mdx-js/react";
import Link from "next/link";

const PageLayout = ({ children }) => {
	return (
		<>
			<DefaultHead />
			<Header />
			<main id="main">{children}</main>
			<Footer />
		</>
	);
};

export default PageLayout;
