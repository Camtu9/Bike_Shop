import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import { inngest } from "../../../../../config/inngest";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    const { address, items } = await request.json();

    if (!address || items.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid data" });
    }

    const amount = await items.reduce(async (acc: number, item: any) => {
      const product = await Product.findById(item.product);
      return await acc + product.offerPrice * item.quantity;
    }, 0);  

    await inngest.send({
        name: 'clerk/order.created',
        data: {
            userId,
            address,
            items,
            amount: amount + Math.floor(amount*0.02),
            date: Date.now()
        }
    })

    const user = await User.findById(userId)
    user.cartItems = {}
    await user.save()
    return NextResponse.json(
      { success: true, message: "Order placed" }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
