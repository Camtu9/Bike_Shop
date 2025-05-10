import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../../config/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const currentUser = await getCurrentUser(request);
        const isSeller = await authSeller(currentUser.id!);
        if(!isSeller)
        {
            return NextResponse.json({success: false, message: 'Not authorized'})
        }
        await connectDB()
        const products = await Product.find({})
        return NextResponse.json({success: true, products})
    }catch(error:any){
        return NextResponse.json({success: false, message: error.message})
    }
}