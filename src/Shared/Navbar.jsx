import { Spiral as Hamburger } from "hamburger-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import { BiLogInCircle } from "react-icons/bi";
import useAdmin from "../Hooks/useAdmin";
import useAgent from "../Hooks/useAgent";
import useUser from "../Hooks/useUser";

const Navbar = () => {
  const [users] = useUser();
  const { user, logOut } = useContext(AuthContext);
  const isAgent = useAgent();
  const isAdmin = useAdmin();

  const userInfo = users.find((userInfo) => userInfo.email === user?.email);

  const [toggle, setToggle] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);

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
      path: isAgent
        ? "/dashboard/agentProfile"
        : isAdmin
        ? "/dashboard/adminProfile"
        : "/dashboard/myProfile",
    },
  ];

  const others = [
    {
      id: 1,
      name: "Profile",
      path: "/profile",
    },
  ];

  const handleUserInfoClick = () => {
    setShowUserInfo(!showUserInfo);
  };
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Log Out successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  };

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
              <div className="absolute top-4 right-0 flex flex-col items-center rounded-xl backdrop-blur-sm bg-black/20 font-medium">
                {pages.map((page, idx) => (
                  <div
                    key={idx}
                    className="hover:bg-white/30 text-center cursor-pointer rounded-xl duration-300 w-full"
                  >
                    <NavLink
                      to={page.path}
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "text-primary"
                          : "text-white"
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

        {/* user */}

        <div className="relative">
          {user ? (
            <button
              onClick={handleUserInfoClick}
              className="cursor-pointer pt-2"
            >
              <img
                src={userInfo?.photo}
                alt={`${userInfo?.name}'s profile`}
                className="w-8 h-8 rounded-full"
              />
            </button>
          ) : (
            <Link to="/login">
              <button className="md:hidden text-2xl text-dark1 mt-3">
                <BiLogInCircle />
              </button>
              <button className="hidden md:block btn text-dark1 hover:text-white bg-transparent hover:bg-primary border-2 border-dark1 hover:border-primary rounded-full duration-300 px-6">
                Log In
              </button>
            </Link>
          )}

          {/* user info */}

          {showUserInfo && user && (
            <div data-aos="fade-in" className="relative">
              <div className="absolute top-3.5 md:top-4 lg:top-5 right-4 md:right-0 flex flex-col items-center rounded-xl backdrop-blur-sm bg-black/20 text-white font-medium">
                {/* user name and email */}

                <div className="border-b-2 border-blue1 mb-2 w-52">
                  <p className="text-center py-4">{userInfo?.name}</p>
                  <p className="text-center pb-4">{userInfo?.email}</p>
                </div>

                {/* profile and dashboard */}

                {others.map((other) => (
                  <div
                    key={other.id}
                    className="hover:bg-white/30 hover:rounded-xl text-center cursor-pointer duration-300 w-full"
                  >
                    <Link to={other.path}>
                      <button className="w-60 py-4">{other.name}</button>
                    </Link>
                  </div>
                ))}

                {/* log out */}

                <button
                  onClick={handleLogout}
                  className="hover:bg-white/30 hover:rounded-xl hover:rounded-b-xl text-white duration-300 w-full py-4"
                >
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
