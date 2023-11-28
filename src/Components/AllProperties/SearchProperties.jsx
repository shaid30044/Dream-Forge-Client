import { GrMapLocation } from "react-icons/gr";
import { LuBadgeDollarSign } from "react-icons/lu";
import { BsInfoLg } from "react-icons/bs";
import { Link } from "react-router-dom";

const SearchProperties = ({ property }) => {
  return (
    <div>
      {property.verificationStatus === "verified" ? (
        <>
          <div className="relative overflow-hidden bg-cover bg-no-repeat">
            <img
              src={property.propertyImage}
              className="transition duration-700 ease-in-out hover:scale-110"
            />
          </div>
          <div>
            {/* property title */}

            <div className="flex justify-between items-center pt-3 pb-1">
              <h3 className="text-xl font-medium text-dark2">
                {property.propertyTitle}
              </h3>

              {/* verification status */}

              <p>
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

              {/* details button */}

              <Link to={`/property/${property._id}`}>
                <div className="tooltip" data-tip="Details">
                  <BsInfoLg className="text-xl text-primary bg-primary1 rounded-full cursor-pointer w-7 h-7 p-1" />
                </div>
              </Link>
            </div>
            {/* agent info */}

            <div className="flex items-center gap-2 pt-4">
              <img
                src={property.agentImage}
                className="rounded-full w-8 h-8 "
              />
              <p className="text-sm text-dark3">{property.agentName}</p>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchProperties;
