import Header from "../header/Header";
import Footer from "../footer/Footer";
import DefaultHead from "./DefaultHead";

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
		</>
	);
};

export default PageLayout;
