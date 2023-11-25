import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../assets/login.jpg";
import { FaRegEye, FaRegEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Login = () => {
  const { login, googleLogin, githubLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const backgroundImageStyle = {
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    login(email, password)
      .then(() => {
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 1000);
        Swal.fire({
          title: "Success!",
          text: "Sign In successfully",
          icon: "success",
          confirmButtonText: "Close",
        });
      })
      .catch((error) => {
        if (error.message === "Invalid email") {
          Swal.fire({
            title: "Error!",
            text: "Invalid email. Please check your email address",
            icon: "error",
            confirmButtonText: "Close",
          });
        } else if (error.message === "Invalid password") {
          Swal.fire({
            title: "Error!",
            text: "Invalid password. Please check your password",
            icon: "error",
            confirmButtonText: "Close",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Sign In failed. Please check your credentials.",
            icon: "error",
            confirmButtonText: "Close",
          });
        }
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        const userInfo = {
          name: res.user?.displayName,
          email: res.user?.email,
          photo: res.user?.photoURL,
        };
        axiosPublic
          .post("/user", userInfo, { withCredentials: true })
          .then((res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Account created successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(location?.state ? location.state : "/");
          });
      })

      .catch((error) => {
        setLoginError(error.message);
      });
  };

  const handleGithubLogin = () => {
    githubLogin()
      .then((res) => {
        const userInfo = {
          name: res.user?.displayName,
          email: res.user?.email,
          photo: res.user?.photoURL,
        };
        axiosPublic
          .post("/user", userInfo, { withCredentials: true })
          .then((res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Account created successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(location?.state ? location.state : "/");
          });
      })

      .catch((error) => {
        setLoginError(error.message);
      });
  };

  return (
    <div
      style={backgroundImageStyle}
      className="relative font-open bg-cover bg-fixed h-[940px] md:h-[1200px] lg:h-screen"
    >
      <Helmet>
        <title>Dream Forge | Login</title>
      </Helmet>

      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="absolute grid lg:grid-cols-2 justify-center items-center gap-10 md:gap-20 backdrop-blur-sm h-[940px] md:h-[1200px] lg:h-screen px-4 md:px-10 lg:px-40 py-20 lg:py-32">
        <img
          src={img}
          className="flex justify-center items-center object-cover rounded-3xl h-full"
        />
        <div>
          <div className="flex justify-between items-center gap-10 pb-8">
            <h1 className="text-4xl text-white">Login</h1>
            <Link to="/createAccount">
              <button className="btn normal-case text-lg bg-transparent hover:bg-primary border-2 border-white hover:border-primary text-white rounded-full duration-300 px-8">
                Create Account
              </button>
            </Link>
          </div>

          {/* form */}

          <form onSubmit={handleLogin}>
            {/* email */}

            <p className="text-xl text-white pb-4">Email</p>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="border-2 border-white bg-transparent text-white outline-none rounded-full w-full px-6 py-3"
            />

            {/* password */}

            <p className="text-xl text-white pt-6 pb-4">Password</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="border-2 border-white bg-transparent text-white outline-none rounded-full w-full px-6 py-3"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-6 -translate-y-1/2 text-xl text-white cursor-pointer"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>

            {/* Login error */}

            <div className="text-center -mb-4">
              {loginError && (
                <p className="text-sm text-red-600">{loginError}</p>
              )}
            </div>

            {/* log in */}

            <input
              type="submit"
              value="Login"
              className="btn normal-case text-lg font-semibold text-white bg-transparent hover:bg-primary border-2 border-white hover:border-primary rounded-full duration-300 px-10 mt-12 mb-12"
            />
          </form>

          <div className="flex items-center gap-10">
            <p className="text-lg font-medium text-white pt-6 pb-5">Or:</p>
            <div className="text-xl text-white flex gap-8">
              {/* google */}

              <div
                onClick={handleGoogleLogin}
                className="border border-white hover:bg-primary hover:border-primary duration-300 cursor-pointer rounded-full p-3"
              >
                <FaGoogle />
              </div>

              {/* github */}

              <div
                onClick={handleGithubLogin}
                className="border border-white hover:bg-primary hover:border-primary duration-300 cursor-pointer rounded-full p-3"
              >
                <FaGithub />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
