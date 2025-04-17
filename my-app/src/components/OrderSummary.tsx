"use client";

import { useAppContext } from "@/context/AppContext";
import { AddressData } from "@/types/address";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useClerk } from "@clerk/nextjs";

const OrderSummary: React.FC = () => {
  const {
    formatCurrency,
    getCartCount,
    getCartAmount,
    getToken,
    cartItems,
    setCartItems,
    user,
  } = useAppContext();
  const router = useRouter();
  const { openSignIn } = useClerk();

  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(
    null
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState<AddressData[]>([]);

  const fetchUserAddresses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user/get-address", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleAddressSelect = (address: AddressData) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
    try {
      if (!user) {
        openSignIn();
        return toast.error("You must be logged in to place an order");
      }
      if (!selectedAddress) {
        return toast.error("Please select an address");
      }
      let cartItemsArray = Object.keys(cartItems).map((key) => {
        return {
          product: key,
          quantity: cartItems[key],
        };
      });
      cartItemsArray = cartItemsArray.filter((item) => item.quantity > 0);
      if (cartItemsArray.length === 0) {
        return toast.error("Cart is empty");
      }

      const token = await getToken();
      const { data } = await axios.post(
        "/api/order/create",
        { address: selectedAddress._id, items: cartItemsArray },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        setCartItems({});
        router.push("/order-placed");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserAddresses();
    }
  }, [user]);

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">
        Order Summary
      </h2>
      <hr className="border-gray-500/30 my-5" />

      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Select Address
          </label>
          <div className="relative inline-block w-full text-sm border">
            <button
              className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>
              <svg
                className={`w-5 h-5 inline float-right transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-0" : "-rotate-90"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6B7280"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5">
                {userAddresses.map((address) => (
                  <li
                    key={address._id}
                    className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.area}, {address.city},{" "}
                    {address.state}
                  </li>
                ))}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-center"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Promo Code
          </label>
          <div className="flex flex-col items-start gap-3">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-grow w-full outline-none p-2.5 text-gray-600 border"
            />
            <Button variant="primary" className="py-3.5">
              Apply
            </Button>
          </div>
        </div>
        <hr className="border-gray-500/30 my-5" />

        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">Items {getCartCount()}</p>
            <p className="text-gray-800">{formatCurrency(getCartAmount())}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-gray-800">{formatCurrency(50000)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Tax (0%)</p>
            <p className="font-medium text-gray-800">0</p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>Total</p>
            <p>{formatCurrency(getCartAmount() + 50000)}</p>
          </div>
        </div>
      </div>

      <Button variant="primary" onClick={createOrder} className="py-3.5">
        Place Order
      </Button>
    </div>
  );
};

export default OrderSummary;
