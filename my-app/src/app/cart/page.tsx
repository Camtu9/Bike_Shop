'use client'

import React from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

const Cart: React.FC = () => {
  const { products, cartItems, addToCart, updateCartQuantity, getCartCount, formatCurrency } = useAppContext();
  const router = useRouter();

  return (
      <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 mb-20">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 border-b border-gray-500/30 pb-6">
            <p className="text-2xl md:text-3xl text-gray-500">
              Your <span className="font-medium text-orange-600">Cart</span>
            </p>
            <p className="text-lg md:text-xl text-gray-500/80">{getCartCount()} Items</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="text-left">
                <tr>
                  <th className="pb-6 px-1 md:px-4 text-gray-600 font-medium">Product Details</th>
                  <th className="pb-6 px-1 md:px-4 text-gray-600 font-medium">Price</th>
                  <th className="pb-6 px-1 md:px-4 text-gray-600 font-medium">Quantity</th>
                  <th className="pb-6 px-1 md:px-4 text-gray-600 font-medium">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(cartItems).map(([itemId, quantity]) => {
                  const product = products.find((p) => p._id === itemId);
                  if (!product || quantity <= 0) return null;

                  const handleChange = (value: number) => updateCartQuantity(itemId, value);
                  const subtotal = product.offerPrice * quantity;

                  return (
                    <tr key={itemId}>
                      {/* Product Info */}
                      <td className="flex items-center gap-4 py-4 px-1 md:px-4">
                        <div>
                          <div className="rounded-lg overflow-hidden bg-gray-500/10 p-2">
                            <Image
                              src={product.image[0]}
                              alt={product.name}
                              className="w-16 h-auto object-cover mix-blend-multiply"
                              width={1280}
                              height={720}
                            />
                          </div>
                          <button
                            className="md:hidden text-xs text-orange-600 mt-1"
                            onClick={() => handleChange(0)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="text-sm hidden md:block">
                          <p className="text-gray-800">{product.name}</p>
                          <button
                            className="text-xs text-orange-600 mt-1"
                            onClick={() => handleChange(0)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-1 md:px-4 text-gray-600">
                        ${formatCurrency(product.offerPrice)}
                      </td>

                      {/* Quantity Controls */}
                      <td className="py-4 px-1 md:px-4">
                        <div className="flex items-center gap-1 md:gap-2">
                          <button onClick={() => handleChange(quantity - 1)}>
                            <Image src={assets.decrease_arrow} alt="decrease" className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            min={0}
                            value={quantity}
                            onChange={(e) => handleChange(Number(e.target.value))}
                            className="w-8 border text-center appearance-none"
                          />
                          <button onClick={() => addToCart(itemId)}>
                            <Image src={assets.increase_arrow} alt="increase" className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                      {/* Subtotal */}
                      <td className="py-4 px-1 md:px-4 text-gray-600">
                        {formatCurrency(subtotal)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Continue Shopping */}
          <button
            onClick={() => router.push('/all-products')}
            className="group flex items-center mt-6 gap-2 text-orange-600"
          >
            <Image
              className="group-hover:-translate-x-1 transition"
              src={assets.arrow_right_icon_colored}
              alt="arrow"
            />
            Continue Shopping
          </button>
        </div>
        <OrderSummary />
      </div>
  );
};

export default Cart;
