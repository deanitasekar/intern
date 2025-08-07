"use client";

import { ShowMoreProps } from "@/types/show-more.type";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import CustomButton from "../../components/custom-button.component";

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = useCallback((type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    params.set(type, value);
    
    return `${window.location.pathname}?${params.toString()}`;
  }, [searchParams]);

  const handleNavigation = () => {
    try {
      const currentLimit = Number(searchParams.get("limit")) || 10;
      const newLimit = currentLimit + 10;
      
      const newPathname = updateSearchParams("limit", `${newLimit}`);
      
      router.push(newPathname, { scroll: false });
    } catch (error) {
      console.error("Navigation error:", error);
      
      const currentLimit = Number(searchParams.get("limit")) || 10;
      const newLimit = currentLimit + 10;
      const params = new URLSearchParams(searchParams.toString());
      params.set("limit", `${newLimit}`);
      
      window.location.href = `${window.location.pathname}?${params.toString()}`;
    }
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          btnType="button"
          title="Show More"
          containerStyles="bg-primary-blue rounded-full text-white hover:bg-blue-700 transition-colors duration-200 px-8 py-3"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;