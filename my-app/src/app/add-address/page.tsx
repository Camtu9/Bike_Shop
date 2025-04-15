"use client";

import { assets } from "@/assets/assets";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAppContext } from "@/context/AppContext";
import { AddressData } from "@/types/address";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

export type AddressInput = Omit<AddressData, "_id" | "__v" | "userId">;
const AddAddress = () => {
  const { getToken } = useAppContext();
  const router = useRouter();

  const [address, setAddress] = useState<AddressInput>({
    fullName: "",
    phoneNumber: "",
    pincode: 0,
    area: "",
    city: "",
    state: "",
  });

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: name === "pincode" ? Number(value) : value,
    }));
  };

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/user/add-address",
        { address },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        router.push("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
      <form onSubmit={onSubmitHandler} className="w-full">
        <p className="text-2xl md:text-3xl text-gray-500">
          Add Shipping{" "}
          <span className="font-semibold text-orange-600">Address</span>
        </p>
        <div className="space-y-3 max-w-sm mt-10">
          <Input
            name="fullName"
            type="text"
            placeholder="Full name"
            onChange={onChangeHandler}
            value={address.fullName}
          />
          <Input
            name="phoneNumber"
            type="text"
            placeholder="Phone number"
            onChange={onChangeHandler}
            value={address.phoneNumber}
          />
          <Input
            name="pincode"
            type="number"
            placeholder="Pin code"
            onChange={onChangeHandler}
            value={address.pincode}
          />
          <textarea
            name="area"
            className="px-2 py-2.5 focus:border-orange-500 border border-gray-500/30 rounded outline-none w-full text-gray-500 resize-none"
            rows={4}
            placeholder="Address (Area and Street)"
            onChange={onChangeHandler}
            value={address.area}
          />
          <div className="flex space-x-3">
            <Input
              name="city"
              type="text"
              placeholder="City/District/Town"
              onChange={onChangeHandler}
              value={address.city}
            />
            <Input
              name="state"
              type="text"
              placeholder="State"
              onChange={onChangeHandler}
              value={address.state}
            />
          </div>
        </div>
        <Button type="submit" className="py-3.5 mt-4 max-w-sm!">
          Save address
        </Button>
      </form>
      <Image
        className="md:mr-16 mt-16 md:mt-0"
        src={assets.my_location_image}
        alt="my_location_image"
      />
    </div>
  );
};

export default AddAddress;
