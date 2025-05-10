import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: NextRequest){
    try {
        const user = await getCurrentUser(request);
        return NextResponse.json({success: true, user})
    }catch(error: any){
        return NextResponse.json({success: false, message: error.message })
    }
}