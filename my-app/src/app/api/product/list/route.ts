import Product from "@/models/Product";;
import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../../config/db";

export async function GET(request: NextRequest) {
    try {
        await connectDB()
        const products = await Product.find({})
        return NextResponse.json({success: true, products})
    }catch(error:any){
        return NextResponse.json({success: false, message: error.message})
    }
}