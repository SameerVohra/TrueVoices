import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import axios from 'axios';
import link from "../assets/link.json";

const AddReview: React.FC = () => {
  const [rating, setRating] = useState<number | null>(0);
  const [review, setReview] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { compName } = useParams<{ compName: string }>();
  const { id } = useParams<{ id: string }>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!username || !review || !rating) {
      setError("Please fill in all fields and provide a rating.");
      return;
    }

    try {
      const res = await axios.post(`${link.url}/add-review`, {
        name: username,
        review: review,
        stars: rating,
        compId: id,
      });

      setSuccess("Review submitted successfully!");
      console.log(res);

      setUsername("");
      setReview("");
      setRating(0);
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">
        Add Review for {compName}
      </h1>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}

      
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Enter your review"
            value={review}
            onChange={(e) => setReview(e.currentTarget.value)}
            className="w-full p-3 h-28 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <Rating
            name="simple-controlled"
            value={rating}
            className="mb-4"
            onChange={(_, val) => setRating(val)}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
