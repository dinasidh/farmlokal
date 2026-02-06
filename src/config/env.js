import 'dotenv/config';
import { cleanEnv, str, port, url, bool, num } from 'envalid';

export function loadEnv() {
  const env = cleanEnv(process.env, {
    // App
    // App
    NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
    PORT: port({ default: 3000 }),

    // URLs
    PUBLIC_BASE_URL: url(),
    OAUTH_SUCCESS_REDIRECT: url({ default: 'http://localhost:5173' }),

    // Database
    MONGODB_URI: str(),

    // Cache
    REDIS_URL: str(),

    // OAuth
    GOOGLE_CLIENT_ID: str(),
    GOOGLE_CLIENT_SECRET: str(),

    // JWT
    JWT_ISSUER: str({ default: 'farmlokal' }),
    JWT_AUDIENCE: str({ default: 'farmlokal-api' }),
    JWT_ACCESS_TTL_SECONDS: num({ default: 900 }),
    JWT_REFRESH_TTL_SECONDS: num({ default: 60 * 60 * 24 * 7 }),
    JWT_SECRET: str(),

    // Cookies
    COOKIE_DOMAIN: str({ default: '' }),
    SECURE_COOKIES: bool({ default: false }),
  });

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    // logLevel removed

    publicBaseUrl: env.PUBLIC_BASE_URL,
    oauthSuccessRedirect: env.OAUTH_SUCCESS_REDIRECT,

    mongoUri: env.MONGODB_URI,
    redisUrl: env.REDIS_URL,

    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },

    jwt: {
      issuer: env.JWT_ISSUER,
      audience: env.JWT_AUDIENCE,
      accessTtlSeconds: env.JWT_ACCESS_TTL_SECONDS,
      refreshTtlSeconds: env.JWT_REFRESH_TTL_SECONDS,
      secret: env.JWT_SECRET,
    },

    cookies: {
      domain: env.COOKIE_DOMAIN || undefined,
      secure: env.SECURE_COOKIES,
    },
  };
}
