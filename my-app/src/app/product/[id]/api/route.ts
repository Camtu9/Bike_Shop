import { productsDummyData } from '@/assets/assets';

export const getProductById = async (id: string) => {
  return productsDummyData.find((p) => p._id === id) || null;
};
