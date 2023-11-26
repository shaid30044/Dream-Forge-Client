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
import Wishlist from "../Pages/Dashboard/UserDashboard/Wishlist";
import Offer from "../Pages/Dashboard/UserDashboard/Offer";
import PropertyBought from "../Pages/Dashboard/UserDashboard/PropertyBought";
import MyProfile from "../Pages/Dashboard/UserDashboard/MyProfile";

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
        element: (
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        ),
      },

      //  user dashboard

      {
        path: "/dashboard/myProfile",
        element: (
          <PrivateRoutes>
            <MyProfile />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/wishlist",
        element: (
          <PrivateRoutes>
            <Wishlist />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/propertyBought",
        element: (
          <PrivateRoutes>
            <PropertyBought />
          </PrivateRoutes>
        ),
      },

      // agent dashboard

      // admin dashboard

      {
        path: "offer/:id",
        element: (
          <PrivateRoutes>
            <Offer />
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/wishlist/${params.id}`),
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
