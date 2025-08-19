"use client";

import { useAuthForm } from "../_hooks/auth-form.hook";
import Link from "next/link";
import Image from "next/image";
import { SignInForm } from "./auth-form.component";
import { AuthenticatedView } from "./authenticated.component";
import { useEffect, useState } from "react";

export default function AuthMain() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  const {
    isLogin,
    setIsLogin,
    credentials,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    error,
    isLoading,
    isAuthenticated,
    user,
    router,
    logout,
    handleSubmit,
    handleInputChange,
    fillDemoCredentials,
    toggleAuthMode,
  } = useAuthForm();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const offsetX = ((mouseX - centerX) / centerX) * 8;
    const offsetY = ((mouseY - centerY) / centerY) * 6;

    setMousePosition({ x: offsetX, y: offsetY });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLogoTransform = () => {
    const scrollOffset = scrollY * 0.1;
    return `translate(${mousePosition.x}px, ${
      mousePosition.y - scrollOffset
    }px)`;
  };

  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen flex">
        <div
          className="hidden lg:flex lg:w-1/2 relative"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/hero.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <Link href="/" className="flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="SimpleWood logo"
                  width={236}
                  height={36}
                  className="object-contain brightness-0 invert transition-transform duration-300 ease-out"
                  style={{
                    transform: getLogoTransform(),
                  }}
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center">
          <div className="container-lg mx-auto w-full flex items-center justify-center px-6 mt-10 sm:px-6 lg:px-8">
            <AuthenticatedView user={user} router={router} logout={logout} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <div
        className="hidden lg:flex lg:w-1/2 relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <Link href="/" className="flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="SimpleWood logo"
                width={236}
                height={36}
                className="object-contain brightness-0 invert transition-transform duration-300 ease-out"
                style={{
                  transform: getLogoTransform(),
                }}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="container-lg mx-auto w-full flex items-center justify-center px-6 mt-10 sm:px-6 lg:px-8">
          <SignInForm
            isLogin={isLogin}
            credentials={credentials}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            error={error}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            fillDemoCredentials={fillDemoCredentials}
            toggleAuthMode={toggleAuthMode}
            setIsLogin={setIsLogin}
          />
        </div>
      </div>
    </div>
  );
}
