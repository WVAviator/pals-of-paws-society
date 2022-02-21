import { Button, ButtonProps } from "@mui/material";
import Link from "next/link";

const CustomButton = (props: ButtonProps) => {
	const style = {
		textTransform: "capitalize",
		fontSize: "1.15rem",
	};

	const button = (
		<Button variant="contained" size="large" sx={style} {...props} />
	);

	return (
		<>
			{props.href ? (
				<Link href={props.href} passHref>
					{button}
				</Link>
			) : (
				button
			)}
		</>
	);
};
export default CustomButton;
