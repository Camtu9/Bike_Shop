import React from "react";
import FeaturedCard from "./FeaturedCard";
import { assets } from "@/assets/assets";

const products = [
  {
    id: 1,
    image: assets.header_headphone_image,
    title: "Unparalleled Sound",
    description: "Experience crystal-clear audio with premium headphones.",
  },
  {
    id: 2,
    image: assets.header_headphone_image,
    title: "Stay Connected",
    description: "Compact and stylish earphones for every occasion.",
  },
  {
    id: 3,
    image: assets.header_headphone_image,
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work, gaming, and more.",
  },
];

const FeaturedProduct = () => {
  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-medium">Featured Products</p>
        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {products.map(({ id, ...rest }) => (
          <FeaturedCard key={id} {...rest} onClick={() => console.log("Buy product", id)} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
