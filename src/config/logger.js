import pino from "pino";

export function createLogger({ level }) {
  return pino({
    level,
    redact: {
      paths: [
        "req.headers.authorization",
        "req.headers.cookie",
        "req.body.password",
        "req.body.refreshToken"
      ],
      remove: true
    }
  });
}

