import { Helmet } from "react-helmet-async";
import notFound from "../../../assets/NotFound.jpg";
import DashboardSideBar from "../../../Shared/Dashboard/DashboardSideBar";
import useBought from "../../../Hooks/useBought";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import SectionTitle from "../../../Shared/SectionTitle";

const MySoldProperties = () => {
  const [bought] = useBought();
  const { user } = useContext(AuthContext);

  const requests = bought.filter(
    (request) =>
      request.agentEmail === user.email && request.status === "bought"
  );

  const totalSoldAmount = requests.reduce(
    (total, request) =>
      total + Number(request.offeredAmount.replace(/[^0-9.-]+/g, "")),
    0
  );

  return (
    <div>
      <Helmet>
        <title>Dream Forge | My Sold Properties</title>
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
          <div className="flex justify-center">
            <SectionTitle title={"My Sold Properties"} />
          </div>

          <p className="text-xl md:text-2xl text-dark2 font-semibold pb-6">
            Total Property Sold Amount: ${totalSoldAmount}
          </p>

          <div className="overflow-x-auto">
            <table className="table table-md lg:table-lg">
              <thead className="text-base font-medium text-white rounded-t-lg">
                <tr className="bg-primary">
                  <td></td>
                  <td>Property Title</td>
                  <td>Property Location</td>
                  <td>Buyer Email</td>
                  <td>Buyer Name</td>
                  <td className="text-center">Offered Price</td>
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

export default MySoldProperties;
