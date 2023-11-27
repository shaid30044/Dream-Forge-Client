import { Helmet } from "react-helmet-async";
import DashboardSideBar from "../../../Shared/Dashboard/DashboardSideBar";
import useProperty from "../../../Hooks/useProperty";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import notFound from "../../../assets/NotFound.jpg";
import { GrMapLocation } from "react-icons/gr";
import { LuBadgeDollarSign } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SectionTitle from "../../../Shared/SectionTitle";

const MyAddedProperties = () => {
  const [property, refetch] = useProperty();
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const properties = property.filter(
    (property) => property.agentEmail === user.email
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
        axiosPublic.delete(`/property/${id}`).then((res) => {
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
        <title>Dream Forge | My Added Properties</title>
      </Helmet>

      <div className="fixed z-50">
        <DashboardSideBar />
      </div>

      {properties.length === 0 ? (
        // not found

        <div className="flex justify-center items-center h-screen pr-4 pl-3 md:pr-6 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
          <img src={notFound} />
        </div>
      ) : (
        <div className="font-open w-full pr-4 pl-3 md:pr-6 md:pl-[280px]    lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
          <div className="flex justify-center">
            <SectionTitle title={"My Added Properties"} />
          </div>

          <div className="grid lg:grid-cols-2 gap-x-6 gap-y-8 lg:gap-8">
            {properties.map((property, idx) => (
              <div key={idx}>
                <div className="relative overflow-hidden bg-cover bg-no-repeat">
                  <img
                    src={property.propertyImage}
                    className="transition duration-700 ease-in-out hover:scale-110"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center gap-2">
                      {/* agent image */}

                      <img
                        src={property.agentImage}
                        className="rounded-full w-10 h-10"
                      />

                      {/* agent name */}

                      <p className="text-sm text-dark3 font-medium">
                        {property.agentName}
                      </p>
                    </div>

                    {/* verification status */}

                    <p className="pt-2">
                      <span className="text-xs font-medium text-[#70c641] bg-[#f3ffec] rounded-full px-3 py-1">
                        {property.verificationStatus}
                      </span>
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      {/* property location */}

                      <div className="flex items-center gap-3 pt-3 pb-1">
                        <GrMapLocation className="text-xl text-primary" />
                        <p className="text-dark3">
                          {property.propertyLocation}
                        </p>
                      </div>

                      {/* property price range */}

                      <div className="flex items-center gap-3">
                        <LuBadgeDollarSign className="text-xl text-primary" />
                        <p className="text-dark3">
                          {property.minPrice} - {property.maxPrice}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* details button */}

                      {property.verificationStatus === "verified" ? (
                        <Link to={`/dashboard/updateProperty/${property._id}`}>
                          <div className="text-primary text-2xl bg-transparent hover:bg-primary1 rounded-full duration-300 p-1.5">
                            <BiSolidEditAlt />
                          </div>
                        </Link>
                      ) : (
                        <button
                          disabled
                          className="text-dark3 text-2xl 
                        bg-transparent hover:bg-black/20 rounded-full duration-300 p-1.5"
                        >
                          <BiSolidEditAlt />
                        </button>
                      )}

                      {/* delete button */}

                      <button
                        onClick={() => handleDelete(property._id)}
                        className="text-primary text-2xl bg-transparent hover:bg-primary1 rounded-full duration-300 p-1.5"
                      >
                        <MdDelete />
                      </button>
                    </div>
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

export default MyAddedProperties;
