import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UpdateProperty = () => {
  const property = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const minPrice = property.minPrice
    ? parseFloat(property.minPrice.replace(/[^\d.]/g, "")) || 0
    : 0;

  const maxPrice = property.maxPrice
    ? parseFloat(property.maxPrice.replace(/[^\d.]/g, "")) || 0
    : 0;

  const onSubmit = async (data) => {
    const updateInfo = {
      $set: {
        propertyImage: data.propertyImage || property.propertyImage,
        propertyTitle: data.propertyTitle || property.propertyTitle,
        propertyLocation: data.propertyLocation || property.propertyLocation,
        minPrice: `$${data.minPrice}` || property.minPrice,
        maxPrice: `$${data.maxPrice}` || property.maxPrice,
        agentEmail: data.agentEmail || property.agentEmail,
        agentName: data.agentName,
      },
    };

    console.log(updateInfo);

    const res = await axiosPublic.patch(
      `/property/${property._id}`,
      updateInfo
    );

    if (res.data.modifiedCount === 1) {
      reset();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Property updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(-1);
    }
  };

  const bgImg = {
    backgroundImage: `url(${property.propertyImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      style={bgImg}
      className="relative font-open bg-cover bg-fixed h-screen"
    >
      <Helmet>
        <title>Dream Forge | Make An Offer</title>
      </Helmet>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="absolute grid lg:grid-cols-2 justify-center items-center gap-10 md:gap-20 overflow-auto backdrop-blur-sm h-screen px-4 md:px-10 lg:px-40 py-20 lg:py-32">
        <img
          src={property.propertyImage}
          className="flex justify-center items-center object-cover rounded-3xl h-full"
        />
        <div>
          {/* form */}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* image */}

            <p className="text-xl text-white pb-4">Property Image</p>
            <input
              type="text"
              {...register("image", { required: true })}
              defaultValue={property.propertyImage}
              className="border-2 border-white bg-transparent outline-none text-white rounded-full w-full px-6 py-3"
            />
            {errors.image && (
              <span className="text-red font-medium">
                Property Image is required
              </span>
            )}

            {/* title */}

            <p className="text-xl text-white pt-6 pb-4">Property Title</p>
            <input
              type="text"
              {...register("title", { required: true })}
              defaultValue={property.propertyTitle}
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
              defaultValue={property.propertyLocation}
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
              defaultValue={property.agentName}
              readOnly
              className="border-2 border-white bg-transparent outline-none text-white rounded-full w-full px-6 py-3"
            />

            {/* agent email */}

            <p className="text-xl text-white pt-6 pb-4">Agent Email</p>
            <input
              type="text"
              {...register("agentEmail")}
              defaultValue={property.agentEmail}
              readOnly
              className="border-2 border-white bg-transparent outline-none text-white rounded-full w-full px-6 py-3"
            />

            {/* price range */}

            <p className="text-xl text-white pt-6 pb-4">Price Range</p>
            <div className="flex items-center">
              <div className="w-full">
                <input
                  type="number"
                  {...register("minPrice, { required: true }")}
                  defaultValue={minPrice}
                  className="border-2 border-white bg-transparent outline-none text-white rounded-full w-full px-6 py-3"
                />
                {errors.minPrice && (
                  <span className="text-red font-medium">
                    Min Price is required
                  </span>
                )}
              </div>

              <p className="text-white text-lg px-4">to</p>

              <div className="w-full">
                <input
                  type="number"
                  {...register("maxPrice", { required: true })}
                  defaultValue={maxPrice}
                  className="border-2 border-white bg-transparent outline-none text-white rounded-full w-full px-6 py-3"
                />
                {errors.maxPrice && (
                  <span className="text-red font-medium">
                    Max Price is required
                  </span>
                )}
              </div>
            </div>

            {/* create account */}
            <input
              type="submit"
              value="Update"
              className="btn normal-case text-lg font-semibold text-white bg-transparent hover:bg-primary border-2 border-white hover:border-primary rounded-full duration-300 px-10 mt-12"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProperty;
