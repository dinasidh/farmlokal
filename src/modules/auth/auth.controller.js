import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { User } from "./user.model.js";
import { issueTokens, verifyAccessToken, verifyRefreshToken } from "./auth.service.js";

export function meController(req, res) {
  res.json({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    picture: req.user.picture
  });
}

export function createRefreshController(jwtConfig) {
  return async (req, res) => {
    const refreshToken = req.body?.refresh_token ?? req.body?.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ error: "Missing refresh_token" });
    }

    try {
      const payload = verifyRefreshToken(refreshToken, jwtConfig);
      const user = await User.findById(payload.sub);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      const tokens = issueTokens({ user, jwtConfig });
      res.json({
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
        expires_in: jwtConfig.accessTtlSeconds
      });
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired refresh token" });
    }
  };
}

export function createJwtAuthMiddleware(jwtConfig) {
  return asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid Authorization header" });
    }

    const token = authHeader.slice(7);
    try {
      const payload = verifyAccessToken(token, jwtConfig);
      if (payload.type !== "access") {
        return res.status(401).json({ error: "Invalid token type" });
      }

      const user = await User.findById(payload.sub);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  });
}
