"use client";

import { useAppContext } from "@/context/AppContext";
import { useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

const UserInfo: React.FC = () => {
  const { userData, token, setUserData } = useAppContext();
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/user/change-info", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success(data.message);
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
    >
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-24 h-24">
          <Image
            src={assets.user_icon}
            alt="User Avatar"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <p className="mt-4 text-lg font-semibold text-gray-800">
          {userData?.name}
        </p>
        <p className="text-sm text-gray-500">{userData?.email}</p>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Full Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Email
          </label>
          <input
            name="email"
            value={formData.email}
            disabled
            className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 text-sm cursor-not-allowed text-gray-500"
          />
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          type="submit"
          className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg shadow transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default UserInfo;
