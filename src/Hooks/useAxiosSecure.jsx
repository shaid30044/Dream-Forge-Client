import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  axiosSecure.interceptors.response.use(
    (res) => {
      console.log(res, res.data);
      return res;
    },
    (error) => {
      console.log("error tracked in the interceptor", error.response);

      if (error.response.status === 401 || error.response.status === 403) {
        console.log("logout the user");

        logOut()
          .then(() => {
            navigate("/login");
          })
          .catch((error) => console.log(error));
      }
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
