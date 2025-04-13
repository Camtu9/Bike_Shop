'use client'

import React from "react";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";

const AllProducts: React.FC = () => {
  const { products } = useAppContext();

  return (
    <>
      <div className="flex flex-col px-6 md:px-16 lg:px-32">
        {/* Heading */}
        <div className="flex flex-col items-center text-center pt-12">
          <p className="text-3xl font-semibold text-gray-800">All Products</p>
          <div className="w-24 h-0.5 bg-orange-600 rounded-full mt-2"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-12 pb-14 w-full">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
