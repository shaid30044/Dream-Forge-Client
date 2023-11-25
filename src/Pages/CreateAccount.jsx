import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../assets/login.jpg";
import { FaRegEye, FaRegEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const CreateAccount = () => {
  const { createUser, googleLogin, githubLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosPublic = useAxiosPublic();

  const [showPassword, setShowPassword] = useState(false);
  const [accountCreatingError, setAccountCreatingError] = useState("");

  const backgroundImageStyle = {
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      updateProfile(data.name, data.photo)
        .then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
            photo: data.photoURL,
          };
          axiosPublic.post("/user", userInfo).then((res) => {
            if (res.data.insertedId) {
              reset();

              Swal.fire({
                position: "center",
                icon: "success",
                title: "Account created successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate(location?.state ? location.state : "/");
            }
          });
        })
        .catch((error) => {
          setAccountCreatingError(error.message);
        });
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
            reset();

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
        setAccountCreatingError(error.message);
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
            reset();

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
        setAccountCreatingError(error.message);
      });
  };

  return (
    <div
      style={backgroundImageStyle}
      className="relative font-open bg-cover bg-fixed h-[1200px] md:h-[1400px] lg:h-[1000px]"
    >
      <Helmet>
        <title>Dream Forge | Create Account</title>
      </Helmet>

      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="absolute grid lg:grid-cols-2 justify-center items-center gap-10 md:gap-20 backdrop-blur-sm h-[1200px] md:h-[1400px] lg:h-[1000px] px-4 md:px-10 lg:px-40 py-20 lg:py-32">
        <img
          src={img}
          className="flex justify-center items-center object-cover rounded-3xl h-full"
        />
        <div>
          <div className="flex justify-between items-center gap-10 pb-8">
            <h1 className="text-4xl text-white">Create Account</h1>
            <Link to="/login">
              <button className="btn normal-case text-lg bg-transparent hover:bg-primary border-2 border-white hover:border-primary text-white rounded-full duration-300 px-8">
                Login
              </button>
            </Link>
          </div>

          {/* form */}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* name */}

            <p className="text-xl text-white pb-4">Name</p>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter your name"
              className="border-2 border-white bg-transparent outline-none text-white rounded-full w-full px-6 py-3"
            />
            {errors.name && (
              <span className="text-red font-medium">Name is required</span>
            )}

            {/* email */}

            <p className="text-xl text-white pt-6 pb-4">Email</p>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="border-2 border-white bg-transparent outline-none text-white rounded-full w-full px-6 py-3"
            />
            {errors.email && (
              <span className="text-red font-medium">Email is required</span>
            )}

            {/* password */}

            <p className="text-xl text-white pt-6 pb-4">Password</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 40,
                  pattern:
                    /(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder="Enter your password"
                className="border-2 border-white bg-transparent outline-none text-white rounded-full w-full px-6 py-3"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-6 -translate-y-1/2 text-xl text-white cursor-pointer"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
            {errors.password?.type === "required" && (
              <span className="text-red font-medium">Password is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red font-medium">
                Password must be 6 characters
              </span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red font-medium">
                Password must be less than 40 characters
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red font-medium">
                Password must have one uppercase, one lower case, one number and
                one special character.
              </p>
            )}

            {/* photo */}
            <p className="text-xl text-white pt-6 pb-4">Photo URL</p>
            <input
              type="text"
              {...register("photo", { required: true })}
              placeholder="Enter your photo url"
              className="border-2 border-white bg-transparent outline-none text-white rounded-full w-full px-6 py-3"
            />
            {errors.photo && (
              <span className="text-red font-medium">
                Photo URL is required
              </span>
            )}

            {/* account creating error */}

            <div className="text-center -mb-4">
              {accountCreatingError && (
                <p className="text-sm text-red-600">{accountCreatingError}</p>
              )}
            </div>

            {/* create account */}

            <input
              type="submit"
              value="Create"
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

export default CreateAccount;
