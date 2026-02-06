import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, index: true },
    description: { type: String, default: "" },
    category: { type: String, required: true, index: true },
    priceCents: { type: Number, required: true, index: true, min: 0 },
    currency: { type: String, required: true, default: "INR" },
    inStock: { type: Boolean, required: true, default: true, index: true },
    tags: { type: [String], default: [] },
    farm: {
      name: { type: String, default: "" },
      location: {
        lat: { type: Number, default: 0 },
        lon: { type: Number, default: 0 }
      }
    }
  },
  { timestamps: true }
);

// Common high-traffic query patterns
ProductSchema.index({ category: 1, priceCents: 1 });
ProductSchema.index({ inStock: 1, category: 1 });
ProductSchema.index({ name: "text", description: "text", tags: "text" });

export const Product = mongoose.model("Product", ProductSchema);

