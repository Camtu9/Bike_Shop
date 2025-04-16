"use client";
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";

const categoryOptions = [
  { label: "Xe đạp địa hình", value: "Xe đạp địa hình" },
  { label: "Xe đạp đường phố", value: "Xe đạp đường phố" },
  { label: "Xe đạp trẻ em", value: "Xe đạp trẻ em" },
  { label: "Xe đạp đua", value: "Xe đạp đua" },
  { label: "Xe đạp thể thao", value: "Xe đạp thể thao" },
  { label: "Xe đạp sang trọng", value: "Xe đạp sang trọng" },
  { label: "Xe đạp cổ điển", value: "Xe đạp cổ điển" },
  { label: "Xe đạp gấp", value: "Xe đạp gấp" },
  { label: "Phụ kiện", value: "Phụ kiện" },
];

const AddProduct = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Xe đạp địa hình");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [stock, setStock] = useState("");
  const { getToken } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    console.log("form", formData);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("offerPrice", offerPrice);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("stock", stock);
    for (let i = 0; i < files.length; i++) {
      formData.append("image", files[i]);
    }
    try {
      const token = await getToken();
      const { data } = await axios.post("/api/product/add", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        toast.success(data.message);
        setFiles([]);
        setName("");
        setPrice("");
        setOfferPrice("");
        setDescription("");
        setCategory("");
        setBrand("");
        setStock("");
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col items-center px-4">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800">Thêm Sản Phẩm</h2>
        <div>
          <p className="text-base font-medium text-gray-700 mb-2">
            Hình ảnh sản phẩm
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  type="file"
                  id={`image${index}`}
                  hidden={true}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const updatedFiles = [...files];
                      updatedFiles[index] = file;
                      setFiles(updatedFiles);
                    }
                  }}
                />
                <Image
                  src={
                    files[index]
                      ? URL.createObjectURL(files[index])
                      : assets.upload_area
                  }
                  alt="Upload"
                  width={100}
                  height={100}
                  className="max-w-24 cursor-pointer object-cover border rounded"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Tên sản phẩm */}
        <div className="flex flex-col gap-1">
          <label
            className="text-base font-medium text-gray-700"
            htmlFor="product-name"
          >
            Tên sản phẩm
          </label>
          <Input
            id="product-name"
            type="text"
            placeholder="Nhập tên sản phẩm"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        {/* Mô tả */}
        <div className="flex flex-col gap-1">
          <label
            className="text-base font-medium text-gray-700"
            htmlFor="product-description"
          >
            Mô tả sản phẩm
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none py-2 px-3 rounded border border-gray-300 resize-none"
            placeholder="Nhập mô tả"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </div>

        {/* Danh mục và Thương hiệu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label
              className="text-base font-medium text-gray-700"
              htmlFor="category"
            >
              Danh mục
            </label>
            <Select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={categoryOptions}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="text-base font-medium text-gray-700"
              htmlFor="brand"
            >
              Thương hiệu
            </label>
            <Input
              id="brand"
              type="text"
              placeholder="Tên thương hiệu"
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label
              className="text-base font-medium text-gray-700"
              htmlFor="product-price"
            >
              Giá gốc
            </label>
            <Input
              id="product-price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="text-base font-medium text-gray-700"
              htmlFor="offer-price"
            >
              Giá khuyến mãi
            </label>
            <Input
              id="offer-price"
              type="number"
              placeholder="0"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="text-base font-medium text-gray-700"
              htmlFor="stock"
            >
              Số lượng
            </label>
            <Input
              id="stock"
              type="number"
              placeholder="0"
              onChange={(e) => setStock(e.target.value)}
              value={stock}
            />
          </div>
        </div>

        <Button type="submit" className="w-full py-3.5 mt-4">
          Thêm sản phẩm
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
