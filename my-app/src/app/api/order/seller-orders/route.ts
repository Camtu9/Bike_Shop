import connectDB from "../../../../../config/db"
import { NextRequest, NextResponse } from "next/server";
import Address from "@/models/Address";
import Order from "@/models/Order";
import authSeller from "@/lib/authSeller";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const currentUser = await getCurrentUser(request);
        const isSeller = await authSeller(currentUser.id!);
        if(!isSeller)
        {
            return NextResponse.json({success: false, message: 'Not authorized'})
        }
        await connectDB();
        Address.length
        const orders = await Order.find({}).populate('Address items.product')
        return NextResponse.json({success: true, orders})
    }catch(error:any )
    {
        return NextResponse.json({success: false, message:error.message})
    }
}