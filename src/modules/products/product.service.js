import {
  listProducts,
  updateProduct,
  createProduct,
  getProductById,
  deleteProduct
} from "./product.repo.js";


function buildProductFilter({
  q,
  category,
  inStock,
  minPriceCents,
  maxPriceCents
}) {
  const filter = {};

  if (category) filter.category = category;
  if (typeof inStock === "boolean") filter.inStock = inStock;

  if (minPriceCents !== undefined || maxPriceCents !== undefined) {
    filter.priceCents = {};
    if (minPriceCents !== undefined) filter.priceCents.$gte = minPriceCents;
    if (maxPriceCents !== undefined) filter.priceCents.$lte = maxPriceCents;
  }

  if (q) {
    filter.$text = { $search: q };
  }

  return filter;
}

function buildSort({ sort, q }) {
  if (sort === "relevance" && q) return { score: { $meta: "textScore" } };
  if (sort === "price_asc") return { priceCents: 1, _id: 1 };
  if (sort === "price_desc") return { priceCents: -1, _id: 1 };
  return { createdAt: -1, _id: -1 };
}

export async function listProductsService(params) {
  const filter = buildProductFilter(params);
  const sort = buildSort(params);

  const projection =
    params.sort === "relevance" && params.q
      ? { score: { $meta: "textScore" } }
      : null;

  return listProducts({
    filter,
    sort,
    page: params.page,
    limit: params.limit,
    projection
  });
}

export async function createProductService(data) {
  return createProduct(data);
}

export async function getProductByIdService(id) {
  const product = await getProductById(id);
  if (!product) {
    throw { statusCode: 404, message: "Product not found" };
  }
  return product;
}

export async function updateProductService(id, updates) {
  const updated = await updateProduct(id, updates);
  if (!updated) {
    throw { statusCode: 404, message: "Product not found" };
  }
  return updated;
}

export async function deleteProductService(id) {
  const deleted = await deleteProduct(id);
  if (!deleted) {
    throw { statusCode: 404, message: "Product not found" };
  }
  return { message: "Product deleted successfully" };
}

