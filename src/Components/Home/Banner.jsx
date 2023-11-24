import { Parallax } from "react-parallax";
import banner from "../../assets/banner-img.jpg";

const Banner = () => {
  return (
    <Parallax
      bgImage={banner}
      blur={{ min: -30, max: 30 }}
      bgImageStyle={{ width: "100vw", height: "" }}
    >
      <div className="text-white font-open text-center px-4 md:px-10 lg:px-60 py-8 md:py-20 lg:py-40">
        <div className="text-xl md:text-4xl lg:text-6xl backdrop-blur-sm bg-black/20 space-y-1 lg:space-y-5 px-3 md:px-12 lg:px-28 py-5 md:py-10 lg:py-10">
          <p>Elevate Your Living,</p>
          <p>Shape Your Dreams with</p>
          <p>Dream Forge.</p>
        </div>
      </div>
    </Parallax>
  );
};

export default Banner;
