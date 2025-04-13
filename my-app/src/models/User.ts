import { UserData } from "@/types/user";
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema<UserData>(
    {
      id: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      imageUrl: {type: String, required: true},
      cartItems: {type: Object, default: {}}
    },
    { minimize: false }
  );
  
const User = mongoose.models.user || mongoose.model('user', UserSchema);  
export default User;