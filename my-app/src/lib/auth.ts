import jwt from "jsonwebtoken";
import connectDB from "../../config/db";
import User from "@/models/User";
import { NextRequest } from "next/server";

export const getCurrentUser = async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) throw new Error("No token provided");

  await connectDB();
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  const user = await User.findById(decoded.id).select("-password");
  if (!user) throw new Error("User not found");

  return user;
};
