import { Helmet } from "react-helmet-async";
import { GrMapLocation } from "react-icons/gr";
import { LuBadgeDollarSign } from "react-icons/lu";
import useWishlist from "../../../Hooks/useWishlist";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import notFound from "../../../assets/NotFound.jpg";
import DashboardSideBar from "../../../Shared/Dashboard/DashboardSideBar";
import SectionTitle from "../../../Shared/SectionTitle";

const Wishlist = () => {
  const [wishlist, wishlistRefetch] = useWishlist();
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const wishlists = wishlist.filter(
    (wishlist) => wishlist.buyerEmail === user?.email
  );

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/wishlist/${id}`).then((res) => {
          if (res.data.deletedCount) {
            wishlistRefetch();

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
        <title>Dream Forge | Wishlist</title>
      </Helmet>

      <div className="fixed z-50">
        <DashboardSideBar />
      </div>

      {wishlist.length === 0 ? (
        // not found

        <div className="flex justify-center items-center h-screen pr-4 pl-3 md:pr-6 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
          <img src={notFound} />
        </div>
      ) : (
        <div className="font-open w-full pr-4 pl-3 md:pr-6 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
          <div className="flex justify-center">
            <SectionTitle title={"Wishlist"} />
          </div>

          <div className="space-y-16 lg:space-y-10">
            {wishlists.map((wishlist, idx) => (
              <div key={idx} className="grid lg:grid-cols-2 gap-2 lg:gap-8">
                <img src={wishlist.propertyImage} className="w-full" />

                <div className="relative">
                  <div>
                    <div className="flex items-center gap-2">
                      <img
                        src={wishlist.agentImage}
                        className="rounded-full w-10 h-10"
                      />
                      <p className="text-dark3 font-medium">
                        {wishlist.agentName}
                      </p>
                    </div>

                    {/* property title */}

                    <h3 className="text-3xl text-dark2 pt-4 lg:pt-5">
                      {wishlist.propertyTitle}
                    </h3>

                    {/* property location */}

                    <div className="flex items-center gap-3 pt-3 pb-1">
                      <GrMapLocation className="text-xl text-primary" />
                      <p className="text-dark3">{wishlist.propertyLocation}</p>
                    </div>

                    {/* property price range */}

                    <div className="flex items-center gap-3">
                      <LuBadgeDollarSign className="text-xl text-primary" />
                      <p className="text-dark3">
                        {wishlist.minPrice} - {wishlist.maxPrice}
                      </p>
                    </div>
                  </div>

                  {/* offer and remove button */}

                  <div className="lg:absolute bottom-0 flex justify-between lg:justify-start gap-6 pt-6 lg:pt-0">
                    <Link to={`/offer/${wishlist._id}`}>
                      <button className="btn normal-case text-dark2 hover:text-white bg-transparent hover:bg-primary border-2 border-dark2 hover:border-primary rounded-full duration-300 px-6">
                        Make An Offer
                      </button>
                    </Link>

                    <button
                      onClick={() => handleRemove(wishlist._id)}
                      className="btn normal-case text-dark2 hover:text-white bg-transparent hover:bg-primary border-2 border-dark2 hover:border-primary rounded-full duration-300 px-6"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
