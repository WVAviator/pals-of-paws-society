import redis from "../redis";

const rateLimit = async (
	key: string,
	maxRequests: number,
	timeWindow: number
) => {
	const requests = await redis.incr(key);
	if (requests > maxRequests) {
		return { success: false, requests };
	}

	await redis.expire(key, timeWindow);
	return { success: true, requests };
};

export default rateLimit;
