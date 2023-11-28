import { GrMapLocation } from "react-icons/gr";
import { LuBadgeDollarSign } from "react-icons/lu";
import { BsInfoLg } from "react-icons/bs";
import SectionTitle from "../../Shared/SectionTitle";
import useProperty from "../../Hooks/useProperty";
import { Link } from "react-router-dom";

const Advertisement = () => {
  const [property] = useProperty();

  const properties = property.slice(-6);

  return (
    <div className="font-open px-4 md:px-10 lg:px-20 py-20 lg:py-32">
      <SectionTitle title={"Advertisement"} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 lg:gap-8">
        {properties.map((property, idx) => (
          <div key={idx}>
            {property.verificationStatus === "verified" ? (
              <>
                <div className="relative overflow-hidden bg-cover bg-no-repeat">
                  <img
                    src={property.propertyImage}
                    className="transition duration-700 ease-in-out hover:scale-110"
                  />
                </div>

                <div>
                  {/* verification status */}

                  <p className="pt-2">
                    <span className="text-xs font-medium text-[#70c641] bg-[#f3ffec] rounded-full px-3 py-1">
                      {property.verificationStatus}
                    </span>
                  </p>
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
                    {/* details button */}

                    <Link to={`/property/${property._id}`}>
                      <div
                        className="tooltip tooltip-primary1"
                        data-tip="Details"
                      >
                        <BsInfoLg className="text-xl text-primary bg-primary1 rounded-full cursor-pointer w-7 h-7 p-1" />
                      </div>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advertisement;
