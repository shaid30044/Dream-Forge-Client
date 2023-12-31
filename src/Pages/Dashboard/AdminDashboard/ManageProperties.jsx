import { Helmet } from "react-helmet-async";
import notFound from "../../../assets/NotFound.jpg";
import DashboardSideBar from "../../../Shared/Dashboard/DashboardSideBar";
import Swal from "sweetalert2";
import useProperty from "../../../Hooks/useProperty";
import SectionTitle from "../../../Shared/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageProperties = () => {
  const [property, refetch] = useProperty();
  const axiosSecure = useAxiosSecure();

  const handleVerify = (request) => {
    const verifyStatus = {
      $set: {
        verificationStatus: "verified",
      },
    };

    axiosSecure.patch(`/property/${request._id}`, verifyStatus).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();

        Swal.fire({
          position: "center",
          icon: "success",
          title: `You verify ${request.agentName}'s property.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleReject = (request) => {
    const verifyStatus = {
      $set: {
        verificationStatus: "rejected",
      },
    };

    axiosSecure.patch(`/property/${request._id}`, verifyStatus).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();

        Swal.fire({
          position: "center",
          icon: "success",
          title: `You reject ${request.agentName}'s property.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Dream Forge | Manage Properties</title>
      </Helmet>

      <div className="fixed z-50">
        <DashboardSideBar />
      </div>

      {property.length === 0 ? (
        // not found

        <div className="flex justify-center items-center h-screen pr-4 pl-3 md:pr-6 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
          <img src={notFound} />
        </div>
      ) : (
        <div className="font-open w-full pr-4 pl-3 md:pr-6 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
          <div className="flex justify-center">
            <SectionTitle title={"Manage Properties"} />
          </div>

          <div className="overflow-x-auto">
            <table className="table table-md lg:table-lg">
              <thead className="text-base font-medium text-white rounded-t-lg">
                <tr className="bg-primary">
                  <td></td>
                  <td>Property Title</td>
                  <td>Property Location</td>
                  <td>Agent Email</td>
                  <td>Agent Name</td>
                  <td className="text-center">Price Range</td>
                  <td className="text-center">Verify</td>
                  <td className="text-center">Reject</td>
                </tr>
              </thead>

              <tbody>
                {property.map((property, idx) => (
                  <tr key={idx} className="text-dark3">
                    <th>{idx + 1}</th>
                    <td>{property.propertyTitle}</td>
                    <td>{property.propertyLocation}</td>
                    <td>{property.agentEmail}</td>
                    <td>{property.agentName}</td>
                    <td className="text-center">
                      {property.minPrice} - {property.maxPrice}
                    </td>
                    <td className="text-center">
                      {property.verificationStatus === "rejected" ? (
                        ""
                      ) : property.verificationStatus === "verified" ? (
                        <span className="text-[#70c641]">verified</span>
                      ) : (
                        <button
                          onClick={() => handleVerify(property)}
                          className="text-[#70c641] font-medium bg-[#effee7]  rounded-full text-center px-3 py-2"
                        >
                          verify
                        </button>
                      )}
                    </td>
                    <td>
                      {property.verificationStatus === "verified" ? (
                        ""
                      ) : property.verificationStatus === "rejected" ? (
                        <span className="text-primary">rejected</span>
                      ) : (
                        <button
                          onClick={() => handleReject(property)}
                          className="text-primary font-medium bg-primary1 
                  rounded-full text-center px-3 py-2"
                        >
                          reject
                        </button>
                      )}
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

export default ManageProperties;
