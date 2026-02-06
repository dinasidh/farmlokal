import 'dotenv/config';
import http from 'http';

import { loadEnv } from './config/env.js';
import { connectMongo } from './config/db/mongo.js';
import { createRedisClient } from './config/cache/redis.js';
import { buildApp } from './app.js';

async function main() {
  const env = loadEnv();
  // Logger removed, using console where needed

  const redis = createRedisClient({ redisUrl: env.redisUrl });
  await connectMongo({ mongoUri: env.mongoUri });

  const app = buildApp({ env, redis });
  const server = http.createServer(app);

  server.keepAliveTimeout = 70_000;
  server.headersTimeout = 75_000;

  server.listen(env.port, () => {
    console.log(`HTTP server listening on port ${env.port} in ${env.nodeEnv} mode`);
  });

  const shutdown = async (signal) => {
    console.warn(`Shutting down received signal: ${signal}`);

    server.close(async () => {
      try {
        await redis.quit();
      } catch (err) {
        console.warn('Redis quit failed', err);
      }
      process.exit(0);
    });

    setTimeout(() => process.exit(1), 10_000).unref();
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
