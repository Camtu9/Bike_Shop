"use client";

import { Suspense } from "react";
import ProductsByCategoryPage from "./ProductByCategoryPage";

export default function CategoryPageWrapper() {
  return (
    <Suspense fallback={<p className="text-center mt-10 text-gray-500">Loading...</p>}>
      <ProductsByCategoryPage />
    </Suspense>
  );
}
