import { Helmet } from "react-helmet-async";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Dream Forge</title>
      </Helmet>

      <Navbar />
      <Footer />
    </div>
  );
};

export default Home;
