"use client";

import { usePathname, useRouter } from "next/navigation";

const Test = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleGoToCart = () => {
    console.log("Current pathname:", pathname);
    if (pathname !== "/cart") {
      console.log("Navigating to /cart...");
      router.push("/cart");
    } else {
      console.log("Already on /cart");
    }
  };

  return (
    <button onClick={handleGoToCart}>Go to Cart</button>
  );
};

export default Test;