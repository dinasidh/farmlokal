import { z } from "zod";

export const listProductsQuerySchema = z.object({
  q: z.string().trim().min(1).max(100).optional(),
  category: z.string().trim().min(1).max(64).optional(),
  inStock: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
  minPriceCents: z.coerce.number().int().min(0).optional(),
  maxPriceCents: z.coerce.number().int().min(0).optional(),
  sort: z
    .enum(["relevance", "price_asc", "price_desc", "newest"])
    .default("newest"),
  page: z.coerce.number().int().min(1).max(10_000).optional(),
  limit: z.coerce.number().int().min(1).max(10_000).optional()
});

export const productIdParamSchema = z.object({
  id: z.string().trim().min(24)
});

export const createProductBodySchema = z.object({
  sku: z.string().trim().min(3).max(50),
  name: z.string().trim().min(1).max(200),
  description: z.string().trim().max(2000).optional(),
  priceCents: z.number().int().min(0),
  category: z.string().trim().min(1).max(64),
  inStock: z.boolean().default(true),
  tags: z.array(z.string().trim()).max(20).optional(),
  farm: z
    .object({
      name: z.string().trim().optional(),
      location: z
        .object({
          lat: z.number().min(-90).max(90),
          lon: z.number().min(-180).max(180)
        })
        .optional()
    })
    .optional()
});

export const updateProductBodySchema = z.object({
  name: z.string().trim().min(1).max(200).optional(),
  description: z.string().trim().max(2000).optional(),
  priceCents: z.number().int().min(0).optional(),
  category: z.string().trim().min(1).max(64).optional(),
  inStock: z.boolean().optional(),
  tags: z.array(z.string().trim()).max(20).optional(),
  farm: z
    .object({
      name: z.string().trim().optional(),
      location: z
        .object({
          lat: z.number().min(-90).max(90),
          lon: z.number().min(-180).max(180)
        })
        .optional()
    })
    .optional()
});
