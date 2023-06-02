import React from "react";
import styles from "./Sponsors.module.scss";

interface SponsorsProps {
	children: React.ReactNode;
}

const Sponsors: React.FC<SponsorsProps> = ({ children }) => {
	return (
		<div className={styles.outer}>
			<h2>Proud partners of</h2>
			<div className={styles.container}>{children}</div>
		</div>
	);
};

export default Sponsors;
