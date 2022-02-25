import { CircularProgress } from "@mui/material";
import { useEffect } from "react";

const Fallback = () => {
	const fallbackStyle = {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "100vw",
		height: "100vh",
		backgroundColor: "#dbdbdb",
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div style={fallbackStyle}>
			<CircularProgress />
		</div>
	);
};
export default Fallback;
