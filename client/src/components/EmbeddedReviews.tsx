import axios from "axios";
import React, { useEffect, useState } from "react";
import link from "../assets/link.json";
import Card from "./EmbeddedReviewsStyle/Card";
import Grid from "./EmbeddedReviewsStyle/Grid";
import Carousel from "./EmbeddedReviewsStyle/Carousel";

interface Review {
  approved: boolean;
  compId: string;
  rating: number;
  username: string;
  review: string;
}

const EmbeddedReviews: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const compId = params.get("id") || "";
  const style = params.get("style") || "";
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.post(`${link.url}/get-review`, { compId });
        const approvedReviews = res.data.filter((rev: Review) => rev.approved);
        setReviews(approvedReviews);
      } catch (err) {
        console.log(err);
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
      {reviews.length > 0 ? (
        <>
          {style === "card" && <Card reviews={reviews} />}
          {style === "grid" && <Grid reviews={reviews} />}
          {style === "carousel" && <Carousel reviews={reviews} />}
        </>
      ) : (
        <p className="text-center text-gray-600">No reviews available.</p>
      )}
    </div>
  );
};

export default EmbeddedReviews;
