import { Helmet } from "react-helmet-async";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import Banner from "../Components/Home/Banner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Dream Forge</title>
      </Helmet>

      <Navbar />
      <Banner />
      <Footer />
    </div>
  );
};

export default Home;
