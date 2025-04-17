// import { NextRequest, NextResponse } from "next/server";
// import connectDB from "../../../../../config/db";
// import Product from "@/models/Product";

// export async function GET(req: NextRequest) {
//   try {
//     await connectDB();

//     const searchParams = req.nextUrl.searchParams;
//     const name = searchParams.get("name");

//     if (!name) {
//       return NextResponse.json({ success: false, message: "Name is required" });
//     }
//     const products = await Product.find({
//       name: { $regex: name, $options: "i" },
//     });

//     return NextResponse.json({ success: true, products });
//   } catch (error: any) {
//     return NextResponse.json({ success: false, message: error.message });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../../config/db";
import Product from "@/models/Product";
import { ProductData } from "@/types/product";

function removeVietnameseTones(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json({ success: false, message: "Name is required" });
    }

    const allProducts = await Product.find();

    const normalizedSearch = removeVietnameseTones(name.toLowerCase());

    const filteredProducts = allProducts.filter((product: ProductData) => {
      const normalizedProductName = removeVietnameseTones(product.name.toLowerCase());
      return normalizedProductName.includes(normalizedSearch);
    });

    return NextResponse.json({ success: true, products: filteredProducts });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
