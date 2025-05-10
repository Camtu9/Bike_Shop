import connectDB from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import Address from "@/models/Address";
import Product from "@/models/Product";
import Order from "@/models/Order";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser(request);
    await connectDB();
    Address.length;
    Product.length;
    const orders = await Order.find({ userId: currentUser.id }).populate(
      "address items.product"
    );

    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
