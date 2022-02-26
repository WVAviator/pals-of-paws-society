import { CircularProgress } from "@mui/material";
import Link from "next/link";
import styles from "./ThankYouContent.module.scss";

interface ThankYouContentProps {
	confirmationDetails: {
		amount: number;
		receipt_email: string;
	};
}

const ThankYouContent = ({ confirmationDetails }: ThankYouContentProps) => {
	return (
		<div className={styles.content}>
			{confirmationDetails ? (
				<div className={styles.thankyou}>
					<h1>Thank you!</h1>

					<p>{`We greatly appreciate your $${(
						confirmationDetails.amount / 100
					).toLocaleString("en-US", {
						maximumFractionDigits: 2,
						minimumFractionDigits: 2,
					})} donation! A receipt has been sent to ${
						confirmationDetails.receipt_email
					}`}</p>

					<nav role="navigation">
						<ul>
							<li>
								<Link href="/">Return to Homepage</Link>
							</li>
							<li>
								<Link href="/adopt">View Adoptable Animals</Link>
							</li>
							<li>
								<Link href="/about">Read More About Us</Link>
							</li>
						</ul>
					</nav>
				</div>
			) : (
				<CircularProgress />
			)}
		</div>
	);
};
export default ThankYouContent;
