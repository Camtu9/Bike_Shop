"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Loading from "@/components/Loading";
import { ProductData } from "@/types/product";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const ProductList = () => {
  const router = useRouter();
  const { getToken, user } = useAppContext();

  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSellerProduct = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/product/seller-list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setProducts(data.products);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSellerProduct();
    }
  }, [user]);

  return (
    <div className="flex-1 min-h-screen bg-gray-50">
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-6xl w-full mx-auto px-4 md:px-10 py-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
            All Products
          </h2>

          <div className="overflow-auto rounded-lg shadow-sm border border-gray-200 bg-white hidden sm:block">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 w-[25%]">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Brand</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Original</th>
                  <th className="px-4 py-3">Offer</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id || product.name}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="flex items-center gap-3 px-4 py-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        <Image
                          src={product.image[0]}
                          alt="product"
                          width={1280}
                          height={720}
                          className="w-16 h-16 object-cover"
                        />
                      </div>
                      <span className="truncate max-w-xs font-medium text-gray-700">
                        {product.name}
                      </span>
                    </td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3">{product.brand}</td>
                    <td className="px-4 py-3">{product.stock}</td>
                    <td className="px-4 py-3">${product.price}</td>
                    <td className="px-4 py-3">${product.offerPrice}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => router.push(`/product/${product._id}`)}
                        className="flex items-center gap-2 bg-orange-600 text-white text-xs px-3 py-2 rounded-md hover:bg-orange-700 transition"
                      >
                        <span className="hidden md:block">Visit</span>
                        <Image
                          src={assets.redirect_icon}
                          alt="redirect_icon"
                          width={14}
                          height={14}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="sm:hidden space-y-4">
            {products.map((product) => (
              <div 
                onClick={() => router.push(`/product/${product._id}`)}
                key={product._id || product.name}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Image
                    src={product.image[0]}
                    alt="product"
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1 mb-3">
                  <p>Brand: {product.brand}</p>
                  <p>Stock: {product.stock}</p>
                  <p>
                    Price:{" "}
                    <span className="line-through">{product.price}</span>{" "}
                    <span className="text-orange-600 font-medium">
                      ${product.offerPrice}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
