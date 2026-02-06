import express from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { validate } from "../../middlewares/validate.js";
import {
  listProductsQuerySchema,
  createProductBodySchema,
  updateProductBodySchema,
  productIdParamSchema
} from "./product.schemas.js";
import {
  listProductsController,
  createProductController,
  getProductByIdController,
  updateProductController,
  deleteProductController
} from "./products.controller.js";
import { createJwtAuthMiddleware } from "../auth/auth.controller.js";

export function buildProductsRouter(deps) {
  const router = express.Router();

  router.get(
    "/",
    validate(listProductsQuerySchema, "query"),
    asyncHandler(listProductsController)
  );

  router.post(
    "/",
    createJwtAuthMiddleware(deps.env.jwt),
    validate(createProductBodySchema, "body"),
    asyncHandler(createProductController)
  );

  router.get(
    "/:id",
    validate(productIdParamSchema, "params"),
    asyncHandler(getProductByIdController)
  );

  router.patch(
    "/:id",
    createJwtAuthMiddleware(deps.env.jwt),
    validate(productIdParamSchema, "params"),
    validate(updateProductBodySchema, "body"),
    asyncHandler(updateProductController)
  );

  router.delete(
    "/:id",
    createJwtAuthMiddleware(deps.env.jwt),
    validate(productIdParamSchema, "params"),
    asyncHandler(deleteProductController)
  );

  return router;
}

