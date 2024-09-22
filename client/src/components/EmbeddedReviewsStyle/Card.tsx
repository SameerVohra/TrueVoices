import Rating from '@mui/material/Rating';

interface Review {
  approved: boolean;
  compId: string;
  rating: number;
  username: string;
  review: string;
}

const Card: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews && reviews.map((rev, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-green-100 via-green-200 to-green-300 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out p-6"
          >
            <div className="flex flex-col items-start mb-4">
              <h1 className="text-xl font-bold text-gray-800">{rev.username}</h1>
              <div className="flex items-center mt-2">
                <Rating name="read-only" value={rev.rating} readOnly />
                <span className="ml-2 text-gray-500 text-sm">({rev.rating})</span>
              </div>
            </div>
            <p className="text-gray-700 italic border-l-4 border-green-500 pl-4">
              "{rev.review}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
