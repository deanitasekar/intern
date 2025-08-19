"use client";

import { Button } from "@/components/button.component";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card.component";
import { LogOut } from "lucide-react";

interface AuthContentProps {
  user: any;
  router: any;
  logout: () => void;
}

export function AuthenticatedView({ user, router, logout }: AuthContentProps) {
  return (
    <div className="max-w-md w-full">
      <Card className="border-0 shadow-lg">
        <CardHeader className="text-center space-y-4 pb-6">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-gray-600">
            You are already signed in as <strong>{user.username}</strong>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Button
              onClick={() => router.push("/products")}
              className="w-full h-12 bg-[#7DB800] hover:bg-[#6BA700] text-white font-medium rounded-lg transition-all duration-200"
            >
              Continue Shopping
            </Button>

            <Button
              onClick={logout}
              variant="outline"
              className="w-full h-12 border-gray-300 text-gray-600 hover:bg-red-50 hover:border-red-300 hover:text-red-600 font-medium rounded-lg transition-all duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}