"use client";

import { Breadcrumb } from "@/components/breadcrumb.component";
import { Typography } from "@/components/typography.component";

interface ProductPageHeaderProps {
  title?: string;
}

export function PagesHeader({
  title = "Simple Wood Chair Collection",
}: ProductPageHeaderProps) {
  const breadcrumbItems = [{ label: title }];

  return (
    <section
      className="relative min-h-[40vh] flex items-center justify-start bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('/hero.png')",
      }}
    >
      <div className="container-lg w-full px-6 py-8">
        <div className="max-w-7xl">
          <div className="mb-2">
            <Breadcrumb
              items={breadcrumbItems}
              variant="light"
              separator=" > "
              showHome={true}
              className="text-xs font-normal tracking-wide"
            />
          </div>
          <Typography
            variant="h1"
            className="text-4xl md:text-5xl lg:text-6xl text-white font-light"
          >
            {title}
          </Typography>
        </div>
      </div>
    </section>
  );
}
