import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import { inngest } from "../../../../../config/inngest";
import User from "@/models/User";
import Order from "@/models/Order";
import connectDB from "../../../../../config/db";

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    const { address, items } = await request.json();

    await connectDB();
    if (!address || items.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid data" });
    }

    const amountArray = await Promise.all(
      items.map(async (item: any) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error("Product not found");
        }

        if (product.stock < item.quantity) {
          throw new Error(`Not enough stock for product ${product.title}`);
        }

        product.stock -= item.quantity;
        await product.save();

        return product.offerPrice * item.quantity;
      })
    );

    const amount = amountArray.reduce((acc, val) => acc + val, 0);
    const newOrder = await Order.create({
      userId,
      address,
      items,
      amount: amount + 50000,
      status: "Order placed",
      date: Date.now(),
    });
    await inngest.send({
      name: "clerk/order.created",
      data: {
        userId,
        address,
        items,
        amount: amount + 50000,
        date: Date.now(),
      },
    });

    const user = await User.findById(userId);
    user.cartItems = {};
    await user.save();
    
    return NextResponse.json({ success: true, message: "Order placed", order: newOrder });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
