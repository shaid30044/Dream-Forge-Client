import { Link } from "react-router-dom";
import bg from "../assets/footer.jpg";
import logo from "../assets/logo.png";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div
      className="relative font-open h-[760px] md:h-[400px] lg:h-[440px] bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="absolute inset-0 bg-white opacity-90"></div>
      <div className="absolute w-full px-4 md:px-10 lg:px-20 py-10 md:py-20">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-20">
          <div className="flex flex-col lg:flex-row md:justify-center items-center">
            <div>
              <img src={logo} className="h-36 md:-mt-6 lg:-mt-0" />
            </div>
            <h3 className="font-medium text-3xl lg:text-4xl -mt-6 lg:-mt-0">
              Dream <span className="text-primary">Forge</span>
            </h3>
          </div>

          {/* links */}

          <div className="flex flex-col items-center text-center md:text-start pt-8 md:pt-0">
            <div>
              <h1 className="text-2xl font-medium pb-4">Useful Links</h1>
              <div className="flex flex-col gap-4 text-dark2">
                <span>
                  <Link to="/" className="hover:text-primary duration-300">
                    Home
                  </Link>
                </span>
                <span>
                  <Link to="/" className="hover:text-primary duration-300">
                    All Properties
                  </Link>
                </span>
                <span>
                  <Link to="/" className="hover:text-primary duration-300">
                    Dashboard
                  </Link>
                </span>
              </div>
            </div>
          </div>

          {/* contact us */}

          <div className="flex flex-col items-center text-center md:text-start pt-8 md:pt-0">
            <div>
              <h1 className="text-2xl font-medium pb-4">Contact US</h1>
              <div className="space-y-2 text-dark2">
                <p>123 ABS Street, Uni 21 Bangladesh</p>
                <p>+88 123456789</p>
              </div>
            </div>
          </div>
        </div>

        {/* follow us */}

        <div className="flex justify-center gap-8 text-center pt-16 md:pt-16">
          <Link className="text-2xl hover:text-primary duration-300">
            <FaFacebookF />
          </Link>
          <Link className="text-2xl hover:text-primary duration-300">
            <FaInstagram />
          </Link>
          <Link className="text-2xl hover:text-primary duration-300">
            <FaLinkedinIn />
          </Link>
          <Link className="text-2xl hover:text-primary duration-300">
            <FaXTwitter />
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 text-xs text-center text-dark3 w-full py-2">
        <p>Copyright © CulinaryCloud. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
