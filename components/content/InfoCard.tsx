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
	const id = heading.split(" ").join("-");

	return (
		<Link href={href}>
			<a aria-labelledby={`heading-${id}`} aria-describedby={`desc-${id}`}>
				<div className={styles.card}>
					<div className={styles.cardContent}>
						<div className={styles.cardImage}>
							<Image src={image} alt={alt} width={357} height={357} />
						</div>
						<h3 id={`heading-${id}`}>{heading}</h3>
						<p id={`desc-${id}`}>{description}</p>
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
