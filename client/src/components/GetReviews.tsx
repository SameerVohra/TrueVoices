import axios from 'axios';
import React, { useEffect, useState } from 'react';
import link from "../assets/link.json";
import Rating from '@mui/material/Rating';
import { GenerateURL } from './GenerateURL';
import { useParams } from 'react-router-dom';

interface revData {
  username: string;
  rating: number;
  review: string;
}

const GetReviews: React.FC = () => {
  const params = new URLSearchParams(location.search);
  const compId = params.get("id");
  const { compName } = useParams<{ compName: string }>();
  const [reviews, setReviews] = useState<revData[]>([]);
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);
  const [compURL, setCompURL] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");
    setCompURL(GenerateURL({ compId: compId, compName: compName }));
    const getRev = async () => {
      try {
        const res = await axios.post(`${link.url}/get-review`, 
          { compId: compId }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReviews(res.data.company);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    getRev();
  }, [compId]);

  const toggleShowMore = (index: number) => {
    setExpandedReviews((prev) => 
      prev.includes(index) 
        ? prev.filter((i) => i !== index) 
        : [...prev, index]
    );
  };

  const truncateReview = (review: string, index: number) => {
    const words = review.split(" ");
    if (words.length <= 10 || expandedReviews.includes(index)) {
      return review;
    }
    return words.slice(0, 10).join(" ") + "...";
  };

  const handleCopyURL = () => {
    navigator.clipboard.writeText(compURL)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);  // Reset after 2 seconds
      })
      .catch((err) => console.error("Error copying URL: ", err));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-center">
        <span className="text-gray-700 mr-2">Review URL:</span>
        <div className="flex items-center bg-gray-200 px-4 py-2 rounded-lg shadow">
          <input
            type="text"
            value={compURL}
            readOnly
            className="bg-transparent outline-none text-blue-500 font-semibold w-fit"
          />
          <button
            onClick={handleCopyURL}
            className="ml-4 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Copy URL
          </button>
        </div>
      </div>
      {copied && <p className="text-center text-green-500 font-semibold">URL copied to clipboard!</p>}

      <h1 className="text-3xl font-bold mb-6 text-gray-600 text-center">Company Reviews</h1>
      {reviews.length > 0 ? (
        reviews.map((rev, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg mb-6 shadow-md text-white transition-transform transform hover:scale-105 duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-100 mb-2">{rev.username}</h2>
            <Rating name="read-only" value={rev.rating} readOnly className="mb-4" />
            <p className="text-white">
              {truncateReview(rev.review, index)}
              {rev.review.split(" ").length > 10 && (
                <button
                  onClick={() => toggleShowMore(index)}
                  className="text-blue-500 ml-5 hover:text-blue-400 transition duration-200"
                >
                  {expandedReviews.includes(index) ? "Show Less" : "Show More"}
                </button>
              )}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-800">No reviews available</p>
      )}
    </div>
  );
};

export default GetReviews;
