// fonts/font.ts
import {
  Gravitas_One,
  Kumbh_Sans,
  Montserrat,
  Poiret_One,
  Raleway_Dots,
} from "next/font/google";
import localFont from "next/font/local";

export const poppins = localFont({
  src: [
    { path: "./FZ Poppins-Thin.ttf", weight: "100", style: "normal" },
    { path: "./FZ Poppins-ThinItalic.ttf", weight: "100", style: "italic" },

    { path: "./FZ Poppins-ExtraLight.ttf", weight: "200", style: "normal" },
    {
      path: "./FZ Poppins-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },

    { path: "./FZ Poppins-Light.ttf", weight: "300", style: "normal" },
    { path: "./FZ Poppins-LightItalic.ttf", weight: "300", style: "italic" },

    { path: "./FZ Poppins-Regular.ttf", weight: "400", style: "normal" },
    { path: "./FZ Poppins-Italic.ttf", weight: "400", style: "italic" },

    { path: "./FZ Poppins-Medium.ttf", weight: "500", style: "normal" },
    { path: "./FZ Poppins-MediumItalic.ttf", weight: "500", style: "italic" },

    { path: "./FZ Poppins-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./FZ Poppins-SemiBoldItalic.ttf", weight: "600", style: "italic" },

    { path: "./FZ Poppins-Bold.ttf", weight: "700", style: "normal" },
    { path: "./FZ Poppins-BoldItalic.ttf", weight: "700", style: "italic" },

    { path: "./FZ Poppins-ExtraBold.ttf", weight: "800", style: "normal" },
    {
      path: "./FZ Poppins-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },

    { path: "./FZ Poppins-Black.ttf", weight: "900", style: "normal" },
    { path: "./FZ Poppins-BlackItalic.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const bodon = localFont({
  src: [{ path: "/HP-Bodon-Poster-Bold.ttf", style: "normal" }],
  variable: "--font-bodon",
  display: "swap",
});

export const gravitasOne = Gravitas_One({
  variable: "--font-gravitas-one",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const kumbhSans = Kumbh_Sans({
  variable: "--font-kumbh-sans",
  subsets: ["latin"],
  weight: ["300"],
  display: "swap",
});

export const raleway = Raleway_Dots({
  variable: "--font-raleway-dots",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const poiretOne = Poiret_One({
  variable: "--font-poiret-one",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});
