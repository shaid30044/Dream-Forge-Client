import SectionTitle from "../../Shared/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Instagram = () => {
  const images = [
    { image: "https://i.ibb.co/4JGfSyx/image-16-3.png" },
    { image: "https://i.ibb.co/QfK0f6Z/image-20-2.png" },
    { image: "https://i.ibb.co/Dtmh4kB/image-17-3.png" },
    { image: "https://i.ibb.co/M7zyngb/image-19-2.png" },
    { image: "https://i.ibb.co/5j4fb78/image-18-2.png" },
    { image: "https://i.ibb.co/FxBPts4/image-21-2.png" },
    { image: "https://i.ibb.co/9WVS6fR/image-22-2.png" },
  ];

  return (
    <div className="font-open px-4 md:px-10 lg:px-20 pb-20 lg:pb-32">
      <SectionTitle title={"Instagram"} />

      <Swiper
        slidesPerView={4}
        spaceBetween={16}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        keyboard={{
          enabled: true,
        }}
        modules={[Autoplay, Keyboard]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="max-w-xs overflow-hidden bg-cover bg-no-repeat"
          >
            <img
              src={image.image}
              alt={`Slide ${index + 1}`}
              className="transition duration-500 ease-in-out hover:scale-110"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Instagram;
