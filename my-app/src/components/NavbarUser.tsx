"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  AboutUsIcon,
  assets,
  BagIcon,
  CartIcon,
  ShopIcon,
} from "@/assets/assets";
import { FaSignOutAlt } from "react-icons/fa";

const NavbarUser: React.FC = () => {
  const { isSeller, userData, openSignIn, signOut } = useAppContext();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {userData && isSeller && (
        <button
          onClick={() => router.push("/admin")}
          className="text-xs border border-gray-600 px-4 py-1.5 rounded-full mr-4"
        >
          Dashboard
        </button>
      )}

      {userData ? (
        <>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 hover:text-gray-900 transition border border-gray-700 rounded-full px-3 py-1.5"
          >
            <Image
              src={assets.user_icon}
              alt="user icon"
              width={24}
              height={24}
            />
            {userData.name}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <ul className="text-base text-gray-700">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-4 md:hidden"
                  onClick={() => {
                    router.push("/all-products");
                    setDropdownOpen(false);
                  }}
                >
                  <ShopIcon />
                  Shop
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-4 md:hidden"
                  onClick={() => {
                    router.push("/about");
                    setDropdownOpen(false);
                  }}
                >
                  <AboutUsIcon />
                  About Us
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-4"
                  onClick={() => {
                    router.push("/user-info");
                    setDropdownOpen(false);
                  }}
                >
                  <Image
                    src={assets.user_icon}
                    alt="user icon"
                    width={20}
                    height={20}
                  />
                  User Information
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-4"
                  onClick={() => {
                    router.push("/change-password");
                    setDropdownOpen(false);
                  }}
                >
                  <Image
                    src={assets.key}
                    alt="user icon"
                    width={20}
                    className="text-gray-600"
                  />
                  Change Password
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-4"
                  onClick={() => {
                    router.push("/cart");
                    setDropdownOpen(false);
                  }}
                >
                  <CartIcon />
                  Cart
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex  items-center gap-4"
                  onClick={() => {
                    router.push("/orders");
                    setDropdownOpen(false);
                  }}
                >
                  <BagIcon />
                  Order History
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600 flex  items-center gap-4"
                  onClick={signOut}
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <button
          onClick={openSignIn}
          className="flex items-center gap-2 hover:text-gray-900 transition border-gray-700 rounded-full px-3 py-1.5"
        >
          <Image
            src={assets.user_icon}
            alt="user icon"
            width={24}
            height={24}
          />
          Account
        </button>
      )}
    </div>
  );
};

export default NavbarUser;
