"use client";

import { Button } from "@/components/button.component";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card.component";
import { useAuth } from "@/hooks/use-auth.hook";
import {
  Loader2,
  Lock,
  LogIn,
  ShieldAlert,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function RestrictedMain() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const redirectUrl = searchParams.get("redirect") || "/";

  const [pageInfo, setPageInfo] = useState({
    title: "Restricted Access",
    description: "This page requires authentication",
    icon: <Lock className="h-8 w-8" />,
  });

  const handleLoginRedirect = () => {
    const loginUrl = `/auth?redirect=${encodeURIComponent(redirectUrl)}`;
    console.log("🔄 Redirecting to login:", loginUrl);
    router.push(loginUrl);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#7DB800]" />
          <p className="text-gray-600">Checking authentication</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
      style={{ paddingTop: "4rem" }}
    >
      <div className="w-full max-w-md space-y-6">
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
              <ShieldAlert className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Access Restricted
              </CardTitle>
              <CardDescription className="text-gray-600">
                You need to be logged in to access this content
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">
                With an account, you can access:
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-[#7DB800] rounded-full"></div>
                  <span>Complete product catalog and detailed information</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-[#7DB800] rounded-full"></div>
                  <span>Shopping cart and secure checkout process</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-[#7DB800] rounded-full"></div>
                  <span>Exclusive sales, offers, and member-only content</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-[#7DB800] rounded-full"></div>
                  <span>Company pages, support, and customer service</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-[#7DB800] rounded-full"></div>
                  <span>Design elements and premium features</span>
                </li>
              </ul>
            </div>
          </CardContent>

          <CardFooter className="space-y-3">
            <Button
              onClick={handleLoginRedirect}
              className="w-full bg-[#7DB800] hover:bg-[#6BA700] text-white h-12"
              size="lg"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login to Continue
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}