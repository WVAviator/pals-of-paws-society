import React from "react";
import styles from "./Candid.module.scss";
import logo from "../../../public/images/profile-GOLD2024-seal.svg";
import Image from "next/image";

const Candid = () => {
	return (
		<div className={styles.container}>
			<Image src={logo} alt="Candid gold" />
		</div>
	);
};

export default Candid;
