import { CarProps } from "@/types/car.type";
import { FilterProps } from "@/types/filter.type";
import axios from "axios";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const response = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
      "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
    },
  });
  return response.data;
};

const createCarsUrl = (filters: FilterProps) => {
  const { manufacturer, year, model, limit, fuel } = filters;
  const baseUrl = "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars";
  const params = new URLSearchParams();

  if (manufacturer) params.append("make", manufacturer);
  if (year) params.append("year", year.toString());
  if (model) params.append("model", model);
  if (limit) params.append("limit", limit.toString());
  if (fuel) params.append("fuel_type", fuel);

  return `${baseUrl}?${params.toString()}`;
};

export function useCars(filters: FilterProps) {
  const hasFilters =
    filters.manufacturer ||
    filters.year ||
    filters.model ||
    filters.fuel ||
    filters.limit;

  const url = hasFilters ? createCarsUrl(filters) : null;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    shouldRetryOnError: true,
    errorRetryCount: 3,
    dedupingInterval: 60000,
  });

  return {
    cars: data,
    isLoading: hasFilters ? isLoading : false,
    isError: hasFilters ? error : false,
    mutate,
  };
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append(
    "customer",
    process.env.NEXT_PUBLIC_IMAGIN_API_KEY || ""
  );
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};

export const calculateCarRent = (city_mpg: number, year: number) => {
  if (typeof city_mpg !== "number" || city_mpg <= 0) {
    const basePricePerDay = 50;
    const ageFactor = 0.05;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
    return (basePricePerDay + ageRate).toFixed(0);
  }

  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  const newSearchParams = new URLSearchParams(window.location.search);

  newSearchParams.delete(type.toLocaleLowerCase());

  const newPathname = `${
    window.location.pathname
  }?${newSearchParams.toString()}`;
  return newPathname;
};
