import {
  listProductsService,
  createProductService,
  getProductByIdService,
  updateProductService,
  deleteProductService
} from "./product.service.js";

export async function listProductsController(req, res) {
  const { items, total } = await listProductsService(req.query);

  const page = req.query.page || 1;
  const limit = req.query.limit || items.length;

  res.status(200).json({
    meta: {
      page,
      limit,
      total,
      hasMore: limit ? page * limit < total : false
    },
    data: items,
  });
}

export async function createProductController(req, res) {
  const product = await createProductService(req.body);
  res.status(201).json(product);
}

export async function getProductByIdController(req, res) {
  const product = await getProductByIdService(req.params.id);
  res.status(200).json(product);
}

export async function updateProductController(req, res) {
  const updated = await updateProductService(req.params.id, req.body);
  res.status(200).json(updated);
}

export async function deleteProductController(req, res) {
  const result = await deleteProductService(req.params.id);
  res.status(204).send();
}

