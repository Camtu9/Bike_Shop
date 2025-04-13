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
          src={assets.header_headphone_image}
          alt="BikeZone Hero"
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-start px-6 md:px-20">
          <p className="text-white text-lg">Chào mừng đến với</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Bike<span className="text-orange-500">Zone</span>
          </h1>
          <h2 className="text-white text-2xl md:text-3xl mt-2">
            Cửa hàng xe đạp hàng đầu Việt Nam
          </h2>
          <p className="text-white mt-4 max-w-xl">
            Từ xe đạp thể thao đến xe đạp đường phố, chúng tôi mang đến cho bạn
            trải nghiệm đạp xe hoàn hảo nhất.
          </p>
          <div className="mt-6 flex gap-4">
            <Button
              className="px-6 py-2"
              onClick={() => router.push("/all-products")}
            >
              Xem thêm
            </Button>
            <Button
              variant="secondary"
              className="px-6 py-2 whitespace-nowrap"
              onClick={() => router.push("/all-products")}
            >
              Khám phá sản phẩm
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
            src={assets.header_headphone_image}
            alt="Lịch sử BikeZone"
            className="rounded-xl shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              Lịch sử của <span className="text-orange-500">BikeZone</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Từ năm 2010, chúng tôi đã cung cấp hàng nghìn chiếc xe đạp chất
              lượng cho cộng đồng yêu xe trên toàn quốc. Với sứ mệnh đưa văn hóa
              đạp xe đến gần hơn với mọi người, BikeZone không ngừng phát triển
              cả về sản phẩm lẫn dịch vụ.
              {showMore1 && (
                <div className="mt-4 text-gray-600 leading-relaxed animate-fade-in">
                  <p>
                    Chúng tôi khởi đầu từ một cửa hàng nhỏ tại Hà Nội, nơi niềm
                    đam mê xe đạp được nuôi dưỡng mỗi ngày. Trải qua hơn một
                    thập kỷ, chúng tôi đã phát triển thành chuỗi cửa hàng và
                    cộng đồng yêu xe phủ khắp cả nước.
                  </p>
                  <p className="mt-2">
                    Không chỉ đơn thuần là kinh doanh, chúng tôi tạo ra không
                    gian cho những người yêu thích đạp xe cùng nhau chia sẻ kinh
                    nghiệm, tổ chức sự kiện và truyền cảm hứng sống tích cực mỗi
                    ngày.
                  </p>
                </div>
              )}
            </p>
            <Button
              className="px-6 py-2 w-fit!"
              variant={showMore1 ? "secondary" : "primary"}
              onClick={() => setShowMore1(!showMore1)}
            >
              {showMore1 ? "Ẩn bớt" : "Đọc thêm"}
            </Button>
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid md:grid-cols-2 gap-10 items-center mt-20">
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              Vì sao chọn chúng tôi?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Chúng tôi không chỉ bán xe – chúng tôi mang đến phong cách sống
              năng động và bền vững. Với đội ngũ chuyên nghiệp và dịch vụ tận
              tâm, BikeZone là điểm đến lý tưởng cho những ai yêu thích xe đạp.
              {showMore2 && (
                <div className="mt-4 text-gray-600 leading-relaxed animate-fade-in">
                  <p>
                    Tại BikeZone, chúng tôi cung cấp các dịch vụ hậu mãi như bảo
                    hành, bảo trì định kỳ, fitting xe theo cơ thể và phong cách
                    đạp. Bạn sẽ luôn nhận được sự tư vấn tận tình từ đội ngũ am
                    hiểu và đam mê xe đạp.
                  </p>
                  <p className="mt-2">
                    Hơn cả một cửa hàng, BikeZone là một cộng đồng – nơi bạn có
                    thể tham gia tour đạp xe, workshop kỹ thuật, hoặc đơn giản
                    là gặp gỡ những người có cùng đam mê.
                  </p>
                </div>
              )}
            </p>
            <Button
              className="px-6 py-2 w-fit!"
              variant={showMore2 ? "secondary" : "primary"}
              onClick={() => setShowMore2(!showMore2)}
            >
              {showMore2 ? "Ẩn bớt" : "Đọc thêm"}
            </Button>
          </div>
          <Image
            src={assets.header_headphone_image}
            alt="Tại sao chọn BikeZone"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      <section className="bg-orange-500 py-10 text-white text-center grid grid-cols-2 sm:grid-cols-4 gap-6 text-lg font-medium">
        <div>
          <p className="text-3xl font-bold">10+</p>
          <p>Năm hoạt động</p>
        </div>
        <div>
          <p className="text-3xl font-bold">500+</p>
          <p>Sản phẩm</p>
        </div>
        <div>
          <p className="text-3xl font-bold">200+</p>
          <p>Khách hàng thân thiết</p>
        </div>
        <div>
          <p className="text-3xl font-bold">99%</p>
          <p>Hài lòng</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Khám phá <span className="text-orange-500">Dịch vụ</span> của chúng
          tôi
        </h2>
        <div className="w-20 h-0.5 bg-orange-500 mx-auto mt-3 mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Bảo dưỡng & sửa chữa", icon: assets.repair_icon },
            { title: "Cho thuê xe đạp", icon: assets.rent_icon },
            { title: "Tư vấn & fitting xe", icon: assets.fit_icon },
            { title: "Phụ kiện & đồ chơi", icon: assets.accessory_icon },
            { title: "Tour xe đạp", icon: assets.tour_icon },
            { title: "Workshop cộng đồng", icon: assets.event_icon },
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
                {title === "Cho thuê xe đạp"
                  ? "Thuê xe theo giờ, ngày hoặc tuần với chi phí cực kỳ hợp lý."
                  : title === "Tour xe đạp"
                  ? "Khám phá hành trình tuyệt đẹp cùng cộng đồng yêu xe đạp."
                  : "Dịch vụ chuyên nghiệp, đồng hành cùng bạn trên mọi hành trình."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-20 text-center">
        <h2 className="text-3xl font-semibold">
          Khách hàng <span className="text-orange-500">nói gì?</span>
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
