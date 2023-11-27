import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const ReviewModal = ({ propertyTitle, agentName, id, refetch }) => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const date = new Date();
    const formattedNewDate = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    })
      .format(date)
      .replace(/(\d+)\/(\d+)\/(\d+),/, "$3/$2/$1");

    const review = {
      propertyTitle: data.title,
      reviewId: id,
      reviewerName: user.displayName,
      reviewerEmail: user.email,
      reviewerImage: user.photoURL,
      reviewDescription: data.review,
      agentName: agentName,
      reviewTime: formattedNewDate,
    };

    const reviewRes = await axiosPublic.post("/review", review);

    if (reviewRes.data.insertedId) {
      refetch();
      reset();
      document.getElementById("review_modal").close();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Review added successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const closeModal = () => {
    document.getElementById("review_modal").close();
  };

  return (
    <div>
      <button
        onClick={() => document.getElementById("review_modal").showModal()}
        className="btn normal-case text-dark1 hover:text-white bg-transparent hover:bg-primary backdrop-blur-sm border-2 border-dark1 hover:border-primary rounded-full duration-300 px-6"
      >
        Add Your Review
      </button>
      <dialog id="review_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* property */}

              <p className="text-xl text-dark2 pb-4">Property Title</p>
              <input
                type="text"
                {...register("title")}
                defaultValue={propertyTitle}
                readOnly
                className="border-2 border-dark3 bg-transparent outline-none text-dark2 rounded-full w-full px-6 py-3"
              />

              {/* description */}

              <p className="text-xl text-dark2 pt-6 pb-4">Review Description</p>
              <textarea
                type="text"
                rows="4"
                {...register("review", { required: true, maxLength: 800 })}
                placeholder="Write your review"
                className="border-2 border-dark3 bg-transparent outline-none text-dark2 rounded-3xl w-full px-6 py-3"
              />
              {errors.review && (
                <span className="text-red font-medium">
                  Review description is required
                </span>
              )}
              {errors.name && (
                <span>Description must less then 800 characters</span>
              )}

              <br />

              {/* add review */}

              <input
                type="submit"
                value="Add Review"
                className="btn normal-case text-lg font-semibold text-dark2 hover:text-white bg-transparent hover:bg-primary border-2 border-dark2 hover:border-primary rounded-full duration-300 px-8 mt-10"
              />
            </form>

            {/* close button */}

            <button
              onClick={closeModal}
              className="absolute bottom-6 right-6 btn normal-case text-lg font-semibold text-dark2 hover:text-white bg-transparent hover:bg-primary border-2 border-dark2 hover:border-primary rounded-full duration-300 px-8"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ReviewModal;
