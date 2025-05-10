import connectDB from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import User from "@/models/User";

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const { name } = body;

    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      { name },
      { new: true }
    );

    return NextResponse.json({ success: true, message: 'Updated successfully!',userData: updatedUser });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
