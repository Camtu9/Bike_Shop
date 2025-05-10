"use client";

import React from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import NavbarUserSkeleton from "./NavbarUserSketon";

const NavbarUser = dynamic(() => import("./NavbarUser"), {
  ssr: false,
  loading: () => <NavbarUserSkeleton />,
});

const Navbar: React.FC = () => {
  const router = useRouter();

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
      </div>

      <ul className="hidden md:flex items-center gap-4">
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
        <NavbarUser />
      </ul>

      <div className="flex items-center md:hidden gap-3">
        <NavbarUser />
      </div>
    </nav>
  );
};

export default Navbar;
