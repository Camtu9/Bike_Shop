'use client'
import React from "react";
import Slider from "@/components/Slider";
import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import FeaturedProduct from "@/components/FeaturedProduct";

const Home = () => {
  return (
      <div className="px-6 md:px-16 lg:px-32">
        <Slider />
        <HomeProducts />
        <FeaturedProduct />
        <Banner />
        <NewsLetter />
      </div>
  );
};

export default Home;