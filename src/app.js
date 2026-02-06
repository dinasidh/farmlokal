import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import { requestIdMiddleware } from './middlewares/requestId.js';
import { notFoundHandler, errorHandler } from './middlewares/errorHandler.js';
import { configurePassport } from './modules/auth/passport.config.js';
import { buildRouter } from './routes/index.js';

export function buildApp({ env, redis }) {
  const app = express();

  configurePassport({ env });
  app.use(passport.initialize());

  app.disable('x-powered-by');

  app.use(requestIdMiddleware);
  // Pino logger removed

  app.use(cors());
  app.use(helmet());
  app.use(compression());

  app.use(
    rateLimit({
      windowMs: 60_000,
      limit: 600,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(buildRouter({ env, redis }));

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
