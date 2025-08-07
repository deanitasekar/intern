"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CustomButton from "./custom-button.component";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full fixed z-50 top-0 left-0 !px-14 !py-6 transition-all duration-300 ${
        scrolled ? "bg-white/40 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <header className="bg-transparent px-10">
        <nav className="flex justify-between items-center px-6 py-4">
          <Link href="/" className="flex justify-center items-center">
            <Image
              src="/logo.svg"
              alt="CarHub logo"
              width={118}
              height={18}
              className="object-contain"
            />
          </Link>

          <CustomButton
            title="Sign in"
            btnType="button"
            containerStyles="text-blue-600 rounded-full bg-white min-w-[130px] px-6 py-3 shadow-lg border border-gray-100 hover:shadow-xl hover:bg-gray-50 transition-all duration-300 font-medium text-sm"
          />
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
