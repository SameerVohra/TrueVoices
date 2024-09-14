import React from 'react'

const GetReviews: React.FC = () => {
  const params = new URLSearchParams(location.search);
  const compId = params.get("id");
  return (
  <>
      {compId}
    </>
  )
}

export default GetReviews
