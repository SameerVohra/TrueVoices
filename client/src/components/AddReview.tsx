import { useParams } from 'react-router-dom';

const AddReview: React.FC = () => {
  const { compName } = useParams<{ compName: string }>();

  return (
    <>
      <h1>Add Review for {compName}</h1>
      {/* Add your form or other content here */}
    </>
  );
};

export default AddReview;
