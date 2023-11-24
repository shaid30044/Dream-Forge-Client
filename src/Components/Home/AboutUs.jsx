import SectionTitle from "../../Shared/SectionTitle";
import about from "../../assets/AboutUs.png";

const AboutUs = () => {
  return (
    <div className="font-open px-4 md:px-10 lg:px-20 pt-20 lg:pt-40">
      <SectionTitle title={"About Us"} />

      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-10">
        <div>
          <p className="lg:hidden text-2xl leading-[36px] pb-6">
            Dream <span className="text-primary">Forge</span>: Where dreams meet
            reality in real estate
          </p>
          <img src={about} className="w-full lg:w-[2000px]" />
        </div>
        <div>
          <p className="hidden lg:block text-3xl leading-[44px] pb-10">
            Dream <span className="text-primary">Forge</span>: Where dreams meet
            reality in real estate
          </p>
          <p className="lg:text-lg text-dark2 leading-8">
            Discover an innovative and sophisticated platform with a curated
            selection of properties. Our team is dedicated to understanding your
            needs, providing a personalized touch that sets us apart. Explore
            urban apartments to countryside estates – every click brings you
            closer to your dream home.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
