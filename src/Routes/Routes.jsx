import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import CreateAccount from "../Pages/CreateAccount";
import PrivateRoutes from "./PrivateRoute";
import AllProperties from "../Pages/AllProperties";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allProperties",
        element: (
          <PrivateRoutes>
            <AllProperties />
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/createAccount",
        element: <CreateAccount />,
      },
    ],
  },
]);

export default router;
