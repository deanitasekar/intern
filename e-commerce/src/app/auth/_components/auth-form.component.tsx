"use client";

import { Button } from "@/components/button.component";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card.component";
import { Input } from "@/components/input.component";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

interface SignInFormProps {
  isLogin: boolean;
  credentials: any;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
  error: string | null;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fillDemoCredentials: () => void;
  toggleAuthMode: () => void;
  setIsLogin: (login: boolean) => void;
}

export function SignInForm({
  isLogin,
  credentials,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  error,
  isLoading,
  handleSubmit,
  handleInputChange,
  fillDemoCredentials,
  toggleAuthMode,
  setIsLogin,
}: SignInFormProps) {
  return (
    <div className="max-w-md w-full">
      <Card className="border-0 shadow-lg">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-xl font-semibold text-center text-gray-800">
            {isLogin ? "Sign In" : "Create an Account"}
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            {isLogin
              ? "Enter your credentials to continue"
              : "Fill in your information to get started"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {!isLogin && (
              <>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Personal Information
                  </h3>

                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-medium text-gray-700"
                    >
                      First name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required={!isLogin}
                      value={credentials.firstName}
                      onChange={handleInputChange}
                      placeholder="daisy.watson@example.com"
                      className="h-12 border-gray-300 focus:border-[#7DB800] focus:ring-[#7DB800]/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required={!isLogin}
                      value={credentials.lastName}
                      onChange={handleInputChange}
                      placeholder="Password"
                      className="h-12 border-gray-300 focus:border-[#7DB800] focus:ring-[#7DB800]/20"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="newsletter"
                      name="newsletter"
                      checked={credentials.newsletter}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#7DB800] focus:ring-[#7DB800] border-gray-300 rounded"
                    />
                    <label
                      htmlFor="newsletter"
                      className="text-sm text-gray-600"
                    >
                      Sign up for Newsletter
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Email & Password
                  </h3>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required={!isLogin}
                        value={credentials.email}
                        onChange={handleInputChange}
                        placeholder="daisy.watson@example.com"
                        className="pl-10 h-12 border-gray-300 focus:border-[#7DB800] focus:ring-[#7DB800]/20"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {isLogin && (
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={credentials.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                    className="pl-10 h-12 border-gray-300 focus:border-[#7DB800] focus:ring-[#7DB800]/20"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password {!isLogin && <span className="text-red-500">*</span>}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={credentials.password}
                  onChange={handleInputChange}
                  placeholder={!isLogin ? "Password" : "Enter your password"}
                  className="pl-10 pr-12 h-12 border-gray-300 focus:border-[#7DB800] focus:ring-[#7DB800]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required={!isLogin}
                    value={credentials.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="pl-10 pr-12 h-12 border-gray-300 focus:border-[#7DB800] focus:ring-[#7DB800]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {isLogin && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="text-sm text-[#7DB800] hover:text-[#6BA700] underline decoration-none underline-offset-2 transition-colors"
                >
                  Use demo credentials
                </button>
              </div>
            )}

            <div className="space-y-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#7DB800] hover:bg-[#6BA700] text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    {isLogin ? "Signing in..." : "Creating Account..."}
                  </>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create an Account"
                )}
              </Button>

              {!isLogin && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsLogin(true)}
                  className="w-full h-12 border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-lg transition-all duration-200"
                >
                  Back
                </Button>
              )}
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500">or</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={toggleAuthMode}
                className="font-medium text-[#7DB800] hover:text-[#6BA700] transition-colors"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          By {isLogin ? "signing in" : "creating an account"}, you agree to our
          Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
