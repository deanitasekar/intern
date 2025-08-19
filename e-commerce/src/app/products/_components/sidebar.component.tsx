"use client";

import { Button } from "@/components/button.component";
import { Typography } from "@/components/typography.component";
import { useAuth } from "@/hooks/use-auth.hook";
import { useCart } from "@/hooks/use-cart.hook";
import { ChevronDown, Heart, Lock, X } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  categories: string[] | undefined;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function Sidebar({
  categories,
  selectedCategory,
  onCategoryChange,
}: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    style: false,
    category: true,
    size: false,
    price: false,
    color: false,
  });

  const { isAuthenticated, user } = useAuth();
  const { getTotalItems } = useCart();

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  const SectionHeader = ({
    title,
    section,
  }: {
    title: string;
    section: string;
  }) => (
    <button
      onClick={() => toggleSection(section)}
      className="flex items-center justify-between w-full py-3 text-left border-b border-gray-200"
    >
      <Typography variant="h6" className="font-light text-[15px] text-gray-800 ml-2 ">
        {title}
      </Typography>
      <ChevronDown
        className={`h-4 w-4 transition-transform text-gray-500 ${
          expandedSections[section as keyof typeof expandedSections]
            ? "rotate-180"
            : ""
        }`}
      />
    </button>
  );

  return (
    <div className="w-full sm:w-48 lg:w-52 xl:w-56 bg-white">
      <div className="mb-8">
        <Typography variant="h5" className="mb-6 font-semibold text-gray-900">
          Shopping Options
        </Typography>

        <div className="border-t border-gray-200">
          <SectionHeader title="Style" section="style" />
          {expandedSections.style && (
            <div className="py-3 space-y-3 pl-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="traditional" className="rounded" />
                <label
                  htmlFor="traditional"
                  className="text-sm text-gray-800 font-light"
                >
                  Traditional
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="modern" className="rounded" />
                <label
                  htmlFor="modern"
                  className="text-sm text-gray-800 font-light"
                >
                  Modern
                </label>
              </div>
            </div>
          )}
        </div>

        <div>
          <SectionHeader title="Category" section="category" />
          {expandedSections.category && (
            <div className="py-3 space-y-3 pl-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="all-categories"
                  name="category"
                  checked={selectedCategory === ""}
                  onChange={() => onCategoryChange("")}
                />
                <label
                  htmlFor="all-categories"
                  className="text-sm text-gray-800 font-light"
                >
                  All Categories
                </label>
              </div>
              {categories?.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`category-${category}`}
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => onCategoryChange(category)}
                  />
                  <label
                    htmlFor={`category-${category}`}
                    className="text-sm  capitalize text-gray-800 font-light"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <SectionHeader title="Size" section="size" />
          {expandedSections.size && (
            <div className="py-3 space-y-3 pl-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="small" className="rounded" />
                <label
                  htmlFor="small"
                  className="text-sm text-gray-800 font-light"
                >
                  Small
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="medium" className="rounded" />
                <label
                  htmlFor="medium"
                  className="text-sm text-gray-800 font-light"
                >
                  Medium
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="large" className="rounded" />
                <label
                  htmlFor="large"
                  className="text-sm text-gray-800 font-light"
                >
                  Large
                </label>
              </div>
            </div>
          )}
        </div>

        <div>
          <SectionHeader title="Price" section="price" />
          {expandedSections.price && (
            <div className="py-3 space-y-3 pl-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="under-50" className="rounded" />
                <label
                  htmlFor="under-50"
                  className="text-sm text-gray-800 font-light"
                >
                  Under $50
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="50-100" className="rounded" />
                <label
                  htmlFor="50-100"
                  className="text-sm text-gray-800 font-light"
                >
                  $50 - $100
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="over-100" className="rounded" />
                <label
                  htmlFor="over-100"
                  className="text-sm text-gray-800 font-light"
                >
                  Over $100
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="mb-8">
          <SectionHeader title="Color" section="color" />
          {expandedSections.color && (
            <div className="py-3 space-y-3 pl-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="brown" className="rounded" />
                <label
                  htmlFor="brown"
                  className="text-sm text-gray-800 font-light"
                >
                  Brown
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="white" className="rounded" />
                <label
                  htmlFor="white"
                  className="text-sm text-gray-800 font-light"
                >
                  White
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="black" className="rounded" />
                <label
                  htmlFor="black"
                  className="text-sm text-gray-800 font-light"
                >
                  Black
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-8">
        <Typography
          variant="h6"
          className="mb-4 font-semibold text-lg text-gray-900"
        >
          Compare Products
          {isAuthenticated ? (
            <span className="text-gray-500 text-xs font-normal ml-1">
              (2 items)
            </span>
          ) : (
            <Lock className="inline h-4 w-4 ml-1 text-gray-400" />
          )}
        </Typography>

        {isAuthenticated ? (
          <div className="space-y-3">
            <div className="flex items-center">
              <button className="text-gray-800 hover:text-gray-900">
                <X className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-800 hover:text-gray-900 cursor-pointer underline px-1">
                Summit Watch
              </span>
            </div>
            <div className="flex items-center">
              <button className="text-gray-800 hover:text-gray-900">
                <X className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-800 hover:text-gray-900 cursor-pointer underline px-1">
                Cruise Dual Analog Watch
              </span>
            </div>

            <div className="mt-4 flex gap-2">
              <Button
                size="sm"
                className="flex-1 text-white font-medium bg-[#7DB800] hover:bg-[#6BA700]"
              >
                Compare
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-gray-600 border-gray-300 bg-white hover:bg-gray-50"
              >
                Clear All
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 p-3 rounded-lg border text-center">
            <Lock className="h-6 w-6 text-gray-400 mx-auto mb-2" />
            <Typography variant="small" className="text-gray-500 mb-3">
              Login to compare products
            </Typography>
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => (window.location.href = "/auth")}
            >
              Login
            </Button>
          </div>
        )}
      </div>

      <div>
        <Typography variant="h6" className="mb-3 font-medium text-gray-900">
          My Wish List
          {!isAuthenticated && (
            <Lock className="inline h-4 w-4 ml-1 text-gray-400" />
          )}
        </Typography>

        {isAuthenticated ? (
          <Typography
            variant="small"
            className="text-gray-500 text-sm font-light"
          >
            You have no items in your wish list.
          </Typography>
        ) : (
          <div className="bg-gray-50 p-3 rounded-lg border text-center">
            <Heart className="h-6 w-6 text-gray-400 mx-auto mb-2" />
            <Typography variant="small" className="text-gray-500 mb-3">
              Login to save your favorite items
            </Typography>
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => (window.location.href = "/auth")}
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
