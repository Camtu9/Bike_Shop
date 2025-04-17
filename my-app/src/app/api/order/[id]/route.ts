import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import connectDB from "../../../../../config/db";
import Order from "@/models/Order";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { userId } = getAuth(request);

    const pathname = request.nextUrl.pathname;
    const orderId = pathname.split("/").pop();

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Order ID is missing" },
        { status: 400 }
      );
    }

    const order = await Order.findOne({ _id: orderId, userId }).populate(
      "items.product address"
    );

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
