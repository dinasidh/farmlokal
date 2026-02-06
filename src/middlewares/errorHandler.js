export function notFoundHandler(req, res) {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "Route not found"
    }
  });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const logger = req.logger || console;

  const statusCode =
    typeof err.statusCode === "number" && err.statusCode >= 400
      ? err.statusCode
      : 500;

  const code =
    typeof err.code === "string" && err.code.length <= 64
      ? err.code
      : statusCode === 500
        ? "INTERNAL"
        : "BAD_REQUEST";

  const message =
    statusCode === 500 ? "Unexpected error" : err.message || "Request failed";

  console.error("Request failed", {
    err,
    requestId: req.requestId,
    path: req.path,
    method: req.method
  });

  res.status(statusCode).json({
    error: {
      code,
      message,
      requestId: req.requestId,
      details: err.details
    }
  });
}

