import { Spiral as Hamburger } from "hamburger-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const pages = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "All Properties",
      path: "/allProperties",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
    },
  ];

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  return (
    <div className="relative flex justify-between items-center font-open bg-white px-4 md:px-10 lg:px-20 py-1">
      {/* brand logo */}

      <div className="text-dark1 text-lg lg:text-2xl">
        <span>
          <Link to="/" className="flex items-center">
            <img src={logo} alt="logo" className="h-14 md:h-16" />
            <h3 className="text-center">
              Dream <span className="text-primary">Forge</span>
            </h3>
          </Link>
        </span>
      </div>

      {/* pages */}

      {/*for sm and md device */}

      <div className="relative flex justify-center gap-5 md:gap-8 lg:gap-12">
        <div className="lg:hidden">
          <Hamburger
            onToggle={handleToggle}
            rounded
            size={22}
            color="#121212"
          />
          {toggle ? (
            <div data-aos="fade-in" className="relative">
              <div className="absolute top-4 right-0 flex flex-col items-center rounded-xl bg-primary1 font-medium">
                {pages.map((page, idx) => (
                  <div
                    key={idx}
                    className="hover:bg-primary2 text-center cursor-pointer rounded-xl duration-300 w-full"
                  >
                    <NavLink
                      to={page.path}
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "text-primary"
                          : "text-dark1"
                      }
                    >
                      <button className="w-64 py-4">{page.name}</button>
                    </NavLink>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* for lg device */}

        <div className="hidden lg:flex justify-end items-center gap-12 font-">
          {pages.map((page, idx) => (
            <div key={idx}>
              <NavLink
                to={page.path}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-primary"
                    : "text-dark1"
                }
              >
                {page.name}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
