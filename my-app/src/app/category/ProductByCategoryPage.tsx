"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { ProductData } from "@/types/product";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";

const ProductsByCategoryPage: React.FC = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return;
      try {
        const { data } = await axios.get(
          `/api/product/search-by-category?category=${category}`
        );
        if (data.success) {
          setProducts(data.products);
        } else {
          toast.error(data.message);
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <div className="flex flex-col px-6 md:px-16 lg:px-32">
      <div className="flex flex-col items-center text-center pt-12">
        <p className="text-3xl font-semibold text-gray-800 capitalize">
          {category || "Products"}
        </p>
        <div className="w-24 h-0.5 bg-orange-600 rounded-full mt-2"></div>
      </div>

      {loading ? (
        <Loading/>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-12 pb-14 w-full">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found for this category.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsByCategoryPage;
