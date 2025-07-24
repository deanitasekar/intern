export interface Review {
  name: string;
  role: string;
  review: string;
  rating: number;
  date: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  distribution: Record<number, number>;
}