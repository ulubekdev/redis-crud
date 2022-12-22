import redis from "redis";

let redisClient;    

(async () => {
	redisClient = redis.createClient(process.env.REDIS_PORT, process.env.HOST);

	redisClient.on("error", (error) => console.error(`${error}`));

	await redisClient.connect();
})();


export default redisClient;