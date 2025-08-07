"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

import { updateSearchParams } from "@/services/car.service";
import { CustomFilterProps } from "@/types/custom-filter.type";

export default function CustomFilter({ title, options }: CustomFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentValue = searchParams.get(title);

  const getSelectedOption = () => {
    if (currentValue) {
      const found = options.find(
        (option) => option.value.toLowerCase() === currentValue.toLowerCase()
      );
      return found || options[0];
    }
    return options[0];
  };

  const [selected, setSelected] = useState(getSelectedOption());

  useEffect(() => {
    setSelected(getSelectedOption());
  }, [currentValue]);

  const handleUpdateParams = (e: { title: string; value: string }) => {
    const newPathName = updateSearchParams(title, e.value.toLowerCase());
    router.push(newPathName);
  };

  return (
    <div className="w-fit" style={{ zIndex: 40 }}>
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          handleUpdateParams(e);
        }}
      >
        <div className="relative w-fit" style={{ zIndex: 40 }}>
          <ListboxButton
            className="custom-filter__btn"
            style={{
              position: "relative",
              width: "100%",
              minWidth: "127px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: "0.5rem",
              backgroundColor: "white",
              paddingTop: "8px",
              paddingBottom: "8px",
              paddingLeft: "12px",
              paddingRight: "12px",
              textAlign: "left",
              fontSize: "14px",
              border: "1px solid #d1d5db",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            }}
          >
            <span
              className="block truncate"
              style={{
                fontSize: "14px",
                color: "#374151",
                textTransform: "capitalize",
              }}
            >
              {selected.title}
            </span>
            <Image
              src="/chevron-up-down.svg"
              width={16}
              height={16}
              className="ml-2 object-contain"
              alt="chevron_up-down"
            />
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              className="custom-filter__options"
              style={{
                position: "absolute",
                marginTop: "4px",
                maxHeight: "240px",
                width: "100%",
                overflow: "auto",
                borderRadius: "6px",
                backgroundColor: "white",
                paddingTop: "4px",
                paddingBottom: "4px",
                fontSize: "14px",
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                border: "1px solid #e5e7eb",
                zIndex: 9999,
              }}
            >
              {options.map((option) => (
                <ListboxOption
                  key={option.title}
                  className="relative cursor-pointer select-none py-2 px-4 data-[focus]:bg-blue-600 data-[focus]:text-white text-gray-900"
                  value={option}
                  style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                  }}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                        style={{
                          fontSize: "14px",
                          textTransform: "capitalize",
                        }}
                      >
                        {option.title}
                      </span>
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
