import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import User from "@/models/User";
import Order from "@/models/Order";
import connectDB from "../../../../../config/db";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser(request);
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
      userId: currentUser.id,
      address,
      items,
      amount: amount + 50000,
      status: "Order placed",
      date: Date.now(),
    });

    const user = await User.findById(currentUser.id);
    user.cartItems = {};
    await user.save();
    
    return NextResponse.json({ success: true, message: "Order placed", order: newOrder });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
