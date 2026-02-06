import mongoose from "mongoose";

export async function connectMongo({ mongoUri }) {
  mongoose.set("strictQuery", true);

  await mongoose.connect(mongoUri, {
    autoIndex: true
  });

  console.log(`MongoDB connected to ${sanitizeMongoUri(mongoUri)}`);
}

function sanitizeMongoUri(uri) {
  try {
    const u = new URL(uri);
    if (u.password) u.password = "***";
    return u.toString();
  } catch {
    return "mongodb://***";
  }
}

