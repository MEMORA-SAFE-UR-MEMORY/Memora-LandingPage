import { kumbhSans, raleway } from "@/fonts/font";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo/Logo.svg";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center px-10 absolute top-0 left-0 rounded-tl-3xl rounded-tr-3xl">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Image src={Logo} alt="logo" width={100} height={100} />
      </div>

      {/* Navigation */}
      <nav
        className={`flex items-center space-x-20 text-lg ${kumbhSans.className}`}
      >
        <a href="#" className="text-black">
          Home
        </a>
        <Link href="#" className="hover:text-black">
          About Us
        </Link>
        <Link href="#" className="hover:text-black">
          Pricing
        </Link>
        <Link href="#" className="hover:text-black">
          Features
        </Link>
      </nav>

      {/* Button */}
      <button
        className={`bg-black text-white px-6 py-4 rounded-md text-md ${kumbhSans.className}`}
      >
        Download
      </button>
    </header>
  );
}
