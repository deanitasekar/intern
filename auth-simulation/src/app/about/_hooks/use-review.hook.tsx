import { useEffect, useState } from 'react';
import { Review } from '../_types/review.type';
import { reviewsData } from '@/data/about';
import getErrorMessage from '@/utils/error.util';

interface UseReviewsReturn {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  getAverageRating: () => string;
  getTotalReviews: () => number;
  getReviewsByRating: (rating: number) => Review[];
}

const UseReview = (): UseReviewsReturn => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async (): Promise<void> => {
      try {
        setLoading(true);
        setReviews(reviewsData);
        setError(null);
      } catch (error) {
        setError('Failed to load reviews');
        console.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const getAverageRating = (): string => {
    if (reviews.length === 0) return '0.0';
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getTotalReviews = (): number => reviews.length;

  const getReviewsByRating = (rating: number): Review[] => {
    return reviews.filter(review => review.rating === rating);
  };

  return {
    reviews,
    loading,
    error,
    getAverageRating,
    getTotalReviews,
    getReviewsByRating,
  };
};

export default UseReview;