import axios from "axios";
import React, { useEffect, useState } from "react";
import link from "../assets/link.json";
import Rating from "@mui/material/Rating";

interface Approved {
  approved: boolean;
  compId: string;
  rating: number;
  username: string;
  review: string;
}

const ApprovedReviews: React.FC = () => {
  const params = new URLSearchParams(location.search);
  const compId = params.get("id");
  const [reviews, setReviews] = useState<Approved[]>([]);
  const [shareableLink, setShareableLink] = useState<string>("");

  useEffect(() => {
    const data = async () => {
      const res = await axios.post(
        `${link.url}/get-review`,
        { compId: compId },
      );
      const rev = res.data;
      const approvedRev = rev.filter((r: Approved) => r.approved === true);
      setReviews(approvedRev);

      // Set the shareable link when data is loaded
      if (compId) {
        const generatedLink = `${window.location.origin}/embed-reviews?id=${compId}`;
        setShareableLink(generatedLink);
      }
    };
    data();
  }, [compId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`<iframe src="${shareableLink}" width="600" height="400"></iframe>`);
    alert("Embed code copied to clipboard!");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Approved Reviews
      </h1>

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {r.username}
              </h2>
              <div className="mb-4">
                <p className="text-yellow-500 font-medium">Rating:</p>
                <Rating name="read-only" value={r.rating} readOnly />
              </div>
              <p className="text-gray-600 italic">"{r.review}"</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          No approved reviews available.
        </p>
      )}

      {/* Shareable link section */}
      {shareableLink && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Shareable Embed Code:
          </h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-gray-700 mb-4">
              Copy this code and paste it into your website to display the
              reviews:
            </p>
            <pre className="bg-gray-200 p-2 rounded text-sm overflow-auto">
              {`<iframe src="${shareableLink}" width="600" height="400"></iframe>`}
            </pre>
            <button
              onClick={handleCopy}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Copy Embed Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovedReviews;
