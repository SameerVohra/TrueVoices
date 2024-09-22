import Rating from '@mui/material/Rating';

interface Review {
  approved: boolean;
  compId: string;
  rating: number;
  username: string;
  review: string;
}

const Grid: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {reviews && reviews.map((rev, index) => (
          <div
            key={index}
            className="relative transform hover:rotate-2 hover:scale-105 transition-transform duration-500 ease-in-out bg-gradient-to-br from-gray-50 via-white to-gray-200 rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center space-x-4 mb-4">
                {/* Avatar or initials */}
                <div className="bg-gray-900 text-white text-xl font-bold rounded-full w-12 h-12 flex items-center justify-center">
                  {rev.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{rev.username}</h2>
                  <p className="text-gray-500 text-sm">Rated {rev.rating}/5</p>
                </div>
              </div>
              
              <p className="text-gray-700 mt-4 mb-6 line-clamp-3">"{rev.review}"</p>

              <div className="flex justify-end items-center">
                <Rating name="read-only" value={rev.rating} readOnly />
              </div>
            </div>

            {/* Decorative bottom element */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Grid;
