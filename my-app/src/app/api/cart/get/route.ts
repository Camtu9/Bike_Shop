import User from "@/models/User";
import connectDB from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    await connectDB();
    const user = await User.findById(userId);
    const { cartItems } = user;
    return NextResponse.json({ success: true, cartItems });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
