import { useNavigate } from "react-router-dom";
import error from "../assets/Error.png";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src={error} className="w-4/5 lg:w-1/2" />

      <button
        onClick={handleBack}
        className="btn normal-case text-lg font-semibold text-dark2 hover:text-white bg-transparent hover:bg-primary border-2 border-dark2 hover:border-primary rounded-full duration-300 px-8 mt-6 lg:mt-8"
      >
        Go Home
      </button>
    </div>
  );
};

export default ErrorPage;
