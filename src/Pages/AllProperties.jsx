import { Helmet } from "react-helmet-async";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import Banner from "../Components/AllPropertise/Banner";
import Properties from "../Components/AllPropertise/Properties";

const AllProperties = () => {
  return (
    <div className="relative">
      <Helmet>
        <title>Dream Forge | All Properties</title>
      </Helmet>

      <div className="absolute top-0 w-full z-50">
        <Navbar />
      </div>

      <div className="pt-16">
        <Banner />
        <Properties />
        <Footer />
      </div>
    </div>
  );
};

export default AllProperties;
