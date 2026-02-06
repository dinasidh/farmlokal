import express from "express";
import { buildHealthRouter } from "./health.routes.js";
import { buildAuthRouter } from "../modules/auth/auth.routes.js";
import { buildProductsRouter } from "../modules/products/products.routes.js";

export function buildRouter(deps) {
  const router = express.Router();

  router.use(buildHealthRouter(deps));

  router.get("/", (req, res) => {
    res.json({ message: "Server API is running" });
  });

  router.use("/v1/auth", buildAuthRouter(deps));
  router.use("/v1/products", buildProductsRouter(deps));

  return router;
}

