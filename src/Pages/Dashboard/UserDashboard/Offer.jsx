import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Offer = () => {
  const property = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [startDate, setStartDate] = useState(new Date());
  const [amountError, setAmountError] = useState("");

  const onSubmit = async (data) => {
    const enteredAmount = parseFloat(data.amount);

    const formattedDate = startDate.toLocaleString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const amountString = `$${data.amount}`;

    const offerInfo = {
      propertyImage: property.propertyImage,
      propertyTitle: data.title,
      propertyLocation: data.location,
      agentName: data.agentName,
      offeredAmount: amountString,
      buyerEmail: data.buyerEmail,
      buyerName: data.buyerName,
      buyingDate: formattedDate,
      status: "pending",
    };

    if (!isNaN(enteredAmount)) {
      const minPrice = property.minPrice
        ? parseFloat(property.minPrice.replace(/[^\d.]/g, "")) || 0
        : 0;

      const maxPrice = property.maxPrice
        ? parseFloat(property.maxPrice.replace(/[^\d.]/g, "")) || 0
        : 0;

      if (enteredAmount >= minPrice && enteredAmount <= maxPrice) {
        setAmountError("");

        const wishlistRes = await axiosPublic.post("/bought", offerInfo);

        if (wishlistRes.data.insertedId) {
          reset();

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Offer Submitted Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate(-1);
        }
      } else {
        setAmountError(
          "Amount must be in between the agent specified price range."
        );
      }
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
            {/* title */}

            <p className="text-xl text-white pb-4">Property Title</p>
            <input
              type="text"
              {...register("title")}
              defaultValue={property.propertyTitle}
              readOnly
              className="border-2 border-white bg-transparent outline-none text-white rounded-full w-full px-6 py-3"
            />

            {/* location */}

            <p className="text-xl text-white pt-6 pb-4">Property Location</p>
            <input
              type="text"
              {...register("location")}
              defaultValue={property.propertyLocation}
              readOnly
              className="border-2 border-white bg-transparent outline-none text-white rounded-full w-full px-6 py-3"
            />

            {/* agent name */}

            <p className="text-xl text-white pt-6 pb-4">Agent Name</p>
            <input
              type="text"
              {...register("agentName")}
              defaultValue={property.agentName}
              readOnly
              className="border-2 border-white bg-transparent outline-none text-white rounded-full w-full px-6 py-3"
            />

            {/* offered amount */}

            <p className="text-xl text-white pt-6 pb-4">Offered Amount</p>
            <input
              type="number"
              {...register("amount", {
                required: true,
              })}
              placeholder="Enter your offered amount"
              className="border-2 border-white bg-transparent outline-none text-white rounded-full w-full px-6 py-3"
            />
            {errors.amount && (
              <span className="text-red font-medium">
                Offered Amount is required
              </span>
            )}
            <p className="text-red font-medium">{amountError}</p>

            {/* buyer email */}

            <p className="text-xl text-white pt-6 pb-4">Buyer Email</p>
            <input
              type="email"
              {...register("buyerEmail")}
              defaultValue={property.buyerEmail}
              readOnly
              className="border-2 border-white bg-transparent outline-none text-white rounded-full w-full px-6 py-3"
            />

            {/* buyer name */}

            <p className="text-xl text-white pt-6 pb-4">Buyer Name</p>
            <input
              type="text"
              {...register("buyerName")}
              defaultValue={property.buyerName}
              readOnly
              className="border-2 border-white bg-transparent outline-none text-white rounded-full w-full px-6 py-3"
            />

            {/* buying date */}

            <div>
              <p className="text-xl text-white pt-6 pb-4">Buyer Name</p>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={startDate}
                minDate={new Date()}
                {...register("buyingDate")}
                onChange={(date) => setStartDate(date)}
                className="border-2 border-white bg-transparent outline-none text-white rounded-full w-full px-6 py-3"
              />
            </div>

            {/* create account */}

            <input
              type="submit"
              value="Offer"
              className="btn normal-case text-lg font-semibold text-white bg-transparent hover:bg-primary border-2 border-white hover:border-primary rounded-full duration-300 px-10 mt-12"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Offer;
