import useReview from "../../Hooks/useReview";
import { FaQuoteLeft } from "react-icons/fa";

const PropertyReviews = ({ id }) => {
  const [review] = useReview();

  const reviews = review.filter((review) => review.reviewId === id);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      {reviews.map((review, idx) => (
        <div key={idx}>
          <div className="flex items-center gap-3 pt-3 pb-2">
            <img
              src={review.reviewerImage}
              className="rounded-full w-10 h-10 lg:w-12 lg:h-12"
            />
            <p className="text- font-medium text-primary">
              {review.reviewerName}
            </p>
          </div>

          <p className="text-3xl text-dark5 py-1">
            <FaQuoteLeft />
          </p>
          <p className="text-sm text-dark4 leading-7">
            {review.reviewDescription}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PropertyReviews;
