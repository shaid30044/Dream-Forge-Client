import { Helmet } from "react-helmet-async";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import Banner from "../Components/Home/Banner";
import Advertisement from "../Components/Home/Advertisement";
import UserReview from "../Components/Home/UserReview";
import AboutUs from "../Components/Home/AboutUs";
import ContactUs from "../Components/Home/ContactUs";
import { useEffect } from "react";
import Instagram from "../Components/Home/Instagram";

const Home = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(scrollToTop, []);

  return (
    <div className="relative">
      <Helmet>
        <title>Dream Forge</title>
      </Helmet>

      <div className="absolute top-0 w-full z-50">
        <Navbar />
      </div>

      <div className="pt-16">
        <Banner />
        <AboutUs />
        <Advertisement />
        <UserReview />
        <Instagram />
        <ContactUs />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
