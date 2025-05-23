"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";
import { OrderData } from "@/types/order";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, token, userData } = useAppContext();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSellerOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setOrders(data.orders);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchSellerOrders();
    }
  }, [userData]);

  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
      {loading ? (
        <Loading />
      ) : (
        <div className="md:p-10 p-4 space-y-5">
          <h2 className="text-lg font-medium">Đơn hàng</h2>
          <div className="max-w-4xl rounded-md">
            {orders.map((order, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300"
              >
                <div className="flex-1 flex gap-5 max-w-80">
                  <Image
                    className="max-w-16 max-h-16 object-cover"
                    src={assets.box_icon}
                    alt="box_icon"
                  />
                  <p className="flex flex-col gap-3">
                    <span className="font-medium">
                      {order.items
                        .map(
                          (item) => `${item.product.name} x ${item.quantity}`
                        )
                        .join(", ")}
                    </span>
                    <span>Số lượng: {order.items.length}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-medium">
                      {order.address.fullName}
                    </span>
                    <br />
                    <span>{order.address.area}</span>
                    <br />
                    <span>{`${order.address.city}, ${order.address.state}`}</span>
                    <br />
                    <span>{order.address.phoneNumber}</span>
                  </p>
                </div>
                <p className="font-medium my-auto">
                  {currency}
                  {order.amount}
                </p>
                <div>
                  <p className="flex flex-col">
                    <span>Phương thức: COD</span>
                    <span>
                      Ngày: {new Date(order.date).toLocaleDateString()}
                    </span>
                    <span>Thanh toán: Chờ xử lý</span>
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

export default Orders;
