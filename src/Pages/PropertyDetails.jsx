import { Helmet } from "react-helmet-async";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import { useLoaderData } from "react-router-dom";
import { GrMapLocation } from "react-icons/gr";
import { LuBadgeDollarSign } from "react-icons/lu";
import { GoHeartFill } from "react-icons/go";
import PropertyReviews from "../Components/AllProperties/PropertyReviews";
import SectionTitle from "../Shared/SectionTitle";
import ReviewModal from "../Components/PropertyDetails/ReviewModal";
import useReview from "../Hooks/useReview";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import useWishlist from "../Hooks/useWishlist";
import useUser from "../Hooks/useUser";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const PropertyDetails = () => {
  const property = useLoaderData();
  const [review, refetch] = useReview();
  const [wishlist, wishlistRefetch] = useWishlist();
  const [users] = useUser();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const userInfo = users.find((userInfo) => userInfo.email === user?.email);

  const [addToWishlist, setAddToWishlist] = useState(false);

  const isItemInWishlist = wishlist.find(
    (wishlistProperty) =>
      wishlistProperty.wishlistId === property._id &&
      wishlistProperty.buyerEmail === user.email
  );

  useEffect(() => {
    if (isItemInWishlist) {
      setAddToWishlist(true);
    } else {
      setAddToWishlist(false);
    }
  }, [isItemInWishlist]);

  const handleAddToWishlist = async () => {
    const wishlist = {
      wishlistId: property._id,
      propertyImage: property.propertyImage,
      propertyTitle: property.propertyTitle,
      propertyLocation: property.propertyLocation,
      agentEmail: property.agentEmail,
      agentName: property.agentName,
      agentImage: property.agentImage,
      verificationStatus: property.verificationStatus,
      minPrice: property.minPrice,
      maxPrice: property.maxPrice,
      buyerEmail: userInfo?.email,
      buyerName: userInfo?.name,
    };

    const wishlistRes = await axiosSecure.post("/wishlist", wishlist);

    if (wishlistRes.data.insertedId) {
      wishlistRefetch();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "This property has been added to your wishlist successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(scrollToTop, []);

  return (
    <div className="relative">
      <Helmet>
        <title>Dream Forge | Property Details</title>
      </Helmet>

      <div className="absolute top-0 w-full z-50">
        <Navbar />
      </div>

      <div className="pt-16">
        <div className="font-open px-4 md:px-10 lg:px-20 pb-20 lg:pb-32">
          <div>
            <div className="relative">
              <img src={property.propertyImage} className="w-full" />

              {/* wishlist button */}

              {/* wishlist button for sm devices */}

              <div
                className="md:hidden absolute bottom-2 right-2 tooltip"
                data-tip="Add to Wishlist"
              >
                <button
                  onClick={handleAddToWishlist}
                  className={`flex items-center gap-2 btn btn-sm text-${
                    addToWishlist ? "primary" : "white"
                  } bg-transparent hover:bg-${
                    addToWishlist ? "white" : "primary"
                  } backdrop-blur-sm border-2 border-white hover:border-primary rounded-full duration-300 px-[5.5px]`}
                >
                  <GoHeartFill className="text-lg" />
                </button>
              </div>

              {/* wishlist button for md and lg devices */}

              <div className="hidden md:block absolute bottom-4 right-4">
                <button
                  onClick={handleAddToWishlist}
                  className="flex items-center gap-2 btn normal-case text-white bg-transparent hover:bg-primary backdrop-blur-sm border-2 border-white hover:border-primary rounded-full duration-300 px-6"
                >
                  Add to Wishlist
                  <span>
                    <GoHeartFill
                      className={`text-${
                        addToWishlist ? "primary" : "white"
                      } hover:bg-${addToWishlist ? "white" : "primary"}`}
                    />
                  </span>
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 pt-4 pb-2">
                <h3 className="text-2xl md:text-3xl">
                  {property.propertyTitle}
                </h3>

                <p>
                  <span className="text-xs font-medium text-[#70c641] bg-[#f3ffec] rounded-full px-3 py-1">
                    {property.verificationStatus}
                  </span>
                </p>
              </div>

              <p className="text-dark3 leading-7">{property.details}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 items-center pt-10 md:pt-20">
            {/* property info */}

            <div className="flex flex-col items-center border-b-2 md:border-b-0 md:border-r-2 border-primary pb-10 md:py-4 mb-10 md:mb-0">
              <p className="text-xl font-medium text-primary pb-3">
                Property Info
              </p>

              <div className="flex flex-col items-center">
                {/* property location */}

                <div className="flex items-center gap-3 pt-3 pb-2">
                  <GrMapLocation className="text-xl text-primary" />
                  <p className="text-dark3">{property.propertyLocation}</p>
                </div>

                {/* property price range */}

                <div className="flex items-center gap-3">
                  <LuBadgeDollarSign className="text-xl text-primary" />
                  <p className="text-dark3">
                    {property.minPrice} - {property.maxPrice}
                  </p>
                </div>
              </div>
            </div>

            {/* agent info */}

            <div className="flex flex-col items-center">
              <p className="text-xl font-medium text-primary pb-3">
                Agent Info
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={property.agentImage}
                  className="rounded-full w-16 h-16"
                />
                <div>
                  <p className="font-medium text-dark3 pb-2">
                    {property.agentName}
                  </p>
                  <p className="font-medium text-dark3">
                    {property.agentEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* reviews */}

          <div className="pt-20 lg:pt-32">
            <SectionTitle title={"Reviews"} />

            <PropertyReviews id={property._id} review={review} />
          </div>

          {/* review modal */}

          <div className="pt-10">
            <ReviewModal
              propertyTitle={property.propertyTitle}
              agentName={property.agentName}
              id={property._id}
              refetch={refetch}
            />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default PropertyDetails;
