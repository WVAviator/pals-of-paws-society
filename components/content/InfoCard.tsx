import Image from "next/image";
import Link from "next/link";
import styles from "./InfoCard.module.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface InfoCardProps {
	image: any;
	heading: string;
	description: string;
	callToAction: string;
	href: string;
	alt: string;
}

const InfoCard = ({
	image,
	heading,
	description,
	callToAction,
	href,
	alt,
}: InfoCardProps) => {
	return (
		<Link href={href}>
			<a>
				<div className={styles.card}>
					<div className={styles.cardContent}>
						<div className={styles.cardImage}>
							<Image src={image} alt={alt} width={357} height={357} />
						</div>
						<h2>{heading}</h2>
						<p>{description}</p>
						<div className={styles.cardAction}>
							<span>{callToAction}</span>
							<ArrowForwardIcon />
						</div>
					</div>
				</div>
			</a>
		</Link>
	);
};

export default InfoCard;
