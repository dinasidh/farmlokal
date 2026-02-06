import { Product } from "./product.model.js";

export async function listProducts({
  filter,
  sort,
  page,
  limit,
  projection = null
}) {
  const query = Product.find(filter, projection).sort(sort).lean();

  if (page && limit) {
    const skip = (page - 1) * limit;
    query.skip(skip).limit(limit);
  } else if (limit) {
    query.limit(limit);
  }

  const [items, total] = await Promise.all([
    query.exec(),
    Product.countDocuments(filter)
  ]);

  return { items, total };
}

export async function createProduct(productData) {
  return Product.create(productData);
}

export async function getProductById(id) {
  return Product.findById(id).lean();
}

export async function updateProduct(id, updates) {
  return Product.findByIdAndUpdate(id, { $set: updates }, { new: true }).lean();
}

export async function deleteProduct(id) {
  return Product.findByIdAndDelete(id).lean();
}

