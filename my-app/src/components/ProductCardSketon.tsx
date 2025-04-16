import React from "react";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow-md p-4">
      <div className="bg-gray-200 h-40 w-full rounded-lg mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  );
};

export default ProductCardSkeleton;
