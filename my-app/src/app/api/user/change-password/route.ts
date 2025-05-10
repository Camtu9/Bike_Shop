import connectDB from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const currentUser = await getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const body = await request.json();
    const { currentPassword, newPassword, confirmPassword } = body;

    const user = await User.findById(currentUser.id).select("password");
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({
        success: false,
        message: "The current password is not correct",
      });
    }
    if (currentPassword === newPassword) {
      return NextResponse.json({
        success: false,
        message: "New password must be different from current password",
      });
    }
    if (newPassword !== confirmPassword) {
      return NextResponse.json({
        success: false,
        message: "The new password and confirm password do not match",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(
      currentUser.id,
      { password: hashedPassword },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      message: "Password changed successfully!",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
