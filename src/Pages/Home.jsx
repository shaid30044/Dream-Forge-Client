import { Helmet } from "react-helmet-async";
import Navbar from "../Shared/Navbar";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Dream Forge</title>
      </Helmet>

      <div className="fixed z-50 w-full">
        <Navbar />
      </div>
    </div>
  );
};

export default Home;
