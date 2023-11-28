import { Helmet } from "react-helmet-async";
import notFound from "../../../assets/NotFound.jpg";
import DashboardSideBar from "../../../Shared/Dashboard/DashboardSideBar";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useProperty from "../../../Hooks/useProperty";
import SectionTitle from "../../../Shared/SectionTitle";
import { useState } from "react";

const AdvertiseProperty = () => {
  const [property, refetch] = useProperty();
  const axiosPublic = useAxiosPublic();

  const [advertisedCount, setAdvertisedCount] = useState(0);

  const advertise = property.filter(
    (verified) => verified.verificationStatus === "verified"
  );

  const handleAdvertise = (advertise) => {
    const maxAdvertiseLimit = 6;

    if (advertisedCount < maxAdvertiseLimit) {
      const verifyStatus = {
        $set: {
          advertise: "done",
        },
      };

      axiosPublic
        .patch(`/property/${advertise._id}`, verifyStatus)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();

            setAdvertisedCount((prevCount) => prevCount + 1);

            Swal.fire({
              position: "center",
              icon: "success",
              title: `Successfully advertised ${advertise.propertyTitle}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title:
          "Advertise Limit Exceeded. You can advertise at most 6 properties.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleRemove = (advertise) => {
    const verifyStatus = {
      $set: {
        advertise: "",
      },
    };

    axiosPublic
      .patch(`/property/${advertise._id}`, verifyStatus)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();

          setAdvertisedCount((prevCount) => prevCount - 1);

          Swal.fire({
            position: "center",
            icon: "success",
            title: `Successfully removed advertisement for ${advertise.propertyTitle}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <Helmet>
        <title>Dream Forge | Advertise Property</title>
      </Helmet>

      <div className="fixed z-50">
        <DashboardSideBar />
      </div>

      {advertise.length === 0 ? (
        // not found

        <div className="flex justify-center items-center h-screen pr-4 pl-3 md:pr-6 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
          <img src={notFound} />
        </div>
      ) : (
        <div className="font-open w-full pr-4 pl-3 md:pr-6 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
          <div className="flex justify-center">
            <SectionTitle title={"Advertise Property"} />
          </div>

          <div className="overflow-x-auto">
            <table className="table table-md lg:table-lg">
              <thead className="text-base font-medium text-white rounded-t-lg">
                <tr className="bg-primary">
                  <td></td>
                  <td>Property Image</td>
                  <td>Property Title</td>
                  <td className="text-center">Price Range</td>
                  <td>Agent Name</td>
                  <td className="text-center">Advertise</td>
                  <td className="text-center">Remove Advertise</td>
                </tr>
              </thead>

              <tbody>
                {advertise.map((property, idx) => (
                  <tr key={idx} className="text-dark3">
                    <th>{idx + 1}</th>
                    <td>
                      <img src={property.propertyImage} />
                    </td>
                    <td>{property.propertyTitle}</td>
                    <td className="text-center">
                      {property.minPrice} - {property.maxPrice}
                    </td>
                    <td>{property.agentName}</td>
                    <td className="text-center">
                      {!property.advertise ? (
                        <button
                          onClick={() => handleAdvertise(property)}
                          className="text-[#70c641] font-medium bg-[#effee7]  rounded-full text-center px-3 py-2"
                        >
                          Advertise
                        </button>
                      ) : (
                        ""
                      )}
                    </td>
                    <td>
                      <div className="flex justify-center w-44">
                        {property.advertise === "done" ? (
                          <button
                            onClick={() => handleRemove(property)}
                            className="text-primary font-medium bg-primary1 rounded-full text-center px-3 py-2"
                          >
                            Remove Advertise
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvertiseProperty;
