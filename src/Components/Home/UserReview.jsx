import SectionTitle from "../../Shared/SectionTitle";
import { FaQuoteLeft } from "react-icons/fa";
import useReview from "../../Hooks/useReview";

const UserReview = () => {
  const [review] = useReview();

  const reviews = review.slice(-6);

  return (
    <div className="font-open px-4 md:px-10 lg:px-20 pb-20 lg:pb-32">
      <SectionTitle title={"Reviews"} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {reviews.map((review, idx) => (
          <div key={idx}>
            <p className="text-2xl text-dark2">{review.propertyTitle}</p>

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
    </div>
  );
};

export default UserReview;
