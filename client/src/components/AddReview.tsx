import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { useState } from 'react';

const AddReview: React.FC = () => {
  const [rating, setRating] = useState<number | null>(0);
  const [review, setReview] = useState<string>("");
  const { compName } = useParams<{ compName: string }>();
  const { id } = useParams<{id: string}>();

  return (
    <>
      <h1>Add Review for {compName}: {id}</h1>
      {/* Add your form or other content here */}
<Rating
        name="simple-controlled"
        value={rating}
        onChange={(e, val)=>setRating(val)}
              />
      {rating}
    </>
  );
};

export default AddReview;
