import { useEffect } from "react";
import { useRouter } from "next/router";

type ScrollPosition = {
	x: number;
	y: number;
};

const SCROLL_POSITION_KEY = "SCROLL_POSITION";
const SCROLL_POSITION_EXPIRATION = 1000 * 60 * 10; // 10 minutes

const useScrollMemory = () => {
	const router = useRouter();
	const { pathname } = router;

	useEffect(() => {
		const scrollKey = `${SCROLL_POSITION_KEY}_${pathname}`;

		const scrollPosition = localStorage.getItem(scrollKey);
		if (scrollPosition) {
			const { position, expiry } = JSON.parse(scrollPosition);
			if (expiry > new Date().getTime()) {
				window.scrollTo(position.x, position.y);
			}
		}

		const handleScroll = () => {
			const position: ScrollPosition = {
				x: window.scrollX,
				y: window.scrollY,
			};
			const scrollData = {
				position,
				expiry: new Date().getTime() + SCROLL_POSITION_EXPIRATION,
			};

			localStorage.setItem(scrollKey, JSON.stringify(scrollData));
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [pathname]);
};

export default useScrollMemory;
