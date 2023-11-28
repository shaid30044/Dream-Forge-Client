import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import bg from "../../../assets/Offer.webp";
import useUser from "../../../Hooks/useUser";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProperty = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [users] = useUser();
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const userInfo = users.find((userInfo) => userInfo.email === user.email);

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const newProperty = {
        propertyImage: res.data.data.display_url,
        propertyTitle: data.title,
        propertyLocation: data.location,
        minPrice: `$${data.minPrice}`,
        maxPrice: `$${data.maxPrice}`,
        verificationStatus: "pending",
        agentEmail: userInfo?.email,
        agentName: userInfo?.name,
        agentImage: userInfo?.photo,
      };

      const propertyRes = await axiosPublic.post("/property", newProperty);
      if (propertyRes.data.insertedId) {
        reset();

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Property added successfully.",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(-1);
      }
    }
  };

  const bgImg = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      style={bgImg}
      className="relative font-open bg-cover bg-fixed h-screen"
    >
      <Helmet>
        <title>Dream Forge | Add Property</title>
      </Helmet>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="absolute grid lg:grid-cols-2 justify-center items-center gap-10 md:gap-20 overflow-auto backdrop-blur-sm h-screen px-4 md:px-10 lg:px-40 py-20 lg:py-32">
        <img
          src={bg}
          className="flex justify-center items-center object-cover rounded-3xl h-full"
        />
        <div>
          {/* form */}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* title */}

            <p className="text-xl text-white pb-4">Property Title</p>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Enter Property Title"
              className="border-2 border-white bg-transparent outline-none text-white rounded-full w-full px-6 py-3"
            />
            {errors.title && (
              <span className="text-red font-medium">
                Property Title is required
              </span>
            )}

            {/* location */}

            <p className="text-xl text-white pt-6 pb-4">Property Location</p>
            <input
              type="text"
              {...register("location", { required: true })}
              placeholder="Enter Property Location"
              className="border-2 border-white bg-transparent outline-none text-white rounded-full w-full px-6 py-3"
            />
            {errors.location && (
              <span className="text-red font-medium">
                Property Location is required
              </span>
            )}

            {/* agent name */}

            <p className="text-xl text-white pt-6 pb-4">Agent Name</p>
            <input
              type="text"
              {...register("agentName")}
              defaultValue={userInfo?.name}
              readOnly
              className="border-2 border-white bg-transparent outline-none text-white rounded-full w-full px-6 py-3"
            />

            {/* agent email */}

            <p className="text-xl text-white pt-6 pb-4">Agent Email</p>
            <input
              type="text"
              {...register("agentEmail")}
              defaultValue={userInfo?.email}
              readOnly
              className="border-2 border-white bg-transparent outline-none text-white rounded-full w-full px-6 py-3"
            />

            {/* price range */}

            <p className="text-xl text-white pt-6 pb-4">Price Range</p>
            <div className="flex items-center gap-6 md:gap-10">
              <div className="w-full">
                <input
                  type="number"
                  {...register("minPrice", { required: true })}
                  placeholder="Min Price"
                  className="border-2 border-white bg-transparent outline-none text-white rounded-full w-full px-6 py-3"
                />
                {errors.minPrice && (
                  <span className="text-red font-medium">
                    Min Price is required
                  </span>
                )}
              </div>

              <div className="w-full">
                <input
                  type="number"
                  {...register("maxPrice", { required: true })}
                  placeholder="Max Price"
                  className="border-2 border-white bg-transparent outline-none text-white rounded-full w-full px-6 py-3"
                />
                {errors.maxPrice && (
                  <span className="text-red font-medium">
                    Max Price is required
                  </span>
                )}
              </div>
            </div>

            {/* image */}

            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input border-none w-full rounded-full text-white bg-[#2b3440]/60 md:w-72 mt-6"
            />
            {errors.image && (
              <span className="text-red">Property Image is required</span>
            )}

            <br />

            {/* create account */}
            <input
              type="submit"
              value="Add Property"
              className="btn normal-case text-lg font-semibold text-white bg-transparent hover:bg-primary border-2 border-white hover:border-primary rounded-full duration-300 px-10 mt-12"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
