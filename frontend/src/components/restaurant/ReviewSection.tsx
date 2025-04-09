"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { formatDistance } from "date-fns";
import { StarIcon } from "@heroicons/react/24/solid";

interface Review {
  _id: string;
  user: {
    _id: string;
    displayName: string;
    profileImage?: string;
  };
  restaurant: string;
  rating: number;
  comment: string;
  visitDate: string;
  createdAt: string;
}

interface ReviewSectionProps {
  restaurantId: string;
}

export default function ReviewSection({ restaurantId }: ReviewSectionProps) {
  const { user, isAuthenticated, login } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split("T")[0]);
  const [submitting, setSubmitting] = useState(false);
  const [userHasReviewed, setUserHasReviewed] = useState(false);

  // Fetch reviews for the restaurant
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/reviews/restaurant/${restaurantId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();
        setReviews(data);

        // Check if the current user has already reviewed this restaurant
        if (isAuthenticated && user) {
          const hasReviewed = data.some((review: Review) => review.user._id === user.id);
          setUserHasReviewed(hasReviewed);
        }
      } catch (error) {
        setError("Error loading reviews");
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [restaurantId, isAuthenticated, user]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      login();
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          restaurantId,
          rating,
          comment,
          visitDate: new Date(visitDate).toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit review");
      }

      const newReview = await response.json();
      setReviews([newReview, ...reviews]);
      setUserHasReviewed(true);

      // Reset form
      setRating(5);
      setComment("");
      setVisitDate(new Date().toISOString().split("T")[0]);
    } catch (error: any) {
      setError(error.message || "Error submitting review");
      console.error("Error submitting review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Render star ratings
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <StarIcon key={index} className={`h-5 w-5 ${index < rating ? "text-yellow-400" : "text-gray-300"}`} />
    ));
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Reviews</h2>

      {!userHasReviewed && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">
            {isAuthenticated ? "Write a Review" : "Sign in to Write a Review"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                    disabled={!isAuthenticated}
                  >
                    <StarIcon className={`h-8 w-8 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="comment" className="block text-gray-700 mb-2">
                Comment
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Share your experience..."
                disabled={!isAuthenticated}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="visitDate" className="block text-gray-700 mb-2">
                Date of Visit
              </label>
              <input
                type="date"
                id="visitDate"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!isAuthenticated}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors disabled:bg-gray-400"
              disabled={submitting || (!isAuthenticated && false)}
            >
              {isAuthenticated ? (submitting ? "Submitting..." : "Submit Review") : "Sign in to Review"}
            </button>

            {error && <p className="mt-3 text-red-500">{error}</p>}
          </form>
        </div>
      )}

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600" />
          </div>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                    {review.user.profileImage ? (
                      <img
                        src={review.user.profileImage}
                        alt={review.user.displayName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-blue-600 text-white text-lg font-semibold">
                        {review.user.displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <h4 className="font-medium">{review.user.displayName}</h4>
                  <div className="flex items-center mt-1 mb-2">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="ml-2 text-sm text-gray-500">
                      {formatDistance(new Date(review.createdAt), new Date(), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Visited on {new Date(review.visitDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-100 rounded-lg p-6 text-center">
            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          </div>
        )}
      </div>
    </div>
  );
}
