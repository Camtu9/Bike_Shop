import { getAuth } from "@clerk/nextjs/server";
import connectDB from "../../../../../config/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest){
    try{
        const {userId} = getAuth(request);
        const {cartData} = await request.json()
        await connectDB()
        const user = await User.findById(userId)
        user.cartItems = cartData
        await user.save()
        return NextResponse.json({success: true});
    }catch(error:any) {
        return NextResponse.json({success: false, message: error.message});
    }
}