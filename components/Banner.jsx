"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

import "./css/home.css";

const Banner = ({ mangaList }) => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">4nglp&apos;s recommendations</h1>
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="h-96"
        style={{ "--swiper-pagination-color": "white" }}
      >
        {mangaList.map((manga) => (
          <SwiperSlide key={manga.id}>
            <Link href={`/manga/${manga.id}`}>
              <div id="manga-banner">
                <Image
                  src={manga.coverUrl}
                  alt={manga.title}
                  width={150}
                  height={225}
			      priority = {true}
					name="manga-banner-bg"
                  className="opacity-80 object-cover object-top w-full h-full"
                />
                <div className="manga-banner-container">
                  <div id="manga-description">
                    <h1 className="text-3xl sm:text-5xl font-bold">
                      {manga.title}
                    </h1>
                    <h3 className="hidden sm:block text-sm mt-2">
                      {manga.genres || "No genres available"}
                    </h3>
                    <div className="hidden sm:block text-sm mt-2 max-h-[150px] overflow-y-auto">
                      <p>{manga.description || "No description available"}</p>
                    </div>
                    <h2 className="text-lg sm:text-2xl italic font-bold mt-0 sm:mt-4">
                      {manga.author || "No additional details available"}
                    </h2>
                  </div>
                    <Image
					  id="manga-cover"
                      src={manga.coverUrl}
                      alt={manga.title}
                      width={150}
                      height={225}
					  quality={75}
					  priority = {true}
                    />
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};


export default Banner;
