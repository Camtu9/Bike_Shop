
import { OrderData } from "@/types/order";
import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema<OrderData>(
    {
      userId: { type: String, required: true, ref: 'user'},
      items: [{
        product: {type:String, required: true, ref: 'product'},
        quantity: {type: Number, required: true}
      }],
      amount: {type: Number, required: true}, 
      address: {type: String, ref: 'address', required: true},
      status: {type: String, required: true, default: 'Order placed'},
      date: {type: Number, required: true}
    },
  );
  
const Order = mongoose.models.order || mongoose.model('order', orderSchema);  
export default Order;