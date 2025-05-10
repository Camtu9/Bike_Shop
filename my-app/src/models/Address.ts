import { AddressData } from "@/types/address";
import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema<AddressData>(
    {
      userId: { type: String, required: true },
      fullName: { type: String, required: true},
      phoneNumber: { type: String, required: true},
      area: {type: String, required: true},
      city: {type: String, required: true},
      state: {type: String, required: true},
    },
  );
  
const Address = mongoose.models.address || mongoose.model('address', addressSchema);  
export default Address;