"use client";

import { Typography } from "@/components/typography.component";
import { Plus, X } from "lucide-react";
import { useState } from "react";

const StarIcon = ({ className = "h-4 w-4", filled = false }: { className?: string; filled?: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    className={className}
  >
    <path 
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={filled ? "0" : "1"}
      d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"
    />
  </svg>
);

interface AccordionItem {
  id: string;
  title: string;
  content?: string;
  reviews?: ReviewItem[];
}

interface ReviewItem {
  id: string;
  title: string;
  content: string;
  rating: number;
  author: string;
  date: string;
}

const reviewsData: ReviewItem[] = [
  {
    id: "1",
    title: "Customer Reviews",
    content:
      "As an ocean lifeguard, I've used several types of lower grade binos in the past and eventually just gave up on using binos all together because they would always have issues.",
    rating: 3,
    author: "Gala",
    date: "3/25/19",
  },
  {
    id: "2",
    title: "Rides up during workouts",
    content:
      "Rides up a bit during workouts but otherwise it's pretty comfy! I like the hood.",
    rating: 3,
    author: "Gala",
    date: "3/25/19",
  },
  {
    id: "3",
    title: "Rides up during workouts",
    content:
      "Rides up a bit during workouts but otherwise it's pretty comfy! I like the hood.",
    rating: 3,
    author: "Gala",
    date: "3/25/19",
  },
];

const accordionData: AccordionItem[] = [
  {
    id: "details",
    title: "Details",
    content:
      "This premium wooden chair combines traditional craftsmanship with modern design sensibilities. Made from sustainable hardwood with a smooth finish that highlights the natural grain patterns. Perfect for dining rooms, kitchens, or any space that values both comfort and style.",
  },
  {
    id: "sizes",
    title: "Sizes",
    content:
      "Height: 32 inches (81 cm) \nWidth: 16 inches (41  \nDepth: 18 inches (46  \nSeat Height: 18 inches (46 cm) \nWeight capacity: 250 lbs (113 kg) \nSuitable for standard dining table heights of 28-30 inches.",
  },
  {
    id: "care",
    title: "Care Instructions",
    content:
      "Clean with a soft, damp cloth and mild soap. Avoid harsh chemicals and abrasive materials. For deeper cleaning, use wood-specific cleaners following manufacturer instructions. Periodically treat with wood conditioner to maintain finish.",
  },
  {
    id: "quality",
    title: "Quality and environmental information",
    content:
      "Crafted from FSC-certified sustainable hardwood sourced from responsibly managed forests. Finished with low-VOC, environmentally friendly stains and sealers. Each chair is individually inspected for quality before shipping.",
  },
  {
    id: "packing",
    title: "Packing Information",
    content:
      "Standard shipping: 5-7 business days \nExpress shipping: 2-3 business days \nFree shipping on orders over $75 \nItems ship within 1-2 business days of order placement and tracking information provided via email.",
  },
  {
    id: "instructions",
    title: "Instructions and documents",
    content:
      "Assembly required - includes all necessary hardware and tools. Step-by-step illustrated assembly guide included. Average assembly time: 15-20 minutes. Digital instruction manual available for download. Customer support available for assembly questions.",
  },
  {
    id: "availability",
    title: "Product Availability",
    content:
      "In stock and ready to ship. This item is part of our core collection and is typically available year-round. Limited edition colors may have seasonal availability. Back-order notification available if temporarily out of stock.",
  },
  {
    id: "reviews",
    title: "Reviews",
    reviews: reviewsData,
  },
];

export function ProductIdDetail() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "text-orange-400" : "text-gray-300"
            }`}
            filled={i < rating}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="space-y-2">
        {accordionData.map((item) => {
          const isOpen = openItems.includes(item.id);

          return (
            <div key={item.id} className="border border-gray-200">
              <button
                onClick={() => toggleItem(item.id)}
                className={`w-full px-4 py-4 text-left flex items-center transition-colors ${
                  isOpen ? "bg-gray-100" : "bg-white hover:bg-gray-50"
                }`}
              >
                <div className="flex-shrink-0 mr-4">
                  {isOpen ? (
                    <X className="h-5 w-5 text-gray-600" />
                  ) : (
                    <Plus className="h-5 w-5 text-gray-600" />
                  )}
                </div>
                <Typography variant="h6" className="font-medium text-gray-800">
                  {item.title}
                </Typography>
              </button>

              {isOpen && (
                <div className="px-4 py-4">
                  {item.content && (
                    <Typography
                      variant="p"
                      className="text-gray-600 leading-relaxed ml-9 whitespace-pre-line"
                    >
                      {item.content}
                    </Typography>
                  )}

                  {item.reviews && (
                    <div className="ml-9">
                      <h3 className="text-lg font-medium text-gray-700 mb-6">
                        Customer Reviews
                      </h3>
                      <div className="space-y-6">
                        {item.reviews.map((review) => (
                          <div
                            key={review.id}
                            className="border-b border-gray-200 pb-4 last:border-b-0"
                          >
                            <div className="mb-3">
                              <p className="text-gray-800 leading-relaxed">
                                {review.content}
                              </p>
                            </div>

                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-sm text-gray-600">
                                    Rating
                                  </span>
                                  {renderStars(review.rating)}
                                </div>

                                {review.id !== "1" && (
                                  <h4 className="font-medium text-gray-800 mt-2">
                                    {review.title}
                                  </h4>
                                )}
                              </div>

                              <div className="text-right">
                                <p className="text-sm text-gray-500">
                                  Review by {review.author} {review.date}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}