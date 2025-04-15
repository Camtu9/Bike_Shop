import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import connectDB from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try {
        const {userId} = getAuth(request)
        await connectDB()
        const user = await User.findById(userId);
        if(!user){
            return NextResponse.json({success: false, message: "Use not found"})
        }
        return NextResponse.json({success: true, user})
    }catch(error: any){
        return NextResponse.json({success: false, message: error.message })
    }
}