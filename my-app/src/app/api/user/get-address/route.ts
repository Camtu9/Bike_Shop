import connectDB from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";

import Address from "@/models/Address";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {

    await connectDB();
    const user = await getCurrentUser(request)
    const addresses = await Address.find({userId: user._id});
    return NextResponse.json({ success: true, addresses });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
