import Header from "../header/Header";
import Footer from "./Footer";
import DefaultHead from "./DefaultHead";

const PageLayout = ({ children }) => {
	return (
		<>
			<DefaultHead />
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
};

export default PageLayout;
