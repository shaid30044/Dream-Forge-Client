import { Helmet } from "react-helmet-async";
import notFound from "../../../assets/NotFound.jpg";
import DashboardSideBar from "../../../Shared/Dashboard/DashboardSideBar";
import useBought from "../../../Hooks/useBought";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const RequestedProperties = () => {
  const [bought, boughtRefetch] = useBought();
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const requests = bought.filter(
    (request) => request.agentEmail === user.email
  );

  const handAccept = (request) => {
    const offerStatus = {
      status: "accepted",
    };

    axiosPublic.patch(`/bought/${request._id}`, offerStatus).then((res) => {
      if (res.data.modifiedCount > 0) {
        boughtRefetch();

        Swal.fire({
          position: "center",
          icon: "success",
          title: `You accept ${request.buyerName}'s offer.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleReject = (request) => {
    const offerStatus = {
      status: "rejected",
    };

    axiosPublic.patch(`/bought/${request._id}`, offerStatus).then((res) => {
      if (res.data.modifiedCount > 0) {
        boughtRefetch();

        Swal.fire({
          position: "center",
          icon: "success",
          title: `You reject ${request.buyerName}'s offer.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Dream Forge | Requested Properties</title>
      </Helmet>

      <div className="fixed z-50">
        <DashboardSideBar />
      </div>

      {requests.length === 0 ? (
        // not found

        <div className="flex justify-center items-center h-screen pr-4 pl-3 md:pr-6 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
          <img src={notFound} />
        </div>
      ) : (
        <div className="font-open w-full pr-4 pl-3 md:pr-6 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
          <div className="overflow-x-auto mt-12">
            <table className="table table-md lg:table-lg">
              <thead className="text-base font-medium text-white rounded-t-lg">
                <tr className="bg-primary">
                  <td></td>
                  <td>Property Title</td>
                  <td>Property Location</td>
                  <td>Buyer Email</td>
                  <td>Buyer Name</td>
                  <td className="text-center">Offered Price</td>
                  <td className="text-center">Accept</td>
                  <td className="text-center">Reject</td>
                </tr>
              </thead>

              <tbody>
                {requests.map((request, idx) => (
                  <tr key={idx} className="text-dark3">
                    <th>{idx + 1}</th>
                    <td>{request.propertyTitle}</td>
                    <td>{request.propertyLocation}</td>
                    <td>{request.buyerEmail}</td>
                    <td>{request.buyerName}</td>
                    <td className="text-center">{request.offeredAmount}</td>
                    <td className="text-center">
                      {request.status === "rejected" ? (
                        ""
                      ) : request.status === "accepted" ||
                        request.status === "bought" ? (
                        <span className="text-[#70c641]">accepted</span>
                      ) : (
                        <button
                          onClick={() => handAccept(request)}
                          className="text-[#70c641] font-medium bg-[#effee7]  rounded-full text-center px-3 py-2"
                        >
                          accept
                        </button>
                      )}
                    </td>
                    <td>
                      {request.status === "rejected" ? (
                        <span className="text-primary">rejected</span>
                      ) : request.status === "accepted" ||
                        request.status === "bought" ? (
                        ""
                      ) : (
                        <button
                          onClick={() => handleReject(request)}
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

export default RequestedProperties;
