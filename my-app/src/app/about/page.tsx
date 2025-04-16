"use client";

import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const AboutPage = () => {
  const router = useRouter();
  const [showMore1, setShowMore1] = useState(false);
  const [showMore2, setShowMore2] = useState(false);
  return (
    <div className="font-sans">
      <section className="relative">
        <Image
          src={assets.bike_shop_banner}
          alt="BikeZone Hero"
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-start px-6 md:px-20">
          <p className="text-white text-lg">Welcome to</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Bike<span className="text-orange-500">Zone</span>
          </h1>
          <h2 className="text-white text-2xl md:text-3xl mt-2">
            Vietnam&apos;s leading bicycle store
          </h2>
          <p className="text-white mt-4 max-w-xl">
            From mountain bikes to city bikes, we bring you the best cycling experience.
          </p>
          <div className="mt-6 flex gap-4">
            <Button
              className="px-6 py-2"
              onClick={() => router.push("/all-products")}
            >
              Learn more
            </Button>
            <Button
              variant="secondary"
              className="px-6 py-2 whitespace-nowrap"
              onClick={() => router.push("/all-products")}
            >
              Explore products
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-lg text-gray-500">— About us —</p>
        </div>

        {/* Section 1 */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <Image
            src={assets.bike_shop_image}
            alt="BikeZone History"
            className="rounded-xl shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              The story of <span className="text-orange-500">BikeZone</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Since 2010, we have supplied thousands of high-quality bicycles to cycling enthusiasts across the country. With a mission to bring the cycling culture closer to everyone, BikeZone continues to grow in both products and services.
              {showMore1 && (
                <div className="mt-4 text-gray-600 leading-relaxed animate-fade-in">
                  <p>
                    We started as a small shop in Hanoi, where our passion for bikes was nurtured daily. Over more than a decade, we&apos;ve grown into a nationwide chain of stores and communities.
                  </p>
                  <p className="mt-2">
                    Beyond business, we aim to create a space for bike lovers to share experiences, organize events, and inspire a positive lifestyle every day.
                  </p>
                </div>
              )}
            </p>
            <Button
              className="px-6 py-2 w-fit!"
              variant={showMore1 ? "secondary" : "primary"}
              onClick={() => setShowMore1(!showMore1)}
            >
              {showMore1 ? "Show less" : "Read more"}
            </Button>
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid md:grid-cols-2 gap-10 items-center mt-20">
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              Why choose us?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We&apos;re not just selling bikes – we promote a dynamic and sustainable lifestyle. With a professional team and dedicated service, BikeZone is the ideal destination for cycling enthusiasts.
              {showMore2 && (
                <div className="mt-4 text-gray-600 leading-relaxed animate-fade-in">
                  <p>
                    At BikeZone, we offer after-sales services like warranty, regular maintenance, bike fitting based on body type and riding style. You&apos;ll always receive attentive advice from our passionate and knowledgeable team.
                  </p>
                  <p className="mt-2">
                    More than just a store, BikeZone is a community – where you can join cycling tours, technical workshops, or simply connect with fellow enthusiasts.
                  </p>
                </div>
              )}
            </p>
            <Button
              className="px-6 py-2 w-fit!"
              variant={showMore2 ? "secondary" : "primary"}
              onClick={() => setShowMore2(!showMore2)}
            >
              {showMore2 ? "Show less" : "Read more"}
            </Button>
          </div>
          <Image
            src={assets.group_outdoor_image}
            alt="Why choose BikeZone"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      <section className="bg-orange-500 py-10 text-white text-center grid grid-cols-2 sm:grid-cols-4 gap-6 text-lg font-medium">
        <div>
          <p className="text-3xl font-bold">10+</p>
          <p>Years of operation</p>
        </div>
        <div>
          <p className="text-3xl font-bold">500+</p>
          <p>Products</p>
        </div>
        <div>
          <p className="text-3xl font-bold">200+</p>
          <p>Loyal customers</p>
        </div>
        <div>
          <p className="text-3xl font-bold">99%</p>
          <p>Satisfaction</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Discover our <span className="text-orange-500">services</span>
        </h2>
        <div className="w-20 h-0.5 bg-orange-500 mx-auto mt-3 mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Maintenance & Repair", icon: assets.repair_icon },
            { title: "Bike Rentals", icon: assets.rent_icon },
            { title: "Consultation & Fitting", icon: assets.fit_icon },
            { title: "Accessories & Gear", icon: assets.accessory_icon },
            { title: "Cycling Tours", icon: assets.tour_icon },
            { title: "Community Workshops", icon: assets.event_icon },
          ].map(({ title, icon }, i) => (
            <div
              key={i}
              className="px-6 py-4 border border-gray-200 rounded-2xl hover:shadow-lg transition bg-white"
            >
              <Image
                src={icon}
                alt={title}
                width={48}
                height={48}
                className="mx-auto my-4"
              />
              <h3 className="font-semibold text-lg text-orange-500">{title}</h3>
              <p className="text-sm text-gray-500 mt-4">
                {title === "Bike Rentals"
                  ? "Rent bikes by hour, day, or week at very affordable prices."
                  : title === "Cycling Tours"
                  ? "Discover beautiful routes with our cycling community."
                  : "Professional services that support your cycling journey."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-20 text-center">
        <h2 className="text-3xl font-semibold">
          What do customers <span className="text-orange-500">say?</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-12 px-4">
          {[
            {
              name: "Minh Tuấn",
              email: "tuan.bike@gmail.com",
              quote:
                "Xe đẹp, chất lượng tốt và dịch vụ bảo hành cực kỳ chu đáo.",
            },
            {
              name: "Lan Anh",
              email: "lan.anh@yahoo.com",
              quote: "Đã thuê xe ở đây cho chuyến đi Đà Lạt – tuyệt vời!",
            },
            {
              name: "Hữu Nghĩa",
              email: "nghia.trail@gmail.com",
              quote: "Phụ kiện đa dạng, đội ngũ tư vấn rất chuyên nghiệp.",
            },
            {
              name: "Phương Thảo",
              email: "phuongthao95@hotmail.com",
              quote:
                "Tôi cực kỳ thích các buổi workshop và tour trải nghiệm của BikeZone.",
            },
          ].map(({ name, email, quote }, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-6 shadow-sm space-y-4"
            >
              <p className="text-orange-500 text-3xl">“</p>
              <p className="text-sm text-gray-600">{quote}</p>
              <p className="font-semibold">{name}</p>
              <p className="text-xs text-gray-500">{email}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

