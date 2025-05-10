import connectDB from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";

import Address from "@/models/Address";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    const { address } = await request.json();
    await connectDB();
    const newAddress = await Address.create({ ...address, userId: user._id });
    return NextResponse.json(
      { success: true, message: "Address added successfully" },
      newAddress
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
