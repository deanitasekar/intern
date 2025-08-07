"use client";

import { calculateCarRent } from "@/services/car.service";
import { CarProps } from "@/types/car.type";
import Image from "next/image";
import { useState } from "react";
import CustomButton from "../../components/custom-button.component";
import CarDetails from "./car-details.component";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const {
    city_mpg,
    year,
    make,
    model,
    transmission,
    drive,
    fuel_type,
    class: carClass,
    cylinders,
    displacement,
  } = car;

  const [isOpen, setIsOpen] = useState(false);

  const isCityMpgAvailable = typeof city_mpg === "number" && city_mpg > 0;

  const carRent = isCityMpgAvailable ? calculateCarRent(city_mpg, year) : "50";

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
        {carClass && (
          <p className="text-sm text-gray-600 capitalize mt-1">{carClass}</p>
        )}
      </div>

      <p className="flex mt-6 text-[32px] leading-[38px] font-extrabold">
        <span className="self-start text-[14px] leading-[17px] font-semibold">
          $
        </span>
        {carRent}
        <span className="self-end text-[14px] leading-[17px] font-medium">
          /day
        </span>
        {!isCityMpgAvailable && (
          <span className="self-end text-[10px] leading-[12px] font-light text-gray-500 ml-1">
            *base
          </span>
        )}
      </p>

      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src="/image.png"
          alt={`${make} ${model}`}
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-grey">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt="steering wheel"
            />
            <p className="text-[14px] leading-[17px]">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/tire.svg" width={20} height={20} alt="drive" />
            <p className="car-card__icon-text">{drive.toUpperCase()}</p>
          </div>
          <div className="car-card__icon">
            <Image src="/gas.svg" width={20} height={20} alt="fuel" />
            <p className="car-card__icon-text">
              {isCityMpgAvailable ? `${city_mpg} MPG` : fuel_type.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </div>
  );
};

export default CarCard;
