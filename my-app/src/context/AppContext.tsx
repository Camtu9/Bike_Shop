"use client";

import { ProductData } from "@/types/product";
import { UserData } from "@/types/user";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from "react";

import axios from "axios";
import toast from "react-hot-toast";

interface AppContextType {
  currency: string | undefined;
  isSeller: boolean;
  setIsSeller: (value: boolean) => void;
  userData: UserData | null;
  setUserData: (userData: UserData) => void;
  fetchUserData: () => Promise<void>;
  products: ProductData[];
  fetchProductData: () => Promise<void>;
  cartItems: Record<string, number>;
  setCartItems: (items: Record<string, number>) => void;
  addToCart: (itemId: string) => Promise<void>;
  updateCartQuantity: (itemId: string, quantity: number) => Promise<void>;
  getCartCount: () => number;
  getCartAmount: () => number;
  token: string | undefined;
  formatCurrency: (amount: number) => ReactNode;
  signIn: (user: any) => void;
  signOut: () => void;
  openSignIn: () => void;
  openSignUp: () => void;
  closeModals: () => void;
  showSignIn: boolean;
  showSignUp: boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider = (props: AppContextProviderProps) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;

  const prevUserRef = useRef<any>(null);

  const [products, setProducts] = useState<ProductData[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isSeller, setIsSeller] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [token, setToken] = useState<string | undefined>(undefined);
  const [showSignIn, setShowSignIn] = useState<boolean>(false);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);

  const openSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  const openSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const closeModals = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };
  const signIn = (user: any) => {
    setUserData(user);
    setToken(user.token);
    localStorage.setItem("token", user.token);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setToken(undefined);
    setUserData(null);
    setIsSeller(false);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });
  };

  const fetchProductData = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get("/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserData(data.user);
        setIsSeller(data.user.role === "admin");
        setCartItems(data.user.cartItems);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const addToCart = async (itemId: string) => {
    const cartData = structuredClone(cartItems || {});
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(
          "/api/cart/update",
          { cartData },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Item added to cart");
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  const updateCartQuantity = async (itemId: string, quantity: number) => {
    const cartData = structuredClone(cartItems);
    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(
          "/api/cart/update",
          { cartData },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Cart updated");
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems ?? {}).reduce((total, qty) => total + qty, 0);
  };  

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo) {
        totalAmount += itemInfo.offerPrice * cartItems[itemId];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const value: AppContextType = {
    token,
    currency,
    isSeller,
    setIsSeller,
    userData,
    fetchUserData,
    products,
    fetchProductData,
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
    formatCurrency,
    showSignIn,
    showSignUp,
    openSignIn,
    openSignUp,
    closeModals,
    signOut,
    signIn,
    setUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
