"use client";

import { EmailInput } from "@/components/newsletter-input.component";
import { Typography } from "@/components/typography.component";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <section className="pb-12">
      <div className="container-lg">
        <div className="max-w-6xl mx-auto bg-[#ebefe5] rounded-2xl px-28 py-10  lg:px-30 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3 space-y-3">
              <Typography
                variant="h3"
                className="text-xl font-semibold text-gray-900"
              >
                Join our newsletter for £10 off
              </Typography>

              <Typography
                variant="p"
                className="text-gray-600 leading-relaxed text-sm lg:text-base max-w-2xl"
              >
                We&apos;ll email you a voucher worth £10 off your first order over
                £50. By subscribing you agree to our Terms & Conditions and
                Privacy & Cookies Policy.
              </Typography>
            </div>

            <div className="lg:col-span-2">
              <EmailInput
                placeholder="Enter your email address"
                value={email}
                onChange={setEmail}
                onSubmit={handleSubmit}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
