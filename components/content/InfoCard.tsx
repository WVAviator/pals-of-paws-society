import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "../ui/ArrowIcon";
import styles from "./InfoCard.module.scss";

interface InfoCardProps {
	image: any;
	heading: string;
	description: string;
	callToAction: string;
	href: string;
	alt: string;
}

const InfoCard = ({ image, heading, description, callToAction, href, alt }: InfoCardProps) => {
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
							<ArrowIcon color="#9c84b6" width="18" height="18" />
						</div>
					</div>
				</div>
			</a>
		</Link>
	);
};

export default InfoCard;
