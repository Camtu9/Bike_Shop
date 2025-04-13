import ProductPage from "@/components/ProductPage";
import { getProductById } from "./api/route";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) return notFound();

  return <ProductPage product={product} />;
}
