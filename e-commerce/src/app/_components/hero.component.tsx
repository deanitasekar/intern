'use client';

import { Button } from "@/components/button.component";
import { Typography } from "@/components/typography.component";
import ShinyText from "@/components/shiny-text.component";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('/hero.png')",
      }}
    >
      <div className="container-lg mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="space-y-8 text-white relative">
            <div className="hidden lg:flex flex-col space-y-4 absolute top-0">
              <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z" />
                </svg>
              </div>
              <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </div>
              <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </div>
            </div>

            <div className="max-w-[20rem] pl-16">
              <ShinyText
                text="SimpleWood Chair Collection"
                className="text-[34px] leading-[113%] font-bold mb-6"
                speed={3}
                disabled={false}
              />

              <Typography variant="lead" className="text-sm text-white/90 mb-8">
                Find hand-curated collections that fit your style, space, and
                budget.
              </Typography>

              <Button
                size="lg"
                className="bg-[#7DB800] hover:bg-[#6FA500] text-white px-8 py-4 text-sm font-semibold group"
              >
                SHOP NOW
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="absolute -bottom-8 left-0 flex space-x-3 pl-16">
              <div className="w-3 h-3 bg-[#7DB800] rounded-full"></div>
              <div className="w-3 h-3 bg-white/30 rounded-full cursor-pointer hover:bg-white/50 transition-colors"></div>
              <div className="w-3 h-3 bg-white/30 rounded-full cursor-pointer hover:bg-white/50 transition-colors"></div>
              <div className="w-3 h-3 bg-white/30 rounded-full cursor-pointer hover:bg-white/50 transition-colors"></div>
            </div>
          </div>

          <div className="relative hidden lg:flex justify-end">
            <div className="flex gap-3 items-start">
              <div className="flex flex-col gap-3 -mt-2">
                <div className="relative overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <img
                    src="/hero-1.png"
                    alt="Chair Collection 1"
                    className="object-cover w-44 h-60"
                  />
                </div>

                <div className="relative overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <img
                    src="/hero-2.png"
                    alt="Chair Collection 2"
                    className="object-cover w-44 h-60"
                  />
                </div>
              </div>

              <div className="relative overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 mt-4">
                <img
                  src="/hero-3.png"
                  alt="Featured Chair"
                  className="object-cover w-72 h-[440px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
