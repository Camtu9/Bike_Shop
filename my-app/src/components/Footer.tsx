import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="shadow-sm border-t flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500 bg-gray-100">
        <div className="w-4/5">
          <Image
            className="w-28 md:w-32"
            src={assets.logo}
            alt="BikeZone Logo"
          />
          <p className="mt-6 text-sm">
            Welcome to BikeZone – your ultimate destination for high-quality
            bicycles and cycling accessories. Discover a wide range of bikes
            designed to fuel your passion for cycling, from mountain bikes to
            road bikes.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link className="hover:underline transition" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:underline transition" href="/all-products">
                  Bicycles
                </Link>
              </li>
              <li>
                <Link className="hover:underline transition" href="/about">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+1-800-BIKEZON</p>
              <p>support@bikezone.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm bg-gray-100">
        © 2025 BikeZone. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
