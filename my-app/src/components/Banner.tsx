import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Banner: React.FC = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:pl-20 py-14 md:py-0 bg-[#E6E9F2] my-16 rounded-xl overflow-hidden">
      <Image
        className="max-w-56"
        src={assets.tour_bike_image}
        alt="bike_banner_left"
      />
      <div className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-semibold max-w-[290px]">
          Elevate Your Ride with a New Bike
        </h2>
        <p className="max-w-[343px] font-medium text-gray-800/60">
          Discover high-quality bikes with sporty designs and outstanding
          performance.
        </p>
        <button
          onClick={() => router.push("/all-products")}
          className="group flex items-center justify-center gap-1 px-12 py-2.5 bg-orange-600 rounded text-white"
        >
          Shop Now
          <Image
            className="group-hover:translate-x-1 transition"
            src={assets.arrow_icon_white}
            alt="arrow_icon_white"
          />
        </button>
      </div>
      <Image
        className="hidden md:block max-w-80"
        src={assets.road_bike_image}
        alt="bike_banner_right"
      />
      <Image
        className="md:hidden"
        src={assets.road_bike_image}
        alt="bike_banner_mobile"
      />
    </div>
  );
};

export default Banner;
