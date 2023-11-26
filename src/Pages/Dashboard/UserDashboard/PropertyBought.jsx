import { Helmet } from "react-helmet-async";
import useBought from "../../../Hooks/useBought";
import notFound from "../../../assets/NotFound.jpg";
import DashboardSideBar from "../../../Shared/Dashboard/DashboardSideBar";

const PropertyBought = () => {
  const [bought] = useBought();

  return (
    <div>
      <Helmet>
        <title>Dream Forge | Property Bought</title>
      </Helmet>

      <div className="fixed z-50">
        <DashboardSideBar />
      </div>

      {bought.length === 0 ? (
        // not found

        <div className="flex justify-center items-center h-screen pr-4 pl-3 md:pr-6 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
          <img src={notFound} />
        </div>
      ) : (
        <div className="font-open w-full pr-4 pl-3 md:pr-6 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {bought.map((item, idx) => (
              <div key={idx}>
                <img src={item.propertyImage} />

                <div>
                  <div className="flex justify-between items-center pt-2">
                    {/* agent name */}

                    <p className="text-dark3 text-sm font-medium">
                      <span className="text-dark2">Agent:</span>{" "}
                      {item.agentName}
                    </p>

                    {/* verification status */}

                    <p>
                      <span
                        className={`text-xs font-medium text-${
                          item.status === "pending"
                            ? "primary"
                            : item.status === "accepted"
                            ? "[#70c641]"
                            : "dark7"
                        } bg-${
                          item.status === "pending"
                            ? "primary1"
                            : item.status === "accepted"
                            ? "[#f3ffec]"
                            : "dark3"
                        } rounded-full px-3 py-1`}
                      >
                        {item.status}
                      </span>
                    </p>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      {/* property title */}

                      <div className="text-xl font-medium text-dark2 pt-2 pb-1">
                        {item.propertyTitle}
                      </div>

                      {/* property location */}

                      <div className="flex items-center gap-3 font-medium text-primary pb-1">
                        Property Location:
                        <p className="text-dark3 font-normal">
                          {item.propertyLocation}
                        </p>
                      </div>

                      {/* offered amount */}

                      <div className="flex items-center gap-3 font-medium text-primary pb-1">
                        Offered Amount:
                        <p className="text-dark3 font-normal">
                          {item.offeredAmount}
                        </p>
                      </div>

                      {/* transaction id */}

                      <div className="flex items-center gap-3 font-medium text-primary pb-1">
                        Transaction Id:
                        <p className="text-dark3 font-normal">
                          {item.offeredAmount}
                        </p>
                      </div>
                    </div>

                    {/* details button */}

                    {item.status === "accepted" ? (
                      <div>
                        <button className="btn normal-case text-dark1 hover:text-white bg-transparent hover:bg-primary border-2 border-dark1 hover:border-primary rounded-full duration-300 px-6">
                          Pay
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
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

export default PropertyBought;
