import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import CreateAccount from "../Pages/CreateAccount";
import PrivateRoutes from "./PrivateRoute";
import AllProperties from "../Pages/AllProperties";
import PropertyDetails from "../Pages/PropertyDetails";
import ErrorPage from "../Pages/ErrorPage";
import Dashboard from "../Pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
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
        path: "/property/:id",
        element: (
          <PrivateRoutes>
            <PropertyDetails />
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/property/${params.id}`),
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
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
