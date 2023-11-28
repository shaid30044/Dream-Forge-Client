import { Helmet } from "react-helmet-async";
import DashboardSideBar from "../../../Shared/Dashboard/DashboardSideBar";
import notFound from "../../../assets/NotFound.jpg";
import useReview from "../../../Hooks/useReview";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaQuoteLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import SectionTitle from "../../../Shared/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyReviews = () => {
  const [review, refetch] = useReview();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const reviews = review.filter(
    (review) => review.reviewerEmail === user.email
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/review/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();

            Swal.fire({
              position: "center",
              icon: "success",
              title: "Removed successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Dream Forge | My Reviews</title>
      </Helmet>
      <div className="fixed z-50">
        <DashboardSideBar />
      </div>
      {reviews.length === 0 ? (
        // not found

        <div className="flex justify-center items-center h-screen pr-4 pl-3 md:pr-6 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
          <img src={notFound} />
        </div>
      ) : (
        <div className="font-open w-full pr-4 pl-3 md:pr-6 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
          <div className="flex justify-center">
            <SectionTitle title={"My Reviews"} />
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {reviews.map((review, idx) => (
              <div key={idx}>
                <p className="text-2xl font-medium text-dark2">
                  {review.propertyTitle}
                </p>

                {/* review description */}

                <p className="text-3xl text-dark5 pt-6 pb-1">
                  <FaQuoteLeft />
                </p>

                <p className="text-sm text-dark4 leading-7">
                  {review.reviewDescription}
                </p>

                <div className="flex justify-between items-center pt-4">
                  <div>
                    {/* agent name */}

                    <p className="text- font-medium text-primary">
                      Agent:{" "}
                      <span className="text-dark2">{review.agentName}</span>
                    </p>

                    {/* agent name */}

                    <p className="text- font-medium text-primary">
                      Review Time:{" "}
                      <span className="text-dark2">{review.reviewTime}</span>
                    </p>
                  </div>

                  {/* delete button */}

                  <button
                    onClick={() => handleDelete(review._id)}
                    className="text-primary text-2xl bg-transparent hover:bg-primary1 rounded-full duration-300 p-1.5"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      ;
    </div>
  );
};

export default MyReviews;
