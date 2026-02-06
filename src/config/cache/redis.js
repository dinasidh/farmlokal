import Redis from "ioredis";

export function createRedisClient({ redisUrl }) {
    const client = new Redis(redisUrl, {
        maxRetriesPerRequest: 2,
        enableReadyCheck: true,
        lazyConnect: false
    });

    client.on("connect", () => console.log("Redis connecting"));
    client.on("ready", () => console.log("Redis ready"));
    client.on("error", (err) => console.error("Redis error", err));
    client.on("close", () => console.warn("Redis connection closed"));

    return client;
}
