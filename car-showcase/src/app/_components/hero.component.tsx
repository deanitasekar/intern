"use client";

import Image from "next/image";
import CustomButton from "../../components/custom-button.component";

const Hero = () => {
  const handleScroll = () => {
  };

  return (
    <div className="hero">
      <div className="flex-1 flex flex-col justify-center items-center xl:items-start padding-x min-h-screen">
        <div className="text-center xl:text-left">
          <h1 className="hero__title">
            Find, book, or rent a car - quickly and easily!
          </h1>
          <p className="hero__subtitle">
            Streamline your car rental experience with our effortless booking
            process.
          </p>

          <div className="!mt-4 w-full flex justify-center xl:justify-start">
            <CustomButton
              title="Explore Cars"
              containerStyles="bg-blue-600 text-white rounded-full px-6 py-3 min-w-[160px] w-auto max-w-full hover:bg-blue-700 transition-colors"
              handleClick={handleScroll}
            />
          </div>
        </div>
      </div>

      <div className="hero__image-container">
        <div className="hero__image">
          <Image src="/hero.png" alt="hero" fill className="object-contain" />
        </div>

        <div className="hero__image-overlay" />
      </div>
    </div>
  );
};

export default Hero;
