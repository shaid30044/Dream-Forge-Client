import { Helmet } from "react-helmet-async";
import notFound from "../../../assets/NotFound.jpg";
import DashboardSideBar from "../../../Shared/Dashboard/DashboardSideBar";
import useReview from "../../../Hooks/useReview";
import { MdDelete } from "react-icons/md";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import SectionTitle from "../../../Shared/SectionTitle";

const ManageReviews = () => {
  const [review, refetch] = useReview();
  const axiosPublic = useAxiosPublic();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes.",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/review/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              position: "center",
              icon: "success",
              text: "Review deleted successfully",
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
        <title>Dream Forge | Manage Reviews</title>
      </Helmet>

      <div className="fixed z-50">
        <DashboardSideBar />
      </div>

      {review.length === 0 ? (
        // not found

        <div className="flex justify-center items-center h-screen pr-4 pl-3 md:pr-6 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
          <img src={notFound} />
        </div>
      ) : (
        <div className="font-open w-full pr-4 pl-3 md:pr-6 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
          <div className="flex justify-center">
            <SectionTitle title={"Manage Reviews"} />
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {review.map((review, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img
                      src={review.reviewerImage}
                      className="rounded-full w-10 h-10"
                    />
                    <div className="text-sm font-medium text-dark2">
                      <p>{review.reviewerName}</p>
                      <p>{review.reviewerEmail}</p>
                    </div>
                  </div>

                  {/* delete */}

                  <button
                    onClick={() => handleDelete(review._id)}
                    className="text-primary text-2xl bg-transparent hover:bg-primary1 rounded-full duration-300 p-1.5"
                  >
                    <MdDelete />
                  </button>
                </div>

                {/* review */}

                <p className="text-dark3 pt-2">{review.reviewDescription}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageReviews;
