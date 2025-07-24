"use client";

import React from "react";
import { Star, Users, Award, Calendar } from "lucide-react";
import UseReview from "../_hooks/use-review.hook";
import { Review } from "../_types/review.type";
import { reviewsData } from "@/data/about";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-xl font-semibold text-black">{review.name}</h4>
          <p className="text-gray-600">{review.role}</p>
        </div>
        <StarRating rating={review.rating} />
      </div>

      <p className="text-gray-600 mb-4 leading-relaxed">"{review.review}"</p>

      <div className="flex items-center text-gray-600">
        <Calendar className="w-4 h-4 mr-1" />
        {formatDate(review.date)}
      </div>
    </div>
  );
};

interface ReviewStatsProps {
  reviews: Review[];
  averageRating: string;
  totalReviews: number;
}

const ReviewStats: React.FC<ReviewStatsProps> = ({
  reviews,
  averageRating,
  totalReviews,
}) => {
  const getRatingDistribution = (): Record<number, number> => {
    const distribution: Record<number, number> = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };
    reviews.forEach((review) => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const distribution = getRatingDistribution();

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            User Satisfaction at a Glance
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl text-black font-semibold mb-2">
              {averageRating}
            </h3>
            <p className="text-gray-600">Average Rating</p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl text-black font-semibold mb-2">
              {totalReviews}
            </h3>
            <p className="text-gray-600">Total Reviews</p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl text-black font-semibold mb-2">
              {Math.round((distribution[5] / totalReviews) * 100)}%
            </h3>
            <p className="text-gray-600">5 Star Reviews</p>
          </div>
        </div>

        <div className="mt-16 max-w-2xl mx-auto">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center mb-4">
              <span className="w-3 text-gray-600">{rating}</span>
              <Star className="w-4 h-4 text-yellow-400 fill-current mx-2" />
              <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      totalReviews > 0
                        ? (distribution[rating] / totalReviews) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
              <span className="w-8 text-gray-600">{distribution[rating]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReviewComponent: React.FC = () => {
  const {
    reviews,
    loading,
    error,
    getAverageRating,
    getTotalReviews,
  } = UseReview();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ReviewStats
        reviews={reviews}
        averageRating={getAverageRating()}
        totalReviews={getTotalReviews()}
      />

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600">
              User satisfaction is our top priority, here are some of the latest
              reviews from people who’ve experienced the simplicity and speed of
              GoApp
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviewsData.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
