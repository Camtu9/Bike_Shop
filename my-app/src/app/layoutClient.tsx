"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppContextProvider } from "@/context/AppContext";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <AppContextProvider>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}
    </AppContextProvider>
  );
}
