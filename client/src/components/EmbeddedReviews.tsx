import axios from "axios";
import React, { useEffect, useState } from "react";
import link from "../assets/link.json";
import Rating from "@mui/material/Rating";

interface Review {
  approved: boolean;
  compId: string;
  rating: number;
  username: string;
  review: string;
}

const EmbeddedReviews: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const compId = params.get("id") || ""; // Get the ID from the URL
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token: string | null = localStorage.getItem("token");
        const res = await axios.post(
          `${link.url}/get-review`,
          { compId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const approvedReviews = res.data.filter((rev: Review) => rev.approved);
        setReviews(approvedReviews);
      } catch (err) {
        setError("Failed to fetch reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [compId]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Embedded Reviews</h1>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{r.username}</h2>
              <p className="text-yellow-500 font-medium mb-4">
                Rating: <Rating name="read-only" value={r.rating} readOnly />
              </p>
              <p className="text-gray-600 italic">"{r.review}"</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No reviews available.</p>
      )}
    </div>
  );
};

export default EmbeddedReviews;
