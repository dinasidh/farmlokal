import express from "express";

export function buildHealthRouter({ redis }) {
  const router = express.Router();

  router.get("/healthz", (req, res) => {
    res.status(200).json({ ok: true, service: "farmlokal-backend" });
  });

  router.get("/readyz", async (req, res) => {
    let redisOk = false;
    try {
      if (redis) {
        const pong = await redis.ping();
        redisOk = pong === "PONG";
      }
    } catch {
      redisOk = false;
    }

    res.status(redisOk ? 200 : 503).json({
      ok: redisOk,
      dependencies: { redis: redisOk }
    });
  });

  return router;
}
