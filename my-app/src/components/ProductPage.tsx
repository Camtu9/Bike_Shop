"use client";

import React, { useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import type { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import Button from "./Button";

const ProductPage: React.FC<{ product: Product }> = ({ product }) => {
  const { products, addToCart } = useAppContext();
  const router = useRouter();
  const [mainImage, setMainImage] = useState<string | null>(null);

  return (
      <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
              <Image
                src={mainImage ?? product.image[0]}
                alt="product image"
                className="w-full h-auto object-cover mix-blend-multiply"
                width={1280}
                height={720}
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.image.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setMainImage(img)}
                  className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                >
                  <Image
                    src={img}
                    alt={`thumbnail-${i}`}
                    className="w-full h-auto object-cover mix-blend-multiply"
                    width={1280}
                    height={720}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array(4)
                  .fill(null)
                  .map((_, i) => (
                    <Image
                      key={i}
                      className="h-4 w-4"
                      src={assets.star_icon}
                      alt="star"
                    />
                  ))}
                <Image
                  className="h-4 w-4"
                  src={assets.star_dull_icon}
                  alt="half-star"
                />
              </div>
              <p>(4.5)</p>
            </div>
            <p className="text-gray-600 mt-3">{product.description}</p>
            <p className="text-3xl font-medium mt-6">
              ${product.offerPrice}
              <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                ${product.price}
              </span>
            </p>

            <hr className="bg-gray-600 my-6" />

            <table className="table-auto border-collapse w-full max-w-72">
              <tbody>
                <tr>
                  <td className="text-gray-600 font-medium">Brand</td>
                  <td className="text-gray-800/50">{product.brand}</td>
                </tr>
                <tr>
                  <td className="text-gray-600 font-medium">Stock</td>
                  <td className="text-gray-800/50">{product.stock}</td>
                </tr>
                <tr>
                  <td className="text-gray-600 font-medium">Category</td>
                  <td className="text-gray-800/50">{product.category}</td>
                </tr>
              </tbody>
            </table>

            <div className="flex items-center mt-10 gap-4">
              <Button
                variant="secondary"
                onClick={() => addToCart(product._id)}
                className="py-3.5"
              >
                Add to Cart
              </Button>

              <Button
                onClick={async () => {
                  await addToCart(product._id);
                  router.push("/cart");
                }}
                className="py-3.5"
              >
                Buy now
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 mt-16">
            <p className="text-3xl font-medium">
              Featured{" "}
              <span className="font-medium text-orange-600">Products</span>
            </p>
            <div className="w-28 h-0.5 bg-orange-600 mt-2" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
            {products.slice(0, 5).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
            See more
          </button>
        </div>
      </div>
  );
};

export default ProductPage;
