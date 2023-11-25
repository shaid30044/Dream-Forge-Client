// import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import { useLoaderData } from "react-router-dom";
import { GrMapLocation } from "react-icons/gr";
import { LuBadgeDollarSign } from "react-icons/lu";

const PropertyDetails = () => {
  const property = useLoaderData();

  //   const scrollToTop = () => {
  // window.scrollTo(0, 0);
  //   };

  //   useEffect(scrollToTop, []);

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
            <img src={property.propertyImage} className="w-full" />

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

          <div className="grid md:grid-cols-2 items-center pt-8">
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
                  <p className="text-dark3">{property.priceRange}</p>
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
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default PropertyDetails;