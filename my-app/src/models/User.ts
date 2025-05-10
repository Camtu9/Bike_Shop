import { UserData } from "@/types/user";
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema<UserData>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartItems: { type: Object, default: {} },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  }
);

const User = mongoose.models.user || mongoose.model("user", UserSchema);
export default User;
