import express from "express";
import passport from "passport";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { issueTokens } from "./auth.service.js";
import {
  meController,
  createJwtAuthMiddleware,
  createRefreshController
} from "./auth.controller.js";

export function buildAuthRouter(deps) {
  const router = express.Router();
  const { env } = deps;

  router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  router.get(
    "/google/callback",
    (req, res, next) => {
      passport.authenticate(
        "google",
        { session: false },
        (err, user) => {
          if (err) return next(err);
          if (!user) {
            return res.status(401).json({ error: "authentication_failed" });
          }

          const { accessToken } = issueTokens({
            user,
            jwtConfig: env.jwt
          });

          res.json({
            token: accessToken
          });
        }
      )(req, res, next);
    }
  );

  router.get("/me", createJwtAuthMiddleware(env.jwt), meController);
  router.post(
    "/refresh",
    asyncHandler(createRefreshController(env.jwt))
  );



  return router;
}
