import jwt from "jsonwebtoken";

export function issueTokens({ user, jwtConfig }) {
  const payload = {
    sub: user._id.toString(),
    email: user.email
  };

  const accessToken = jwt.sign(
    { ...payload, type: "access" },
    jwtConfig.secret,
    {
      issuer: jwtConfig.issuer,
      audience: jwtConfig.audience,
      expiresIn: jwtConfig.accessTtlSeconds
    }
  );

  const refreshToken = jwt.sign(
    { ...payload, type: "refresh" },
    jwtConfig.secret,
    {
      issuer: jwtConfig.issuer,
      audience: jwtConfig.audience,
      expiresIn: jwtConfig.refreshTtlSeconds
    }
  );

  return { accessToken, refreshToken };
}

export function verifyAccessToken(token, jwtConfig) {
  return jwt.verify(token, jwtConfig.secret, {
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience
  });
}

export function verifyRefreshToken(token, jwtConfig) {
  const payload = jwt.verify(token, jwtConfig.secret, {
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience
  });
  if (payload.type !== "refresh") {
    throw new Error("Invalid token type");
  }
  return payload;
}
