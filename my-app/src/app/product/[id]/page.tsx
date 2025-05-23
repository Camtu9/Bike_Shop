"use client";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";
import { ProductData } from "@/types/product";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import Button from "@/components/Button";
import axios from "axios";

const ProductPage: React.FC = () => {
  const { products, addToCart, formatCurrency } = useAppContext();
  const router = useRouter();
  const [productData, setProductData] = useState<ProductData>();
  const [mainImage, setMainImage] = useState<string | null>(null);
  const { id } = useParams();
  const [relatedProducts, setRelatedProducts] = useState<ProductData[]>([]);

  const fetchProductData = async () => {
    const product = products.find((product) => product._id === id);
    setProductData(product);
  };

  useEffect(() => {
    fetchProductData();
  }, [id, products.length]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!productData?.category) return;
      try {
        const { data } = await axios.get(
          `/api/product/search-by-category?category=${productData.category}`
        );
        if (data.success) {
          const filtered = data.products.filter(
            (p: ProductData) => p._id !== productData._id
          );
          setRelatedProducts(filtered);
        }
      } catch (error: any) {
        console.error("Failed to fetch related products:", error.message);
      }
    };

    fetchRelatedProducts();
  }, [productData]);
  if (!productData) return;

  return (
    <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="px-5 lg:px-16 xl:px-20">
          <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
            <Image
              src={mainImage ?? productData.image[0]}
              alt="product image"
              className="w-full h-auto object-cover mix-blend-multiply"
              width={1280}
              height={720}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {productData.image.map((img, i) => (
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
            {productData?.name}
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
          <p className="text-gray-600 mt-3">{productData?.description}</p>
          <p className="text-3xl font-medium mt-6">
            {formatCurrency(productData?.offerPrice)}
            {productData?.price !== productData?.offerPrice && (
              <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                {formatCurrency(productData?.price)}
              </span>
            )}
          </p>
          <hr className="bg-gray-600 my-6" />

          <table className="table-auto border-collapse w-full max-w-72">
            <tbody>
              <tr>
                <td className="text-gray-600 font-medium">Brand</td>
                <td className="text-gray-800/50">{productData?.brand}</td>
              </tr>
              <tr>
                <td className="text-gray-600 font-medium">Stock</td>
                <td className="text-gray-800/50">{productData?.stock}</td>
              </tr>
              <tr>
                <td className="text-gray-600 font-medium">Category</td>
                <td className="text-gray-800/50">{productData?.category}</td>
              </tr>
            </tbody>
          </table>

          <div className="flex items-center mt-10 gap-4">
            <Button
              variant="secondary"
              onClick={() => addToCart(productData?._id)}
              className="py-3.5"
            >
              Add to Cart
            </Button>

            <Button
              onClick={async () => {
                await addToCart(productData?._id);
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
      {relatedProducts.length > 0 && (
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 mt-16">
            <p className="text-3xl font-medium">
              Featured{" "}
              <span className="font-medium text-orange-600">Products</span>
            </p>
            <div className="w-28 h-0.5 bg-orange-600 mt-2" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
            {relatedProducts.slice(0, 5).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          {relatedProducts.length > 5 && (
            <button
              onClick={() =>
                router.push(`/category?category=${productData.category}`)
              }
              className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition"
            >
              See more
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
