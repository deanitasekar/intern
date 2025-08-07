"use client";

import Image from "next/image";
import { useEffect } from "react";

import { CarProps } from "@/types/car.type";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const getDisplayableFields = (carData: CarProps) => {
    const fieldsToShow = [
      { key: "make", label: "Make" },
      { key: "model", label: "Model" },
      { key: "year", label: "Year" },
      { key: "class", label: "Class" },
      { key: "fuel_type", label: "Fuel Type" },
      { key: "transmission", label: "Transmission" },
      { key: "drive", label: "Drive Type" },
      { key: "cylinders", label: "Cylinders" },
      { key: "displacement", label: "Engine Displacement (L)" },
      { key: "city_mpg", label: "City MPG" },
    ];

    return fieldsToShow
      .filter((field) => {
        const value = carData[field.key as keyof CarProps];
        return (
          value &&
          value !== "this field is for premium subscribers only" &&
          value !== "" &&
          value !== null &&
          value !== undefined
        );
      })
      .map((field) => ({
        label: field.label,
        value: formatFieldValue(
          field.key,
          carData[field.key as keyof CarProps]
        ),
      }));
  };

  const formatFieldValue = (key: string, value: any) => {
    switch (key) {
      case "transmission":
        return value === "a" ? "Automatic" : "Manual";
      case "fuel_type":
        return value.charAt(0).toUpperCase() + value.slice(1);
      case "drive":
        return value.toUpperCase();
      case "class":
        return value.charAt(0).toUpperCase() + value.slice(1);
      case "make":
      case "model":
        return value.charAt(0).toUpperCase() + value.slice(1);
      default:
        return value;
    }
  };

  const displayableFields = getDisplayableFields(car);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]" 
        onClick={closeModal}
      />

      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
        <div className="flex min-h-full w-full items-center justify-center">

          <div 
            className={`relative w-full max-w-2xl max-h-[85vh] overflow-hidden transform rounded-3xl bg-white shadow-2xl transition-all duration-300 ${
              isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
              onClick={closeModal}
            >
              <Image
                src="/close.svg"
                alt="close"
                width={16}
                height={16}
                className="object-contain"
              />
            </button>

            <div className="overflow-y-auto max-h-[85vh] p-6">
              <div className="!p-4">
                <h2 className="text-2xl font-bold text-gray-900 capitalize mb-2">
                  {car.make} {car.model}
                </h2>
                <p className="text-gray-600">Vehicle Details</p>
              </div>

              <div className="mb-8 !p-4">
                <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl mb-4 overflow-hidden">
                  <Image
                    src="/image.png"
                    alt={`${car.make} ${car.model}`}
                    fill
                    priority
                    className="object-contain p-4"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 !mt-2 !mb-2">
                  <div className="relative w-full h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
                    <Image
                      src="/image.png"
                      alt={`${car.make} ${car.model} - side view`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="relative w-full h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
                    <Image
                      src="/image.png"
                      alt={`${car.make} ${car.model} - rear view`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="relative w-full h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
                    <Image
                      src="/image.png"
                      alt={`${car.make} ${car.model} - interior`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 !p-4">
                <h3 className="text-lg font-semibold text-gray-900 !mb-2">
                  Specifications
                </h3>
                <div className="eFie grid-cols-1 gap-3 !space-y-2">
                  {displayableFields.map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex justify-between items-center py-3 px-4 rounded-xl transition-colors duration-200"
                    >
                      <span className="text-gray-600 font-medium">
                        {label}
                      </span>
                      <span className="text-gray-800 font-semibold">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pb-4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetails;