import { Button } from "@/components/button.component";
import { Typography } from "@/components/typography.component";
import Image from "next/image";
import Link from "next/link";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export function Footer() {
  const footerLinks = [
    { name: "Policy", href: "/policy" },
    { name: "Term & Conditions", href: "/terms" },
    { name: "Help", href: "/help" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: FacebookIcon,
      href: "https://facebook.com",
      color: "hover:text-blue-500",
    },
    {
      name: "Twitter",
      icon: TwitterIcon,
      href: "https://twitter.com",
      color: "hover:text-blue-400",
    },
    {
      name: "Youtube",
      icon: YoutubeIcon,
      href: "https://youtube.com",
      color: "hover:text-red-500",
    },
    {
      name: "Google",
      icon: GoogleIcon,
      href: "https://google.com",
      color: "hover:text-blue-600",
    },
  ];

  return (
    <footer className="bg-[#2a2a2a] text-white py-8">
      <div className="container-lg mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
          <div className="order-2 lg:order-1 flex flex-wrap justify-center lg:justify-start items-center gap-4 md:gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm md:text-base text-white/80 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="SimpleWood logo"
                width={118}
                height={18}
                className="object-contain brightness-0 invert"
              />
            </Link>
          </div>

          <div className="order-3 lg:order-3 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-3">
            <span className="text-sm md:text-base text-white/80 whitespace-nowrap">
              Follow Us on Social
            </span>

            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 text-white/70 hover:bg-white/10 ${social.color} transition-all duration-200`}
                    asChild
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconComponent />
                      <span className="sr-only">{social.name}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="text-center">
            <Typography
              variant="small"
              className="text-xs md:text-sm text-white/60"
            >
              Copyright © Victoria Kui. All rights reserved.
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}
