import { useRef } from "react";
import Swal from "sweetalert2";
import contact from "../../assets/Contact.webp";
import SectionTitle from "../../Shared/SectionTitle";

const ContactUs = () => {
  const formRef = useRef();

  const handleContact = (e) => {
    e.preventDefault();

    Swal.fire({
      position: "center",
      icon: "success",
      text: "Your Query has been successfully submitted. We will get back to you as soon as possible.",
      showConfirmButton: false,
      timer: 1500,
    });

    formRef.current.reset();
  };

  const bgImg = {
    backgroundImage: `url(${contact})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="pb-20 lg:pb-40">
      <SectionTitle title={"Contact Us"} />

      <div style={bgImg} className="font-open bg-fixed md:mx-10 lg:mx-20">
        <div className="bg-black/50 px-4 md:px-10 lg:px-40 py-10">
          <div>
            {/* subscription form */}

            <form ref={formRef} onSubmit={handleContact}>
              {/* email */}

              <p className="text-xl text-white  pb-4">Email</p>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="border-2 border-white bg-transparent text-white rounded-full outline-none w-full px-6 py-3"
              />

              {/* query */}

              <p className="text-xl text-white pt-6 pb-4">Query</p>
              <textarea
                type="text"
                name="query"
                rows="4"
                placeholder="Enter your query"
                required
                className="border-2 border-white bg-transparent text-white rounded-3xl outline-none w-full px-6 py-3"
              />

              {/* submit */}

              <input
                type="submit"
                value="Submit"
                className="btn normal-case text-lg font-semibold text-white bg-transparent hover:bg-primary border-2 border-white hover:border-primary rounded-full duration-300 px-10 mt-8"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
