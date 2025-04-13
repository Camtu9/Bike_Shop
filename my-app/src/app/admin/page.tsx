"use client";
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Button";

const categoryOptions = [
    { label: 'Xe đạp địa hình', value: 'Xe đạp địa hình' },
    { label: 'Xe đạp đua', value: 'Xe đạp đua' },
    { label: 'Xe đạp gấp', value: 'Xe đạp gấp' },
    { label: 'Xe đạp điện', value: 'Xe đạp điện' },
    { label: 'Phụ kiện', value: 'Phụ kiện' },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name,
      description,
      category,
      brand,
      price: Number(price),
      offerPrice: Number(offerPrice),
      stock: Number(stock),
      image: files.map((file) => URL.createObjectURL(file)),
    };
    console.log(productData);
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Hình ảnh sản phẩm</p>
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

        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="product-name">
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

        <div className="flex flex-col gap-1">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Mô tả sản phẩm
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Nhập mô tả"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="category">
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
            <label className="text-base font-medium" htmlFor="brand">
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

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="product-price">
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
            <label className="text-base font-medium" htmlFor="offer-price">
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
            <label className="text-base font-medium" htmlFor="stock">
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

        <Button
          type="submit"
          className="py-3.5"
          >
          Thêm sản phẩm
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
