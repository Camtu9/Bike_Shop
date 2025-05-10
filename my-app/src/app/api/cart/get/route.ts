import User from "@/models/User";
import connectDB from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser(request);
    await connectDB();
    const user = await User.findById(currentUser?.id);
    const { cartItems } = user;
    return NextResponse.json({ success: true, cartItems });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
