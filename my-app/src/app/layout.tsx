import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import LayoutClient from "./layoutClient";
import SignInModal from "@/components/SignInModal";
import SignUpModal from "@/components/SignUpModal";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={`${outfit} antialiased text-gray-700`}>
        <Toaster />
        <LayoutClient>
          <SignInModal />
          <SignUpModal />
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}
