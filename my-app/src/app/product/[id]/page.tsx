import ProductPage from "@/components/ProductPage";
import { getProductById } from "./api/route";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const product = await getProductById(params.id);

  if (!product) return notFound();

  return <ProductPage product={product} />;
}
