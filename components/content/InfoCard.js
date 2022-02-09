import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "../ui/ArrowIcon";
import styles from "./InfoCard.module.scss";

const InfoCard = ({ image, heading, description, callToAction }) => {
	return (
		<Link href="#">
			<div>
				<div>
					<Image src={image} />
					<h2>{heading}</h2>
					<p>{description}</p>
					<div>
						<span>{callToAction}</span>
						<ArrowIcon />
					</div>
				</div>
			</div>
		</Link>
	);
};

export default InfoCard;
