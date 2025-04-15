import { getAuth } from "@clerk/nextjs/server";
import connectDB from "../../../../../config/db"
import { NextRequest, NextResponse } from "next/server";
import Address from "@/models/Address";
import Product from "@/models/Product";
import Order from "@/models/Order";
import authSeller from "@/lib/authSeller";

export async function GET(request: NextRequest) {
    try {
        const {userId} = getAuth(request)
        const isSeller = await authSeller(userId!);
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