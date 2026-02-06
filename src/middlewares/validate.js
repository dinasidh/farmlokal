export function validate(schema, where = "query") {
  return (req, _res, next) => {
    const parsed = schema.safeParse(req[where]);
    if (!parsed.success) {
      const err = new Error("Validation failed");
      err.statusCode = 400;
      err.code = "VALIDATION_ERROR";
      err.details = parsed.error.flatten();
      return next(err);
    }
    req[where] = parsed.data;
    next();
  };
}

