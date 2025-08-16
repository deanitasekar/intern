"use client";

import { useAuthGuard } from "@/components/auth-middleware.component";
import { Loader2 } from "lucide-react";
import { PagesCards } from "./pages-cards.component";
import { PagesContent } from "./pages-content.component";
import { PagesHeader } from "./pages-header.component";
import { PagesRelated } from "./pages-related.component";

export default function PagesMain() {
  const { isAllowed, isLoading } = useAuthGuard();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#7DB800]" />
          <p className="text-gray-600">Checking access permissions</p>
        </div>
      </div>
    );
  }

  if (!isAllowed) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <PagesHeader title="Simple Wood Chair Collection" />
      
      <PagesContent/>
      
      <PagesRelated />
      
      <PagesCards />
    </div>
  );
}