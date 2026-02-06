import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    name: { type: String, default: "" },
    picture: { type: String, default: "" }
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 });

export const User = mongoose.model("User", UserSchema);
