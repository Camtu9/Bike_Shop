"use client";
import React from "react";
import {
  AboutUsIcon,
  assets,
  BagIcon,
  CartIcon,
  HomeIcon,
  ShopIcon,
} from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useClerk, UserButton } from "@clerk/nextjs";

const Navbar: React.FC = () => {
  const { isSeller, user } = useAppContext();
  const router = useRouter();
  const { openSignIn } = useClerk();

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/about" className="hover:text-gray-900 transition">
          About Us
        </Link>
        {isSeller && (
          <button
            onClick={() => router.push("/admin")}
            className="text-xs border border-gray-600 px-4 py-1.5 rounded-full"
          >
            Dashboard
          </button>
        )}
      </div>

      <ul className="hidden md:flex items-center gap-4">
        {/* <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" /> */}
        <form action="/search" className="relative hidden md:flex items-center">
          <input
            type="text"
            name="name"
            placeholder="Search products..."
            className="pl-4 pr-8 py-2 rounded-full border border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button type="submit" className="absolute right-3">
            <Image
              className="w-4 h-4"
              src={assets.search_icon}
              alt="search icon"
            />
          </button>
        </form>
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="Cart"
                labelIcon={<CartIcon />}
                onClick={() => router.push("/cart")}
              />
              <UserButton.Action
                label="My Orders"
                labelIcon={<BagIcon />}
                onClick={() => router.push("/orders")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={() => openSignIn()}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="Home"
                labelIcon={<HomeIcon />}
                onClick={() => router.push("/")}
              />
              <UserButton.Action
                label="Shop"
                labelIcon={<ShopIcon />}
                onClick={() => router.push("/all-products")}
              />
              <UserButton.Action
                label="About Us"
                labelIcon={<AboutUsIcon />}
                onClick={() => router.push("/about")}
              />
              <UserButton.Action
                label="Cart"
                labelIcon={<CartIcon />}
                onClick={() => router.push("/cart")}
              />
              <UserButton.Action
                label="My Orders"
                labelIcon={<BagIcon />}
                onClick={() => router.push("/orders")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={() => openSignIn()}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
