"use client";

import React from "react";
import ReviewComponent from "./review.component";
import UseReview from "../_hooks/use-review.hook";

const AboutMain: React.FC = () => {
  const { reviews, loading, error, getAverageRating, getTotalReviews } =
    UseReview();

  return (
    <div className="min-h-screen">
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-black mb-10 justify-center text-center">
            About GoApp
          </h1>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                GoApp exists to help people work smarter, not harder. With a
                clean interface, fast performance, and secure authentication, we
                aim to make productivity simple and accessible for everyone.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you're a student, a freelancer, or a professional in a
                large company, GoApp delivers a consistent and efficient
                experience to help you manage your daily tasks and routines.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We strive to become the leading productivity platform across
                Asia and beyond, focusing on speed, simplicity, and evolving
                technology.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By adopting lightweight technologies like Next.js and
                mobile-first design, we’re committed to creating a productivity
                ecosystem that works for everyone — from urban professionals to
                those in remote areas with limited connectivity.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ReviewComponent
        reviews={reviews}
        loading={loading}
        error={error}
        averageRating={getAverageRating()}
        totalReviews={getTotalReviews()}
      />
    </div>
  );
};

export default AboutMain;
