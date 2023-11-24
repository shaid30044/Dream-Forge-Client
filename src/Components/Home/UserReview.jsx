import { useEffect, useState } from "react";
import SectionTitle from "../../Shared/SectionTitle";

const UserReview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/property.json");
      const data = await res.json();
      setReviews(data);
    };
    fetchData();
  }, []);

  return (
    <div className="font-open px-4 md:px-10 lg:px-20 py-20 lg:py-40">
      <SectionTitle title={"Reviews"} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {reviews.map((review, idx) => (
          <div key={idx} className="">
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

            <p className="text-sm text-dark4 leading-6">
              {review.reviewDescription}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReview;
