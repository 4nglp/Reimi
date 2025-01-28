"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

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
              <div className="relative w-full h-full">
                <Image
                  src={manga.coverUrl}
                  alt={manga.title}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                  className="opacity-80"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between p-4 bg-gradient-to-r from-black to-transparent">
                  <div className="flex-shrink-0 w-[150px] h-[225px] sm:w-[200px] sm:h-[300px]">
                    <Image
                      src={manga.coverUrl}
                      alt={manga.title}
                      width={150}
                      height={225}
                      objectFit="cover"
                      className="rounded-md sm:w-[200px] sm:h-[300px]"
                    />
                  </div>
                  <div className="flex-1 ml-4 text-white">
                    <h1 className="text-3xl sm:text-5xl font-bold">
                      {manga.title}
                    </h1>
                    <h3 className="hidden sm:block text-sm mt-2">
                      {manga.genres || "No genres available"}
                    </h3>
                    <div className="hidden sm:block text-sm mt-2 max-h-[150px] overflow-y-auto">
                      <p>{manga.description || "No description available"}</p>
                    </div>
                    <h2 className="text-lg sm:text-2xl italic font-bold mt-4">
                      {manga.author || "No additional details available"}
                    </h2>
                  </div>
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
