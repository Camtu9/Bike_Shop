import authSeller from "@/lib/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../../config/db";
import Product from "@/models/Product";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    const isSeller = await authSeller(userId!);
    if (!isSeller) {
      return NextResponse.json({ success: false, message: "Not authorized" });
    }
    const formData = await request.formData();
    const name = formData.get("name");
    const price = formData.get("price");
    const offerPrice = formData.get("offerPrice");
    const description = formData.get("description");
    const files = formData.getAll("image") as File[];
    const category = formData.get("category");
    const brand = formData.get("brand");
    const stock = formData.get("stock");
    if (!files || files.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No files uploaded",
      });
    }
    const result = await Promise.all(
      files.map(async (files) => {
        const arrayBuffer = await files.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });
      })
    );
    const image = result.map((result) => result.secure_url);

    await connectDB();

    const newProduct = await Product.create({
      name: name,
      price: Number(price),
      offerPrice: Number(offerPrice),
      description,
      image,
      category,
      brand,
      stock: Number(stock),
    });
    return NextResponse.json(
      { success: true, message: "Upload successful" },
      newProduct
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
