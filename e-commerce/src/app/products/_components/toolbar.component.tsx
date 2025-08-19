"use client";

import { Button } from "@/components/button.component";
import { Typography } from "@/components/typography.component";
import { ChevronDown } from "lucide-react";

interface ToolbarProps {
  itemCount: number;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  sortBy: "asc" | "desc";
  onSortChange: (sort: "asc" | "desc") => void;
}

const GridIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    className={className}
  >
    <g fill="currentColor">
      <rect x="1" y="1" width="4" height="4" fill="currentColor" />
      <rect x="6" y="1" width="4" height="4" fill="currentColor" />
      <rect x="11" y="1" width="4" height="4" fill="currentColor" />

      <rect x="1" y="6" width="4" height="4" fill="currentColor" />
      <rect x="6" y="6" width="4" height="4" fill="currentColor" />
      <rect x="11" y="6" width="4" height="4" fill="currentColor" />

      <rect x="1" y="11" width="4" height="4" fill="currentColor" />
      <rect x="6" y="11" width="4" height="4" fill="currentColor" />
      <rect x="11" y="11" width="4" height="4" fill="currentColor" />
    </g>
  </svg>
);

const ListIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    className={className}
  >
    <g fill="currentColor">
      <rect x="1" y="1" width="6" height="6" fill="currentColor" />
      <rect x="8" y="1" width="6" height="2.7" fill="currentColor" />
      <rect x="8" y="4.2" width="6" height="2.8" fill="currentColor" />
      <rect x="1" y="8" width="6" height="6" fill="currentColor" />
      <rect x="8" y="8" width="6" height="2.7" fill="currentColor" />
      <rect x="8" y="11.2" width="6" height="2.8" fill="currentColor" />
    </g>
  </svg>
);

export function Toolbar({
  itemCount,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
}: ToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white px-4 py-2 gap-4 sm:gap-0">
      <div className="flex items-center space-x-4">
        <div className="flex">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`w-8 h-8 p-0 flex items-center justify-center border-0 ${
              viewMode === "grid"
                ? "bg-[#DEDEDE] text-[#7D7D7D]"
                : "bg-[#F0F0F0] text-[#7D7D7D]"
            }`}
          >
            <GridIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`w-8 h-8 p-0 flex items-center justify-center border-0 ${
              viewMode === "list"
                ? "bg-[#DEDEDE] text-[#7D7D7D]"
                : "bg-[#F0F0F0] text-[#7D7D7D]"
            }`}
          >
            <ListIcon className="h-4 w-4" />
          </button>
        </div>

        <Typography variant="small" className="text-gray-600 text-sm font-normal">
          Items 1-{Math.min(20, itemCount)} of {itemCount}
        </Typography>
      </div>

      <div className="flex items-center space-x-3">
        <Typography variant="small" className="text-gray-600 text-sm font-normal">
          Sort by
        </Typography>

        <div className="relative">
          <select
            value={sortBy === "asc" ? "position" : "price"}
            onChange={(e) => {
              if (e.target.value === "position") {
                onSortChange("asc");
              } else {
                onSortChange("desc");
              }
            }}
            className="appearance-none bg-gray-200 px-3 py-1.5 pr-8 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 min-w-[100px]"
          >
            <option value="position">Position</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className={`transform transition-transform ${
            sortBy === "desc" ? "rotate-180" : ""
          }`}
        >
          <path fill="currentColor" d="M15 20H9v-8H4.16L12 4.16L19.84 12H15z" />
        </svg>
      </div>
    </div>
  );
}
