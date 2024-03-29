import React from "react";
import styles from "./Petco.module.scss";
import PetcoSVG from "./PetcoSVG";

const Petco = () => {
	return (
		<div className={styles.container}>
			<div className={styles.svg}>
				<PetcoSVG />
			</div>
		</div>
	);
};

export default Petco;
