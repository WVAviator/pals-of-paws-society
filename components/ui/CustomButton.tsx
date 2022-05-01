import { Button, ButtonProps } from "@mui/material";
import Link from "next/link";

interface CustomButtonProps extends ButtonProps {
	href?: string;
}

const CustomButton = ({ href, ...rest }: CustomButtonProps) => {
	const style = {
		textTransform: "capitalize",
		fontSize: "1.15rem",
	};

	const button = (
		<Button variant="contained" size="large" sx={style} {...rest} />
	);

	if (href) {
		const isInternalLink = href.startsWith("/") || href.startsWith("#");

		if (isInternalLink) {
			return (
				<Link href={href}>
					<a>{button}</a>
				</Link>
			);
		}

		return (
			<a target="_blank" rel="noopener noreferrer" href={href}>
				{button}
			</a>
		);
	}

	return button;
};
export default CustomButton;
