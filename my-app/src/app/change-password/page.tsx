"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useAppContext } from "@/context/AppContext";

const ChangePasswordPage = () => {
  const { token } = useAppContext();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      const { data } = await axios.put(
        "/api/user/change-password",
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message || "Password updated successfully!");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setShowPassword({ current: false, new: false, confirm: false });
      } else {
        toast.error(data.message || "Failed to change password.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Change Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <label className="text-base font-medium text-gray-700 block mb-1">
            Current Password
          </label>
          <div className="relative">
            <Input
              type={showPassword.current ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
              placeholder="Enter your current password"
            />
            <span
              onClick={() => togglePasswordVisibility("current")}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
            >
              {showPassword.current ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="relative">
          <label className="text-base font-medium text-gray-700 block mb-1">
            New Password
          </label>
          <div className="relative">
            <Input
              type={showPassword.new ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              placeholder="Enter your new password"
            />
            <span
              onClick={() => togglePasswordVisibility("new")}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
            >
              {showPassword.new ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className="text-base font-medium text-gray-700 block mb-1">
            Confirm New Password
          </label>
          <div className="relative">
            <Input
              type={showPassword.confirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your new password"
            />
            <span
              onClick={() => togglePasswordVisibility("confirm")}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
            >
              {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="text-center pt-2">
          <Button type="submit" className="py-3.5">
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
