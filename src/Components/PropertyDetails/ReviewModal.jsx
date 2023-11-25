import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const ReviewModal = ({ propertyTitle }) => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const review = {
      propertyTitle: data.title,
      reviewerName: data.name,
      reviewerEmail: data.email,
      reviewerImage: data.photo,
      reviewDescription: data.review,
    };

    const reviewRes = await axiosPublic.post("/review", review);
    console.log(reviewRes.data);

    if (reviewRes.data.insertedId) {
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
                className="border-2 border-dark2 bg-transparent outline-none text-dark2 rounded-full w-full px-6 py-3"
              />

              {/* name */}

              <p className="text-xl text-dark2 pt-6 pb-4">Name</p>
              <input
                type="text"
                {...register("name")}
                defaultValue={user.displayName}
                readOnly
                className="border-2 border-dark2 bg-transparent outline-none text-dark2 rounded-full w-full px-6 py-3"
              />

              {/* email */}

              <p className="text-xl text-dark2 pt-6 pb-4">Email</p>
              <input
                type="email"
                {...register("email")}
                defaultValue={user.email}
                readOnly
                className="border-2 border-dark2 bg-transparent outline-none text-dark2 rounded-full w-full px-6 py-3"
              />

              {/* photo */}

              <p className="text-xl text-dark2 pt-6 pb-4">Photo URL</p>
              <input
                type="text"
                {...register("photo")}
                defaultValue={user.photoURL}
                readOnly
                className="border-2 border-dark2 bg-transparent outline-none text-dark2 rounded-full w-full px-6 py-3"
              />

              {/* description */}

              <p className="text-xl text-dark2 pt-6 pb-4">Review Description</p>
              <textarea
                type="text"
                rows="4"
                {...register("review", { required: true, maxLength: 800 })}
                placeholder="Write your review"
                className="border-2 border-dark2 bg-transparent outline-none text-dark2 rounded-3xl w-full px-6 py-3"
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
                className="btn normal-case text-lg font-semibold text-dark2 hover:text-white bg-transparent hover:bg-primary border-2 border-dark2 hover:border-primary rounded-full duration-300 px-8 mt-12"
              />
            </form>

            {/* close button */}

            <button
              onClick={closeModal}
              className="absolute bottom-6 lg:bottom-6 right-10 btn normal-case text-lg font-semibold text-dark2 hover:text-white bg-transparent hover:bg-primary border-2 border-dark2 hover:border-primary rounded-full duration-300 px-8"
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
