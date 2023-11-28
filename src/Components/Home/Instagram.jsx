import SectionTitle from "../../Shared/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Instagram = () => {
  const axiosPublic = useAxiosPublic();

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axiosPublic.get("/instagram");

        setImages(response.data);
      } catch (error) {
        console.error("Error fetching Instagram images:", error);
      }
    };

    fetchImages();
  }, [axiosPublic]);

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
