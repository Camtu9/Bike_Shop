"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { OrderData } from "@/types/order";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import Loading from "@/components/Loading";

const OrderDetail = () => {
  const { token, formatCurrency } = useAppContext();
  const { id } = useParams();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchOrder = async () => {
    try {
      const { data } = await axios.get(`/api/order/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) setOrder(data.order);
      else toast.error(data.message);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchOrder();
  }, [id]);

  if (loading) return <Loading />;
  if (!order) return <p className="p-4 text-base">Order not found.</p>;

  const totalQuantity = order.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen px-6 md:px-16 lg:px-32 py-6 text-base">
      <div className="w-full">
        {/* Recipient Info */}
        <div className="bg-white rounded-2xl p-5 mb-5 shadow-sm">
          <h2 className="font-semibold text-lg text-gray-800 mb-2">
            Recipient Information
          </h2>
          <p className="text-gray-700">
            {order.address.fullName} | {order.address.phoneNumber}
          </p>
          <p className="text-gray-600">
            {order.address.area}, {order.address.city}, {order.address.state}
          </p>
          <div className="border-t pt-3 text-gray-600 text-base space-y-1">
            <p>
              <span className="font-medium">Order ID:</span>{" "}
              {order._id}
            </p>
            <p>
              <span className="font-medium">Placed on:</span>{" "}
              {new Date(order.date).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 mb-5 shadow-sm">
          <h3 className="font-semibold text-lg text-gray-800 mb-4">
            Purchased Items
          </h3>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 mb-5 border-t border-gray-300 pt-2" onClick={()=> router.push(`/product/${item.product._id}`)}>
              <Image
                src={item.product.image[0]}
                alt={item.product.name}
                width={72}
                height={72}
                className="rounded-md border object-cover"
              />
              <div className="flex-1">
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-1 md:gap-0">
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.product.name}
                    </p>
                    <p className="text-gray-500 text-sm md:hidden">
                      Quantity: x{item.quantity}
                    </p>{" "}
                    <p className="text-gray-500 text-sm">
                      Price: {formatCurrency(item.product.offerPrice)}
                    </p>
                  </div>
                  <p className="text-gray-500 text-base hidden md:block">
                    x{item.quantity}
                  </p>{" "}
                  <p className="text-red-600 text-sm font-semibold mt-1 whitespace-nowrap">
                    {formatCurrency(item.product.offerPrice * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-2xl p-5 shadow-sm text-gray-800">
          <h3 className="font-semibold text-lg mb-4">Payment Details</h3>
          <div className="flex justify-between py-1">
            <span>Subtotal</span>
            <span>{formatCurrency(order.amount-50000)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Shipping Fee</span>
            <span>{formatCurrency(50000)}</span>
          </div>
          <div className="flex justify-between py-1 text-green-600">
            <span>Discount</span>
            <span>-{formatCurrency(0)}</span>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between font-bold text-red-600 text-base">
            <span>Total ({totalQuantity} items)</span>
            <span>{formatCurrency(order.amount)}</span>
          </div>
          <div className="flex justify-between mt-3 text-sm">
            <span>Payment Method</span>
            <span className="text-purple-600 font-medium">
              Cash on Delivery
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
