import redis from "../redis";

const rateLimit = async (
	key: string,
	maxRequests: number,
	timeWindow: number
) => {
	try {
		const requests = await redis.incr(key);
		if (requests > maxRequests) {
			return { success: false, requests };
		}

		await redis.expire(key, timeWindow);
		return { success: true, requests };
	} catch {
		return { success: false, requests: 0 };
	}
};

export default rateLimit;
