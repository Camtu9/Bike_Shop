import connectDB from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import Address from "@/models/Address";

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    await connectDB();
    const addresses = await Address.find({userId});
    return NextResponse.json({ success: true, addresses });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
