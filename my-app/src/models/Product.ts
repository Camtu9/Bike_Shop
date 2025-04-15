import { ProductData } from "@/types/product";
import mongoose, { Schema } from "mongoose";

const productSchema = new Schema<ProductData>(
    {
      name: { type: String, required: true },
      price: { type: Number, required: true},
      offerPrice: { type: Number, required: true},
      description: { type: String, required: true },
      image: {type: [String], required: true},
      category: { type: String, required: true },
      brand: { type: String, required: true },
      stock: { type: Number, required: true},
    },
  );
  
const Product = mongoose.models.product || mongoose.model('product', productSchema);  
export default Product;