import jwt from "jsonwebtoken";
import connectDB from "../../config/db";
import User from "@/models/User";

const authSeller = async (token: string): Promise<boolean> => {
  try {
    if (!token) {
      return false;
    }
    await connectDB();

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    const user = await User.findById(decoded.id);
    return user?.role === "admin";
  } catch (error: any) {
    console.error("authSeller error:", error.message);
    return false;
  }
};

export default authSeller;
