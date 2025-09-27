"use client";
import React from "react";
import Header from "../shared/Header";
import { gravitasOne, kumbhSans, poiretOne } from "@/fonts/font";
import Image from "next/image";
import PointIcon from "../../public/icons/point.svg";
import WatchIcon from "../../public/icons/watch.svg";
import CharDrop from "../animations/CharDrop";
import DiamondSparkles from "../animations/DiamondSparkles";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden pt-24 sm:pt-28">
      <Header />

      <DiamondSparkles className="-z-10" count={16} />

      {/* Content */}
      <div className="max-w-[92vw] sm:max-w-2xl flex flex-col items-center justify-center px-4">
        <h1
          className={`${gravitasOne.className} font-bold tracking-widest text-bling leading-none`}
        >
          <span className="block text-[22vw] sm:text-[150px] md:text-[180px]">
            MEMORA
          </span>
        </h1>
        <CharDrop
          text="A SWEET AURORA OF MEMORIES"
          className={`${poiretOne.className} text-gray-800 text-lg sm:text-2xl md:text-3xl font-semibold tracking-wide`}
          delayStep={0.12}
          duration={1.6}
          random
        />
        <div className="mt-8 sm:mt-10 w-full flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center">
          <button className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-md border border-transparent text-gray-600 hover:text-black hover:border-black transition flex items-center justify-center gap-2">
            <Image src={WatchIcon} alt="point_icon" width={24} height={24} />
            <span className={`${kumbhSans.className}`}>Watch Demo</span>
          </button>

          <button className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-md bg-black text-white hover:bg-gray-800 transition flex items-center justify-center gap-2">
            <span className={`${kumbhSans.className}`}>Explore More</span>
            <Image src={PointIcon} alt="point_icon" width={24} height={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
