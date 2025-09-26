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
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden">
      <Header />

      <DiamondSparkles className="-z-10" count={16} />

      {/* Content */}
      <div className="max-w-2xl flex flex-col items-center justify-center">
        <h1
          className={`${gravitasOne.className} text-[170px] font-bold tracking-widest text-bling`}
        >
          MEMORA
        </h1>
        <CharDrop
          text="A SWEET AURORA OF MEMORIES"
          className={`${poiretOne.className} text-gray-800 text-4xl font-semibold tracking-wide`}
          delayStep={0.12}
          duration={1.6}
          random
        />
        <div className="flex space-x-4 mt-10">
          <button className="px-6 py-4 rounded-md border border-transparent text-gray-600 hover:text-black hover:border-black transition flex items-center space-x-2">
            <Image src={WatchIcon} alt="point_icon" width={24} height={24} />
            <span className={`${kumbhSans.className}`}>Watch Demo</span>
          </button>

          <button className="px-6 py-4 rounded-md bg-black text-white hover:bg-gray-800 transition flex items-center space-x-2">
            <span className={`${kumbhSans.className}`}>Explore More</span>
            <Image src={PointIcon} alt="point_icon" width={24} height={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
