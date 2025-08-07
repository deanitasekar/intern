"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCars } from "@/services/car.service";

export interface FilterState {
  manufacturer: string;
  year: number;
  fuel: string;
  limit: number;
  model: string;
}

export const useHome = () => {
  const searchParams = useSearchParams();
  const [shouldFetch, setShouldFetch] = useState(false);

  const filters: FilterState = {
    manufacturer: searchParams.get("manufacturer") || "",
    year: parseInt(searchParams.get("year") || ""),
    fuel: searchParams.get("fuel") || "",
    limit: parseInt(searchParams.get("limit") || ""),
    model: searchParams.get("model") || "",
  };

  const hasActiveFilters =
    filters.manufacturer ||
    filters.year ||
    filters.fuel ||
    filters.limit ||
    filters.model;

  useEffect(() => {
    if (hasActiveFilters && !shouldFetch) {
      setShouldFetch(true);
    }
  }, [
    filters.manufacturer,
    filters.year,
    filters.fuel,
    filters.limit,
    filters.model,
    shouldFetch,
  ]);

  const fetchParams = shouldFetch
    ? filters
    : {
        manufacturer: "",
        year: 0,
        fuel: "",
        limit: 0,
        model: "",
      };

  const { cars: allCars, isLoading, isError, mutate } = useCars(fetchParams);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  const showResults = shouldFetch && !isDataEmpty;
  const showNoResults = shouldFetch && isDataEmpty;
  const showInitialState = !shouldFetch;

  return {
    filters,
    allCars,
    isLoading,
    isError,
    shouldFetch,
    isDataEmpty,
    showResults,
    showNoResults,
    showInitialState,
    hasActiveFilters,
    mutate,
  };
};
