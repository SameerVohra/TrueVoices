import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { useState, useEffect } from 'react';
import axios from 'axios';
import link from "../assets/link.json";

interface compDetails {
  compName: string;
  about: string;
  compURL: string;
}

const AddReview: React.FC = () => {
  const [rating, setRating] = useState<number | null>(0);
  const [review, setReview] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [compDetails, setCompDetails] = useState<compDetails>();
  const { compName } = useParams<{ compName: string }>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.post(`${link.url}/get-companydetails`, {
        compId: id
      });
      setCompDetails(res.data.comp);
    };
    fetchData();
  }, [id]);

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
      setUsername("");
      setReview("");
      setRating(0);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-gray-100 to-gray-200">
      {compDetails && (
        <div className="mb-6 w-full max-w-lg bg-white shadow-md rounded-lg p-6 transition-transform transform hover:scale-105">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{compDetails.compName}</h1>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {compDetails.about}
          </p>
          <a
            href={compDetails.compURL}
            className="text-blue-500 font-semibold hover:underline text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Website
          </a>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">
        Add Review for {compName}
      </h1>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105">
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Your Name"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
          <textarea
            placeholder="Enter your review"
            value={review}
            onChange={(e) => setReview(e.currentTarget.value)}
            className="w-full p-3 h-28 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-shadow"
          />
          <Rating
            name="simple-controlled"
            value={rating}
            className="mb-4"
            onChange={(_, val) => setRating(val)}
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
