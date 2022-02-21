import { Button, ButtonProps } from "@mui/material";

const CustomButton = (props: ButtonProps) => {
	const style = {
		textTransform: "capitalize",
		fontSize: "1.15rem",
	};

	return <Button variant="contained" size="large" sx={style} {...props} />;
};
export default CustomButton;
