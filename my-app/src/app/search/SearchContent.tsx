"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { ProductData } from "@/types/product";
import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";

const SearchContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("name") || "";
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductData[]>([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`/api/product/search-by-name?name=${query}`);
      if (data.success) setProducts(data.products);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetchProducts();
    }
  }, [query]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen px-6 md:px-16 lg:px-32 py-6">
      <h1 className="text-xl font-semibold mb-4">Search results for: {query}</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {(products).map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      )}
    </div>
  );
};

export default SearchContent;
