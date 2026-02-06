import mongoose from "mongoose";
import { loadEnv } from "../src/config/env.js";
import { connectMongo } from "../src/config/db/mongo.js";
import { User } from "../src/modules/auth/user.model.js";
import { Product } from "../src/modules/products/product.model.js";

/* -------------------- CONFIG -------------------- */

const PRODUCT_COUNT = 500;

const CATEGORIES = [
    { key: "vegetables", basePrice: 1200 },
    { key: "fruits", basePrice: 2000 },
    { key: "grains", basePrice: 7000 },
    { key: "dairy", basePrice: 3500 }
];

/* -------------------- PRODUCT GENERATOR -------------------- */

function generateProducts(count) {
    const products = [];

    for (let i = 1; i <= count; i++) {
        const category = CATEGORIES[i % CATEGORIES.length];

        products.push({
            sku: `${category.key.toUpperCase()}-${String(i).padStart(4, "0")}`,
            name: `${category.key} product ${i}`,
            description: `High quality ${category.key} item number ${i}`,
            priceCents: category.basePrice + (i % 10) * 250,
            category: category.key,
            inStock: i % 5 !== 0
        });
    }

    return products;
}

/* -------------------- SEED FUNCTION -------------------- */

async function seed() {
    try {
        const env = loadEnv();
        await connectMongo({ mongoUri: env.mongoUri });

        console.log("Seeding started...");

        // Seed User (only once)
        const userCount = await User.countDocuments();
        if (userCount === 0) {
            await User.create({
                googleId: "seed-user-1",
                email: "test@example.com",
                name: "Test User",
                picture: ""
            });
            console.log("Seeded basic user.");
        }

        // Seed Products
        const products = generateProducts(PRODUCT_COUNT);

        await Product.deleteMany({});
        await Product.insertMany(products);

        console.log(`Seeded ${products.length} products.`);
        console.log("Seeding complete.");

        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
}

/* -------------------- RUN -------------------- */

seed();
