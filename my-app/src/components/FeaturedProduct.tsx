"use client";
import React from "react";
import FeaturedCard from "./FeaturedCard";
import { assets } from "@/assets/assets";
import { useRouter } from "next/navigation";

const products = [
  {
    id: 1,
    image: assets.mountain_bike_image,
    title: "Conquer the Trails",
    description: "Designed to tackle tough trails and rugged terrain, built for adventure seekers.",
    category: "Xe đạp địa hình"
  },
  {
    id: 2,
    image: assets.city_bike_image,
    title: "Urban Mobility",
    description: "Efficient, stylish, and comfortable – perfect for navigating through city streets with ease.",
    category: "Xe đạp đường phố"
  },
  {
    id: 3,
    image: assets.classic_bike_image,
    title: "Timeless Elegance",
    description: "A perfect blend of vintage style and durability, ideal for your daily city rides.",
    category: "Xe đạp cổ điển"
  },
];

const FeaturedProduct = () => {
  const router = useRouter();
  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-medium">Featured Products</p>
        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {products.map(({ id, category, ...rest }) => (
          <FeaturedCard key={id} {...rest} onClick={() => router.push(`/category?category=${category}`)} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
