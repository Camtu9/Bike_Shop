'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets, orderDummyData } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";;
import Loading from "@/components/Loading";
import { Order } from "@/types/order";

const Orders: React.FC = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setOrders(orderDummyData);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  return (

      <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
        <div className="space-y-5">
          <h2 className="text-lg font-medium mt-6">My Orders</h2>

          {loading ? (
            <Loading />
          ) : (
            <div className="max-w-5xl border-t border-gray-300 text-sm">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300"
                >
                  {/* Product Info */}
                  <div className="flex-1 flex gap-5 max-w-80">
                    <Image
                      src={assets.box_icon}
                      alt="box_icon"
                      className="max-w-16 max-h-16 object-cover"
                    />
                    <div className="flex flex-col gap-2">
                      <p className="font-medium text-base">
                        {order.items
                          .map((item) => `${item.product.name} x ${item.quantity}`)
                          .join(", ")}
                      </p>
                      <p>Items: {order.items.length}</p>
                    </div>
                  </div>

                  {/* Address Info */}
                  <div className="min-w-[160px]">
                    <p className="text-sm">
                      <span className="font-medium">{order.address.fullName}</span>
                      <br />
                      {order.address.area}
                      <br />
                      {`${order.address.city}, ${order.address.state}`}
                      <br />
                      {order.address.phoneNumber}
                    </p>
                  </div>

                  {/* Total */}
                  <p className="font-medium my-auto min-w-[80px] text-right">
                    {currency}
                    {order.amount}
                  </p>

                  {/* Meta Info */}
                  <div className="text-sm text-right min-w-[140px]">
                    <p>Method: COD</p>
                    {/* <p>Date: {new Date(order.date).toLocaleDateString()}</p> */}
                    <p>Payment: Pending</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  );
};

export default Orders;
